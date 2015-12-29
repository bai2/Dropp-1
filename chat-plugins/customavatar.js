var fs = require('fs');
var path = require('path');

function hasAvatar (user) {
	if (Config.customavatars[toId(user)] && fs.existsSync('config/avatars/' + Config.customavatars[toId(user)])) 
		return Config.customavatars[toId(user)];
	return false;
}

function loadAvatars() {
	var formatList = ['.png', '.gif', '.jpeg', '.jpg'];
	fs.readdirSync('config/avatars')
	.filter(function (avatar) {
		return formatList.indexOf(path.extname(avatar)) > -1;
	})
	.forEach(function (avatar) {
		Config.customavatars[path.basename(avatar, path.extname(avatar))] = avatar;
	});
}
loadAvatars();

if (Config.watchconfig) {
	fs.watchFile(path.resolve(__dirname, 'config/config.js'), function (curr, prev) {
		if (curr.mtime <= prev.mtime) return;
		loadAvatars();
	});
}

var cmds = {
	'': 'help',
	help: function (target, room, user) {
		if (!this.canBroadcast()) return;
		return this.sendReplyBox('<b>Comandos para establecer avatar</b><br>' +
			'(Para establecer un avatar deber ser ~)<br><br>' +
			'<li>/setavatar <em>usuario</em>, <em>URL</em> - Establece un avatar a un usuario.' +
			'<li>/deleteavatar <em>usuario</em> - Borra el avatar de un usuario.' +
			'<li>/moveavatar <em>Usuario 1</em>, <em>Usuario 2</em> - Translada un avatar de una cuenta a otra.'
		);
	},

	add: 'set',
	set: function (target, room, user, connection, cmd) {
		if (!this.can('hotpatch')) return false;
		if (!target) return this.sendReply('|html|/ca set <em>Usuario</em>, <em>URL</em> - Sets a user\'s custom avatar to the specified image.');
		target = target.split(',');
		if (target.length < 2)  return this.sendReply('|html|/ca set <em>User</em>, <em>URL</em> - Sets a user\'s custom avatar to the specified image.');

		var targetUser = Users.getExact(target[0]) ? Users.getExact(target[0]).name : target[0];
		var link = target[1].trim();
		if (!link.match(/^https?:\/\//i)) link = 'http://' + link;
		
		var allowedFormats = ['png', 'jpg', 'jpeg', 'gif'];
		new Promise (function (resolve, reject) {
			require("request").get(link)
				.on('error', function (err) {
					console.log(err);
					reject("Avatar invalido, pruebas con otro.");
				})
				.on('response', function (response) {
					if (response.statusCode !== 200) reject('Avatar invalido, intenta con otro.');
					var type = response.headers['content-type'].split('/');
					if (type[0] !== 'image') reject('Ese no es un URL valido.');
					if (!~allowedFormats.indexOf(type[1])) reject('Formato no soportado, los formato validos son ' + allowedFormats.join(', '));

					if (hasAvatar(targetUser)) fs.unlinkSync('config/avatars/' + Config.customavatars[toId(targetUser)]);
					var file = toId(targetUser) + '.' + type[1];
					response.pipe(fs.createWriteStream('config/avatars/' + file));
					resolve(file);
				});
		})
		.then(function (file) {
			Config.customavatars[toId(targetUser)] = file;
			var getUser = Users.getExact(targetUser);
			if (getUser) getUser.avatar = file;

			var desc = 'El avatar personalizado ha sido establecido correctamente: <br><div style = "width: 80px; height: 80px; display: block"><img src = "' + link + '" style = "max-height: 100%; max-width: 100%"></div>';
			this.sendReply('|html|' + targetUser + '\'s ' + desc);
			if (getUser) {
				getUser.send('|html|' + user.name + ' tu avatar ha sido establecido correctamente, reinicia la pagina y lo podras ver.');
				getUser.popup('|html|<center>Tu ' + desc + '<br>Reinicia la pagina para poder ver tu nuevo avatar</center>');
			}
		}.bind(this))
		.catch (function (err) {
			this.errorReply('Error en establecer el avatar de ' + targetUser + err);
		}.bind(this));
	},

	remove: 'delete',
	'delete': function (target, room, user, connection, cmd) {
		if (!this.can('hotpatch')) return false;
		if (!target || !target.trim()) return this.sendReply('|html|/' + cmd + ' <em>Usuario</em> - Quitale el avatar a un usuario.');
		target = Users.getExact(target) ? Users.getExact(target).name : target;
		var avatars = Config.customavatars;
		if (!hasAvatar(target)) return this.errorReply(target + ' no tiene un avatar establecido.');

		fs.unlinkSync('config/avatars/' + avatars[toId(target)]);
		delete avatars[toId(target)];
		this.sendReply('El avatar de' + target + 'ha sido removido exitosamente');
		if (Users.getExact(target)) {
			Users.getExact(target).send('Tu avatar ha sido removido.');
			Users.getExact(target).avatar = 1;
		}
	},
	
	shift: 'move',
	move: function (target, room, user, connection, cmd) {
		if (!this.can('hotpatch')) return false;
		if (!target || !target.trim()) return this.sendReply('|html|/moveavatar <em>Usuario 1</em>, <em>Usuario 2</em> - Mueve el avatar de una cuenta a otra.');
		target = target.split(',');
		if (target.length < 2) return this.sendReply('|html|/moveavatar <em>Usuario 1</em>, <em>Usuario 2</em> - Mueve el avatar de una cuenta a otra.');

		var user1 = (Users.getExact(target[0]) ? Users.getExact(target[0]).name : target[0]);
		var user2 = (Users.getExact(target[1]) ? Users.getExact(target[1]).name : target[1]);
		if (!toId(user1) || !toId(user2)) return this.sendReply('|html|/moveavatar <em>Usuario 1</em>, <em>Usuario 2</em> - Mueve el avatar de una cuenta a otra.');
		var user1Av = hasAvatar(user1);
		var user2Av = hasAvatar(user2);
		if (!user1Av) return this.errorReply(user1 + ' no tiene un avatar establecido.');

		var avatars = Config.customavatars;
		if (hasAvatar(user2)) fs.unlinkSync('config/avatars/' + user2Av);
		var newAv = toId(user2) + path.extname(user1Av);
		fs.renameSync('config/avatars/' + user1Av, 'config/avatars/' + newAv);
		delete avatars[toId(user1)];
		avatars[toId(user2)] = newAv;
		if (Users.getExact(user1)) Users.getExact(user1).avatar = 1;
		if (Users.getExact(user2)) {
			Users.getExact(user2).avatar = newAv;
			Users.getExact(user2).send(user.name + ' ha removido el avatar de' + user1 + 'Reinicia la pagina para poner apreciar tu nuevo avatar');
		}
		return this.sendReply('La transferencia del avatar de ' + user1 + 'ha sido exitosa. Ahora el avatar se encuentra en ' + user2 + '.');
	}
};

exports.commands = {
	ca: 'customavatar',
	customavatar: cmds,
	moveavatar: cmds.move,
	deleteavatar: 'removeavatar',
	removeavatar: cmds.delete,
	setavatar: cmds.set
}