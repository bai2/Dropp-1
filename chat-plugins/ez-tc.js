
var fs = require('fs');
var serialize = require('node-serialize');
var trainerCards = {};

function loadTrainerCards() {
	try {
		trainerCards = serialize.unserialize(fs.readFileSync('config/trainercards.json', 'utf8'));
		Object.merge(CommandParser.commands, trainerCards);
	} catch (e) {};
}
setTimeout(function(){loadTrainerCards();},1000);

function saveTrainerCards() {
	fs.writeFileSync('config/trainercards.json', serialize.serialize(trainerCards));
	Object.merge(CommandParser.commands, trainerCards);
}

exports.commands = {
	eztc: 'trainercard',
	trainercards: 'trainercard',
	tc: 'trainercard',
	trainercard: function (target, room, user) {
		if (!target) target = 'help';
		var parts = target.split(',');
		for (var u in parts) parts[u] = parts[u].trim();

		switch (parts[0]) {
			case 'add':
				if (!this.can('pban')) return false;
				if (!parts[2]) return this.sendReply("Usa: /trainercard add, [nombre], [codigo]");
				var commandName = toId(parts[1]);
				if (CommandParser.commands[commandName]) return this.sendReply("/trainercards - La TC \"" + commandName + "\" ya existe.");
				try {
					var html = parts.splice(2, parts.length).join(',');
					trainerCards[commandName] = new Function('target', 'room', 'user', "if (!room.disableTrainerCards) if (!this.canBroadcast()) return; this.sendReplyBox('" + html.replace(/'/g, "\\'") + "');");
					saveTrainerCards();
					this.sendReply("La TrainerCard de \"" + commandName + "\" ha sido añadida con exito.");
					this.logModCommand("La TrainerCard de" + user.name + " ha sido añadida con el nombre de " + commandName);
					Rooms.get('staff').add(user.name + " ha añadido una TrainerCard con el nombre de " + commandName);
				} catch (e) {
					this.errorReply("Something went wrong when trying to add this command.  Did you use a backwards slash mark?  If so, try it again without using this.");
				}
				break;

			case 'rem':
			case 'del':
			case 'delete':
			case 'remove':
				if (!this.can('pban')) return false;
				if (!parts[1]) return this.sendReply("Usage: /trainercard remove, [nombre]");
				var commandName = toId(parts[1]);
				if (!trainerCards[commandName]) return this.sendReply("/trainercards - La TrainerCard con el nombre de \"" + commandName + "\" no existe.");
				delete CommandParser.commands[commandName];
				delete trainerCards[commandName];
				saveTrainerCards();
				this.sendReply("La TrainerCard de  \"" + commandName + "\" ha sido removida.");
				this.logModCommand(user.name + " ha removido la TrainerCard con el nombre de " + commandName);
				try {
					Rooms.rooms.staff.add(user.name + " ha removido la TrainerCard con el nombre de " + commandName);
				} catch (e) {};
				break;

			case 'list':
				if (!this.can('trainercard')) return false;
				var output = "<b>En el servidor hay un total de " + Object.size(trainerCards) + " TrainerCards. Las puedes ver con el nombre de:</b><br />";
				for (var tc in trainerCards) {
					output += tc + "<br />";
				}
				this.sendReplyBox(output);
				break;

			case 'off':
				if (!this.can('roommod', null, room)) return false;
				if (room.disableTrainerCards) return this.sendReply("Las TrainerCards han sido desactivadas en esta sala.");
				room.disableTrainerCards = true;
				room.chatRoomData.disableTrainerCards = true;
				Rooms.global.writeChatRoomData();
				this.privateModCommand("(" + user.name + " ha desactivado las TrainerCards en esta sala.)");
				break;

			case 'on':
				if (!this.can('roommod', null, room)) return false;
				if (!room.disableTrainerCards) return this.sendReply("Las TrainerCards han sido activadas para esta sala.");
				delete room.disableTrainerCards;
				delete room.chatRoomData.disableTrainerCards;
				Rooms.global.writeChatRoomData();
				this.privateModCommand("(" + user.name + " ha activado las TrainerCards para esta sala.)");
				break;

			case 'reload':
				if (!this.can('pban')) return false;
				return this.sendReply("Las TrainerCards han sido cargadas.");
				loadTrainerCards();
				break;

			case 'source':
				if (!this.can('pban')) return false;
				if (!parts[1]) return this.errorReply("Usa: /tc source, [nombre] - Muestra el codigo de una TrainerCard.");
				if (!CommandParser.commands[parts[1]]) return this.errorReply("Nombre de TC no valido... ¿Lo has escrito bien?");
				return this.sendReply(CommandParser.commands[parts[1]]);
				break;

			case 'info':
			case 'help':
			default:
				if (!this.canBroadcast()) return;
				this.sendReplyBox(
					"Comandos para Administras las TrainerCards:<br />" +
					"/trainercard add, [nombre], [codigo] - Añade una TrainerCard<br />" +
					"/trainercard remove, [nombre] - Quita una TrainerCard.<br />" +
					"/trainercard list - Muestra la lista de TrainerCards en el servidor.<br />" +
					"/trainercard off - Desactiva las TrainerCards .<br />" +
					"/trainercard on - Activa las TrainerCards.<br />" +
					"/trainercard reload - Recarga la lista de TrainerCards.<br />" +
					"/trainercard source, [nombre] - Muestra el codigo de una TrainerCard.<br />" +
					"/trainercard help - Muestra esta lista de comandos.<br />" 
				);
		}
	}
};