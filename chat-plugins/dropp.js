var request = require('request');

exports.commands = {
	
	reglas: function (target, room, user) {
        if (!this.canBroadcast()) return false;
        	this.popupReply("**Reglas del Servidor:**||||**1.** Respetar a todos los jugadores, nada de insultos o discriminación.||||**2.** Esta determinadamente prohibido hacer spam en el servidor. Ya sea spam de servidores, emoticones u otro contenido.||||__Nota: No se podrá hacer spam ni aunque un usuario con rango le autorice, cualquier usuario que se encuentre inumpliendo esto, sera castigado con la debida accion__||||**3.** No se permite el uso excesivo de: MAYÚSCULA, __italica__ , **bold**, etc.||||**4.** El Flood (4 líneas de chat o más que podrían caber en un mensaje) esta prohibido, esta acción se considera molesta por lo tanto se castiga con una advertencia o en dado caso cualquier tipo de mute.||||**5.** El uso de nicks que contengan insultos, malas palabras o una burla hacia el personal del staff, esta prohibido. Si se usa un nick que incumpla con una de las cosas mencionadas anteriormente, podria ser hasta prohibido en el servidor.||||**6.** El servidor Dropp Showdown esta abierto a usuarios menores de 18 años, por lo tanto nada de pornografia. Ya sea por el Chat o por Privado||||**7.** El staff o los moderadores, pueden sancionar cualquier comportamiento que consideren inapropiado incluso si no aparece en estas reglas. Si usted esta en desacuerdo con una descicion tomada, puede contactar al Staff Superior (un Lider (&) o un Administrador (~)).||||**8.** No hacer minimod, se establecio a un staff capaz de pensar por si mismo.||||__Sabemos que esto no es facil de cumplir, pero es necesario.__");
		},
	
    postimage: 'image',
	image: function (target, room, user) {
		if (!target) return this.sendReply('Usage: /image link, size');
		if (!this.can('ban', room)) return false;
		if (!this.canBroadcast()) return;

		var targets = target.split(',');
		if (targets.length !== 2) {
			room.addRaw('<center><img src="' + Tools.escapeHTML(targets[0]) + '"><br><i>Imagen mostrada por ' + user.name + '</i></center></center>');
		}
	},
	
	masspm: 'pmall',
	pmall: function (target, room, user) {
		if (!this.can('pmall')) return false;
		if (!target) return this.parse('/help pmall');

		var pmName = ' InFo.PM [No Responder]';

		for (var i in Users.users) {
			var message = '|pm|' + pmName + '|' + Users.users[i].getIdentity() + '|' + target;
			Users.users[i].send(message);
		}
	},
	pmallhelp: ["/pmall [message] - Envia un MP a todos en el Server"],

	staffpm: 'pmallstaff',
	pmstaff: 'pmallstaff',
	pmallstaff: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target) return this.parse('/help pmallstaff');

		var pmName = ' InFo.Staff [No Responder]';

		for (var i in Users.users) {
			if (Users.users[i].isStaff) {
				Users.users[i].send('|pm|' + pmName + '|' + Users.users[i].group + Users.users[i].name + '|' + target);
			}
		}
	},
	pmallstaffhelp: ["/pmallstaff [message] - Envia un mensaje a Todo el miembro del Staff ."],
	
	regdate: function(target, room, user, connection) {
		if (!this.canBroadcast()) return;
		if (!target || target === "0") target = toId(user.userid);
		if (!target || target === "." || target === "," || target === "'") return this.sendReply('/regdate - Please specify a valid username.'); //temp fix for symbols that break the command
		var username = toId(target);
		target = target.replace(/\s+/g, '');
		var request = require("request");
		var self = this;
		request('http://pokemonshowdown.com/users/~' + target, function(error, response, content) {
			if (!(!error && response.statusCode == 200)) return;
			content = content + '';
			content = content.split("<em");
			if (content[1]) {
				content = content[1].split("</p>");
				if (content[0]) {
					content = content[0].split("</em>");
					if (content[1]) {
						regdate = content[1].split('</small>')[0] + '.';
						data = Tools.escapeHTML(username) + ' se registro el' + regdate;
					}
				}
			} else {
				data = Tools.escapeHTML(username) + ' no esta registrado.';
			}
			self.sendReplyBox(Tools.escapeHTML(data));
		});
	},
	
	roomlist: function (target, room, user) {
		if(!this.can('pban')) return;
		var totalUsers = 0; 
		for (var u in Users.users) {
			if (!Users.users[u].connected) continue; totalUsers++;
		}
		var rooms = Object.keys(Rooms.rooms),
		len = rooms.length,
		header = ['<b><font color="#DA9D01" size="2">Total de usuarios conectados: ' + totalUsers + '</font></b><br />'],
		official = ['<br><b><font color="#1a5e00" size="2">Salas Oficiales:</font></b><br />'],
		nonOfficial = ['<hr style="border: 1px dashed #39A1C0"><b><font color="#000b5e" size="2">Salas Publicas:</font></b><br />'],
		privateRoom = ['<hr style="border: 1px dashed #39A1C0"><b><font color="#ff5cb6" size="2">Salas Privadas:</font></b><br />'],
		groupChats = ['<hr style="border: 1px dashed #39A1C0"><b><font color="#740B53" size="2">Grupos de Chat:</font></b><br />'],
		battleRooms = ['<hr style="border: 1px dashed #39A1C0"><b><font color="#0191C6" size="2">Sala de Batallas::</font></b><br />'];
	 
		while (len--) {
			var _room = Rooms.rooms[rooms[(rooms.length - len) - 1]];
			if (_room.type === 'battle') {
				battleRooms.push('<a href="/' + _room.id + '" class="ilink">' + _room.title + '</a> (' + _room.userCount + ')');
			}
			if (_room.type === 'chat') {
					if (_room.isPersonal) {
						groupChats.push('<a href="/' + _room.id + '" class="ilink">' + _room.id + '</a> (' + _room.userCount + ')');
						continue;
					}
					if (_room.isOfficial) {
						official.push('<a href="/' + toId(_room.title) + '" class="ilink">' + _room.title + '</a> (' + _room.userCount + ')');
						continue;
					}
					if (_room.isPrivate) {
						privateRoom.push('<a href="/' + toId(_room.title) + '" class="ilink">' + _room.title + '</a> (' + _room.userCount + ')');
						continue;
					}
			}
			if (_room.type !== 'battle' && _room.id !== 'global') nonOfficial.push('<a href="/' + toId(_room.title) + '" class="ilink">' + _room.title + '</a> (' + _room.userCount + ')');
		}
		this.sendReplyBox(header + official.join(' ') + nonOfficial.join(' ') + privateRoom.join(' ') + (groupChats.length > 1 ? groupChats.join(' ') : '') + (battleRooms.length > 1 ? battleRooms.join(' ') : ''));
    },
	
}