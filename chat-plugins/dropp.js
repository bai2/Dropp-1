var request = require('request');

exports.commands = {
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
	
}