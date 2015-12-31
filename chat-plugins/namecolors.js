var style = "background:none;border:0;padding:0 5px 0 0;font-family:Arial Black,Verdana,Helvetica,sans-serif;font-size:9.5pt;cursor:pointer";

exports.commands = {
       
        namecolors: function(target, room, user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><font size = 3>Name Colors:</font><br />' +
                                  '<p> Cambia el color de tu nombre de usuario<br /> Usa /name[color] mensaje - para cambiarlo de color' +
                                  '<p> Colores disponibles: Rainbow, Blue, White, Black, Orange, Green, Red, Pink y Yellow </p>' +
                                  '<p>No dude en ponerse en contacto con <b>The WleDey</b>, si encuentra un problema, bug o tiene una sugerencia para este comando</p>' +
                                  '<font align="left" ><b>By: The WleDey'
                                                );
        },
   
        rainbow: function (target, room, user){
                var colors = ['#ED1C24', '#F26522', '#F7941D', '#F0D200', '#8DC73F', '#39B54A', '#00A651', '#00A99D', '#00AEEF', '#0072BC', '#0054A6', '#2E3192', '#662D91', '#92278F', '#EC008C', '#ED145B'];
                if(!target) return this.sendReply('/rainbow mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b> <i>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                        } else {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + ':</b>' + target);
                        }
          
         
        },
       
        nameblue: function (target, room, user){
                var colors = ['#0489B1'];
                if(!target) return this.sendReply('/nameblue mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small>' + user.group + '</small><b>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                        } else {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + ':</b>' + target);
                        }
          
         
        },
       
        namewhite: function (target, room, user){
                var colors = ['#FFFFFF'];
                if(!target) return this.sendReply('/namewhite mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small>' + user.group + '</small><b>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                        } else {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + ':</b>' + target);
                        }
         
        },
       
        nameblack: function (target, room, user){
                var colors = ['#000000'];
                if(!target) return this.sendReply('/nameblack mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small>' + user.group + '</small><b>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                        } else {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + ':</b>' + target);
                        }
          
        },
       
        nameorange: function (target, room, user){
                var colors = ['#FF8000'];
                if(!target) return this.sendReply('/nameorange mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b> <i>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                       } else {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + ':</b>' + target);
                        }
          
         
        },
       
        namegreen: function (target, room, user){
                var colors = ['#3ADF00'];
                if(!target) return this.sendReply('/namegreen mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b> <i>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                        } else {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + ':</b>' + target);
                        }
          
         
        },
       
        namered: function (target, room, user){
                var colors = ['#FF0000'];
                if(!target) return this.sendReply('/namered mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b> <i>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                       } else {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + ':</b>' + target);
                        }
          
         
        },
       
        namepink: function (target, room, user){
                var colors = ['#FF00FF'];
                if(!target) return this.sendReply('/namepink mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b> <i>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                        } else {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + ':</b>' + target);
                        }

        },
       
        namepurple: function (target, room, user){
                var colors = ['#8000ff', '#39005e', '#c07bed'];
                if(!target) return this.sendReply('/namepurple mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b> <i>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                      } else {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + ':</b>' + target);
                        }

        },
       
        
        nameyellow: function (target, room, user){
                var colors = ['#FFFF00'];
                if(!target) return this.sendReply('/nameyellow mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b> <i>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                        } else {
                                 room.add('|raw|<small>' + user.group + '</small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + ':</b>' + target);
                        }
          
         
        },
       
       //************************//
       // Colores para Usuarios //
       //***********************//
       
       jeicolor: function (target, room, user){
		if (user.userid !== 'jeidel') return this.errorReply('/jeicolor - Solo puede ser usado por Jeidel.');
                var colors = ['#00BFFF','#0489B1'];
                if(!target) return this.sendReply('/jeicolor mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small></small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b> <i>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                      } else {
                                room.add('|raw|<small></small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b>' + target);
                        }
        },
        
        kevincolor: function (target, room, user){
		if (user.userid !== 'kevinxzllz') return this.errorReply('/wledeycolor - Solo puede ser usado por The WleDey.');
                var colors = ['#A901DB','#D0A9F5'];
                if(!target) return this.sendReply('/wledeycolor mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small></small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b> <i>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                      } else {
                                room.add('|raw|<small></small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b>' + target);
                        }
        },
        
        kingcolor: function (target, room, user){
		if (user.userid !== 'kingswordyt') return this.errorReply('/kingcolor - Solo puede ser usado por KingSwordYT.');
                var colors = ['#B40404','#424242'];
                if(!target) return this.sendReply('/kingcolor mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small></small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b> <i>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                      } else {
                                room.add('|raw|<small></small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b>' + target);
                        }
        },
        
        haxcolor: function (target, room, user){
		if (user.userid !== 'haxnyancat1') return this.errorReply('/haxcolor - Solo puede ser usado por Never be Alone.');
                var colors = ['#000000','#BA0A0A'];
                if(!target) return this.sendReply('/hacxcolor mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small></small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b> <i>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                      } else {
                                room.add('|raw|<small></small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b>' + target);
                        }
        },
        
        sharpcolor: function (target, room, user){
		if (user.userid !== 'sharedo') return this.errorReply('/sharpcolor - Solo puede ser usado por Sharpedo.');
                var colors = ['#EE82EE','#40E0D0'];
                if(!target) return this.sendReply('/hacxcolor mensaje');
                        userColor = '',
                        currentDate = new Date(),
                        randomNumber = '';
                        for(var x = 0; x < user.name.length; x++){
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if(user.name.substring(x, x + 1) !== undefined){
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                } else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if(target.indexOf('/me') > -1) {
                                room.add('|raw|<small></small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b> <i>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                      } else {
                                room.add('|raw|<small></small><b>' + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>"  + userColor + '</b>' + target);
                        }
        },
}