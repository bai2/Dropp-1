'use strict';

let fs = require('fs');
let path = require('path');

let shop = [

	['Sala de Chat', 'Compra tu propia sala en el servidor.Será pública o privada en función del motivo de su compra.', 10000],
	['Avatar Personalizado', 'Compras el derecho de tener un avatar personalizadom, puedes dar una imagen o puedes solicitar la creacion de un avatar a <b>Lizardd o HAX★NYAN★CAT~1.</b>',6000],
	['Tarjeta de entrenador personalizada', 'Compras el derecho a una "Tarjeta de Entrenador personalizada". Puedes hablar con un admin o con Lizardd para su creacion.', 4000],
	['Icono', 'Compra el derecho de tener un icono junto a tu nombre.', 3500],
	['NameColor', 'Compra  el derecho de tener un color personalizado. ',3000],
	['Arreglo', 'Compra la habilidad de cambiar tu avatar, tarjeta de entrenador,icono o modificar tu sala. (No lo compres, si no tienes ninguno de los tres objetos)', 1000],
	['Símbolo', 'Compra un símbolo personalizado que aparecerá al lado de tu nick en la lista de usuarios. (Temporal se borrara en el siguente reinicio del server)', 1000]

    
];


let shopDisplay = getShopDisplay(shop);

/**
 * Gets an amount and returns the amount with the name of the currency.
 *
 * @examples
 * currencyName(0); // 0 bucks
 * currencyName(1); // 1 buck
 * currencyName(5); // 5 bucks
 *
 * @param {Number} amount
 * @returns {String}
 */
function currencyName(amount) {
	let name = " PokéDolares";
	return amount === 1 ? name : name + "";
}

/**
 * Checks if the money input is actually money.
 *
 * @param {String} money
 * @return {String|Number}
 */
function isMoney(money) {
	let numMoney = Number(money);
	if (isNaN(money)) return "Tiene que ser un número valido.";
	if (String(money).includes('.')) return "No puede contener un número decimal.";
	if (numMoney < 5) return "No puede ser inferior a 5 pds.";
	return numMoney;
}

/**
 * Log money to logs/money.txt file.
 *
 * @param {String} message
 */
function logMoney(message) {
	if (!message) return;
	let file = path.join(__dirname, '../logs/money.txt');
	let date = "[" + new Date().toUTCString() + "] ";
	let msg = message + "\n";
	fs.appendFile(file, date + msg);
}

/**
 * Displays the shop
 *
 * @param {Array} shop
 * @return {String} display
 */
function getShopDisplay(shop) {
	let display = "<table border='1' cellspacing='0' cellpadding='5' width='100%'>" +
					"<tbody><tr><th>Articulo</th><th>Descripción</th><th>Precio</th></tr>";
	let start = 0;
	while (start < shop.length) {
		display += "<tr>" +
						"<td align='center'><button name='send' value='/buy " + shop[start][0] + "'><b>" + shop[start][0] + "</b></button>" + "</td>" +
						"<td align='center'>" + shop[start][1] + "</td>" +
						"<td align='center'>" + shop[start][2] + "</td>" +
					"</tr>";
		start++;
	}
	display += "</tbody></table><center>Tambien puedes comprar articulos usando el comando <em>/buy articulo</em>.<br>Se recomienda que al comprar un articulo, contactates lo mas rapido posible a un Admin</center>";
	return display;
}


/**
 * Find the item in the shop.
 *
 * @param {String} item
 * @param {Number} money
 * @return {Object}
 */
function findItem(item, money) {
	let len = shop.length;
	let price = 0;
	let amount = 0;
	while (len--) {
		if (item.toLowerCase() !== shop[len][0].toLowerCase()) continue;
		price = shop[len][2];
		if (price > money) {
			amount = price - money;
			this.errorReply("No tienes suficiente dinero para comprar este artículo, necesitas reunir " + amount + currencyName(amount) + ".");
			return false;
		}
		return price;
	}
	this.errorReply("Este no es un Articulo valido.");
}

/**
 * Handling the bought item from the shop.
 *
 * @param {String} item
 * @param {Object} user
 * @param {Number} cost - for lottery
 */
function handleBoughtItem(item, user, cost) {
	if (item === 'símbolo') {
		user.canCustomSymbol = true;
		this.sendReply("Has comprado un símbolo, ahora tienes acceso al comando /customsymbol [simbolo].");
		this.sendReply("Puedes quitarte el símbolo con el comando /resetsymbol.");
	} else {
		let msg = '**' + user.name + " ha comprado un/una " + item + ".**";
		Rooms.rooms.staff.add('|c|~Shop Alert|' + msg);
		Rooms.rooms.staff.update();
		Users.users.forEach(function (user) {
			if (user.group === '~' || user.group === '&') {
				user.send('|pm|~Shop Alert|' + user.getIdentity() + '|' + msg);
			}
		});
	}
}

exports.commands = {
	
	pd: "wallet",
	wallet: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target) target = user.name;

		const amount = Db('money').get(toId(target), 0);
		this.sendReplyBox("Ahoros de <b>" + Tools.escapeHTML(target) + "</b>: " + amount + currencyName(amount) + ".");
	},
	wallethelp: ["/pd [usuario]"],

	givemoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help givemoney');

		let parts = target.split(',');
		let username = parts[0];
		let amount = isMoney(parts[1]);

		if (typeof amount === 'string') return this.errorReply(amount);

		let total = Db('money').set(toId(username), Db('money').get(toId(username), 0) + amount).get(toId(username));
		amount = amount + currencyName(amount);
		total = total + currencyName(total);
		this.sendReply(username + " has recibido " + amount + ". Ahora tiene un total de: " + total + ".");
		if (Users.get(username)) Users(username).popup(user.name + " has recibido " + amount + ". Ahora tienes un total de: " + total + ".");
		logMoney(username + " has recibido " + amount + ". " + username + " ahora tiene un total de: " + total);
	},
	givemoneyhelp: ["/givemoney [usuario], [pds] - Añadele a un usuario una cierta cantidad de pds."],

	removemoney: 'takemoney',
	takemoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help takemoney');

		let parts = target.split(',');
		let username = parts[0];
		let amount = isMoney(parts[1]);

		if (typeof amount === 'string') return this.errorReply(amount);

		let total = Db('money').set(toId(username), Db('money').get(toId(username), 0) - amount).get(toId(username));
		amount = amount + currencyName(amount);
		total = total + currencyName(total);
		this.sendReply(username + " ha perdido un total de  " + amount + ". " + username + " ahora tiene " + total + ".");
		if (Users.get(username)) Users(username).popup(user.name + " se te ha quitado un total de " + amount + " de tus ahorros, ahora tienes " + total + ".");
		logMoney(username + " ha perdido " + amount + ". " + username + " ahora tiene " + total);
	},
	takemoneyhelp: ["/removemoney [usuario], [pds] - Quitale una cierta cantidad de pds a un usuario."],

	removetotalmoney: 'resetmoney',
	resetmoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		Db('money').set(toId(target), 0);
		this.sendReply(target + " ahora tiene 0 PokéDolares.");
		logMoney(user.name + " ha llevado a un total de 0 PokéDolares los ahorros de " + target + ".");
	},
	resetmoneyhelp: ["/removetotalmoney [usuario] - Quitale todos los PokéDolares a un usuario."],

	donar: 'transfermoney',
	transfermoney: function (target, room, user) {
		if (!target || target.indexOf(',') < 0) return this.parse('/help transfermoney');

		let parts = target.split(',');
		let username = parts[0];
		let uid = toId(username);
		let amount = isMoney(parts[1]);

		if (toId(username) === user.userid) return this.errorReply("No puedes transferirte pds a ti mismo.");
		if (username.length > 19) return this.errorReply("El nombre señalado supera los 19 caracteres. ¿Lo escribistes bien?.");
		if (typeof amount === 'string') return this.errorReply(amount);
		if (amount > Db('money').get(user.userid, 0)) return this.errorReply("No puedes transferir mas pds de los que tienes.");

		Db('money')
			.set(user.userid, Db('money').get(user.userid) - amount)
			.set(uid, Db('money').get(uid, 0) + amount);

		let userTotal = Db('money').get(user.userid) + currencyName(Db('money').get(user.userid));
		let targetTotal = Db('money').get(uid) + currencyName(Db('money').get(uid));
		amount = amount + currencyName(amount);

		this.sendReply("Se ha transferido exitosamente un total de " + amount + ". Ahora tienes " + userTotal + ".");
		if (Users.get(username)) Users(username).popup(user.name + " te ha transferido un total de " + amount + ". Ahora tienes " + targetTotal + ".");
		logMoney(user.name + " ha trasferido un total de " + amount + " a " + username + ". " + user.name + " ahora tiene " + userTotal + " y " + username + " tiene " + targetTotal + ".");
	},
	transfermoneyhelp: ["/donar [usuario], [pds] - Transfiere una cuerta cantidad de PokéDolares a un usuario.."],

	tienda: 'shop',
	shop: function (target, room, user) {
		if (!this.canBroadcast()) return;
		return this.sendReply("|raw|" + shopDisplay);
	},
	shophelp: ["/shop - Muestra la tienda del Servidor."],

	comprar: "buy",
	buy: function (target, room, user) {
		if (!target) return this.parse('/help buy');
		let amount = Db('money').get(user.userid, 0);
		let cost = findItem.call(this, target, amount);
		if (!cost) return;
		let total = Db('money').set(user.userid, amount - cost).get(user.userid);
		this.sendReply("Ha comprado un/una" + target + " por una cantidad de " + cost +  currencyName(cost) + ". Ahora tienes un total de " + total + currencyName(total));
		room.addRaw(user.name + " has comprado un/una <b>" + target + "</b>. Habla con un Admin para recibir tu articulo");
		logMoney(user.name + " ha comprado un/una" + target + ".");
		handleBoughtItem.call(this, target.toLowerCase(), user, cost);
	},
	buyhelp: ["/buy [articulo] - compra un articulo de la tienda."],

	customsymbol: function (target, room, user) {
		if (!user.canCustomSymbol && user.id !== user.userid) return this.errorReply("Para usar este comando necesitas comprarlo en la tienda.");
		if (!target || target.length > 1) return this.parse('/help customsymbol');
		if (target.match(/[A-Za-z\d]+/g) || '|?!+$%@\u2605=&~#\u03c4\u00a3\u03dd\u03b2\u039e\u03a9\u0398\u03a3\u00a9'.indexOf(target) >= 0) {
			return this.errorReply("Lo siento pero no puedes cambiar tu simbolo.");
		}
		user.customSymbol = target;
		user.updateIdentity();
		user.canCustomSymbol = false;
		user.hasCustomSymbol = true;
	},
	customsymbolhelp: ["/customsymbol [simbolo] "],

	resetcustomsymbol: 'resetsymbol',
	resetsymbol: function (target, room, user) {
		if (!user.hasCustomSymbol) return this.errorReply("No tienes un simbolo establecido.");
		user.customSymbol = null;
		user.updateIdentity();
		user.hasCustomSymbol = false;
		this.sendReply("Tu simbolo ha sido restaurado.");
	},
	resetsymbolhelp: ["/resetsymbol"],

	moneylog: function (target, room, user, connection) {
		if (!this.can('modlog')) return;
		let numLines = 15;
		let matching = true;
		if (target.match(/\d/g) && !isNaN(target)) {
			numLines = Number(target);
			matching = false;
		}
		let topMsg = "Datos de las ultimas " + numLines + " acciones realizadas en relación a los PokéDolares:\n";
		let file = path.join(__dirname, '../logs/money.txt');
		fs.exists(file, function (exists) {
			if (!exists) return connection.popup("Vacio...");
			fs.readFile(file, 'utf8', function (err, data) {
				data = data.split('\n');
				if (target && matching) {
					data = data.filter(function (line) {
						return line.toLowerCase().indexOf(target.toLowerCase()) >= 0;
					});
				}
				connection.popup('|wide|' + topMsg + data.slice(-(numLines + 1)).join('\n'));
			});
		});
	},

	moneyladder: 'richestuser',
	richestuser: function (target, room, user) {
		if (!this.canBroadcast()) return;
		let display = '<center><u><b>Tabla de usuarios con mas dinero en el Servidor</b></u></center><br><table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>N°</th><th>Usuario</th><th>PokéDolares</th></tr>';
		let keys = Object.keys(Db('money').object()).map(function (name) {
			return {name: name, money: Db('money').get(name)};
		});
		if (!keys.length) return this.sendReplyBox("Nadie ha obtenido PokéDolares por el momento.");
		keys.sort(function (a, b) { return b.money > a.money; });
		keys.slice(0, 10).forEach(function (user, index) {
			display += "<tr><td>" + (index + 1) + "</td><td>" + user.name + "</td><td>" + user.money + "</td></tr>";
		});
		display += "</tbody></table>";
		this.sendReply("|raw|" + display);
	},

	dicegame: 'startdice',
	dicestart: 'startdice',
	startdice: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return false;
		if (!target) return this.parse('/help startdice');
		if (!this.canTalk()) return this.errorReply("You can not start dice games while unable to speak.");

		let amount = isMoney(target);

		if (typeof amount === 'string') return this.errorReply(amount);
		if (!room.dice) room.dice = {};
		if (room.dice.started) return this.errorReply("A dice game has already started in this room.");

		room.dice.started = true;
		room.dice.bet = amount;
		// Prevent ending a dice game too early.
		room.dice.startTime = Date.now();

		room.addRaw("<div class='infobox'><h2><center><font color=#24678d>" + user.name + " has started a dice game for </font><font color=red>" + amount + "</font><font color=#24678d>" + currencyName(amount) + ".</font><br><button name='send' value='/joindice'>Click to join.</button></center></h2></div>");
	},
	startdicehelp: ["/startdice [bet] - Start a dice game to gamble for money."],

	joindice: function (target, room, user) {
		if (!room.dice || (room.dice.p1 && room.dice.p2)) return this.errorReply("There is no dice game in it's signup phase in this room.");
		if (!this.canTalk()) return this.errorReply("You may not join dice games while unable to speak.");
		if (room.dice.p1 === user.userid) return this.errorReply("You already entered this dice game.");
		if (Db('money').get(user.userid, 0) < room.dice.bet) return this.errorReply("You don't have enough bucks to join this game.");
		Db('money').set(user.userid, Db('money').get(user.userid) - room.dice.bet);
		if (!room.dice.p1) {
			room.dice.p1 = user.userid;
			return room.addRaw("<b>" + user.name + " has joined the dice game.</b>");
		}
		room.dice.p2 = user.userid;
		room.addRaw("<b>" + user.name + " has joined the dice game.</b>");
		let p1Number = Math.floor(6 * Math.random()) + 1;
		let p2Number = Math.floor(6 * Math.random()) + 1;
		let output = "<div class='infobox'>Game has two players, starting now.<br>Rolling the dice.<br>" + room.dice.p1 + " has rolled a " + p1Number + ".<br>" + room.dice.p2 + " has rolled a " + p2Number + ".<br>";
		while (p1Number === p2Number) {
			output += "Tie... rolling again.<br>";
			p1Number = Math.floor(6 * Math.random()) + 1;
			p2Number = Math.floor(6 * Math.random()) + 1;
			output += room.dice.p1 + " has rolled a " + p1Number + ".<br>" + room.dice.p2 + " has rolled a " + p2Number + ".<br>";
		}
		let winner = room.dice[p1Number > p2Number ? 'p1' : 'p2'];
		output += "<font color=#24678d><b>" + winner + "</b></font> has won <font color=#24678d><b>" + room.dice.bet + "</b></font>" + currencyName(room.dice.bet) + ".<br>Better luck next time " + room.dice[p1Number < p2Number ? 'p1' : 'p2'] + "!</div>";
		room.addRaw(output);
		Db('money').set(winner, Db('money').get(winner, 0) + room.dice.bet * 2);
		delete room.dice;
	},

	enddice: function (target, room, user) {
		if (!user.can('broadcast', null, room)) return false;
		if (!room.dice) return this.errorReply("There is no dice game in this room.");
		if ((Date.now() - room.dice.startTime) < 15000 && !user.can('broadcast', null, room)) return this.errorReply("Regular users may not end a dice game within the first minute of it starting.");
		if (room.dice.p2) return this.errorReply("Dice game has already started.");
		if (room.dice.p1) Db('money').set(room.dice.p1, Db('money').get(room.dice.p1, 0) + room.dice.bet);
		room.addRaw("<b>" + user.name + " ended the dice game.</b>");
		delete room.dice;
	},

	bucks: 'economystats',
	economystats: function (target, room, user) {
		if (!this.canBroadcast()) return;
		const users = Object.keys(Db('money').object());
		const total = users.reduce(function (acc, cur) {
			return acc + Db('money').get(cur);
		}, 0);
		let average = Math.floor(total / users.length);
		let output = "There is " + total + currencyName(total) + " circulating in the economy. ";
		output += "The average user has " + average + currencyName(average) + ".";
	}

};
