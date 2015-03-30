/*globals require*/
/*jshint unused:true*/
var http = require("http"),
        socketio = require("socket.io"),
        fs = require("fs");
 
var app = http.createServer(function(req, resp){
        fs.readFile("client.html", function(err, data){
		if(err) return resp.writeHead(500);
		resp.writeHead(200, {
			'Content-Type': 'text/html'
		});
		resp.end(data);
	});
});
app.listen(3456);

var usernames = [];
var usercount = 0;
var roomnames = ["default.js"];
var roomCreators= [""];
var roomPW=[""];
var roomcount = 0;
var UserSockets=[];
var hashes = ['https://firepad.firebaseio-demo.com/-JcNerfMNQJ053ViUbOn'];

var io = socketio.listen(app);
io.sockets.on("connection", function(socket){
	socket.on('message_to_server', function(data) {
		console.log(data.from+" : "+data.message); 
		io.sockets.in(socket.room).emit("message_to_client",{message:data.message, from: data.from });
	});
		
	socket.on("add_new_user", function(data) {
		socket.user = data.clientname;
		socket.room = 'default.js';
		usernames.push(data.clientname);
		UserSockets.push(socket.id);
		usercount++;
		socket.join('default.js');
		socket.broadcast.to('default.js').emit("add_name",{from: data.clientname, room: socket.room });
		socket.emit("update_room", {roomlist: roomnames, current: 'default.js', hash:'https://firepad.firebaseio-demo.com/-JcNerfMNQJ053ViUbOn'});
	});
	
	socket.on("create_room", function(data) {
		socket.current=socket.room;
		socket.emit("leave",{from: socket.user,room: socket.room });
		socket.broadcast.to(socket.room).emit("leave",{from: socket.user,room: socket.room });
		socket.leave(socket.room);
		socket.join(data.room);
		socket.room = data.room;
		
		roomnames.push(data.room);
		roomPW.push(data.password);
		roomCreators.push(socket.user);
		hashes.push(data.hash);
		//roomnames[data["room"]]=[socket.user,data['password']];
		roomcount++;
		//socket.broadcast.to(data["room"]).emit("add_name",{from: socket.user, room: socket.room});
		// console.log("Room: "+data["room"]+" and password: "+data["password"]);
		socket.broadcast.emit("update_room", {roomlist: roomnames, current: socket.current});
		socket.emit("update_room", {roomlist: roomnames, current: socket.room});
	});
	
	socket.on("switch_room", function(data) { 		//switches rooms
		socket.emit("leave",{from: socket.user,room: socket.room });
		socket.broadcast.to(socket.room).emit("leave",{from: socket.user,room: socket.room });
		socket.leave(socket.room);
		socket.join(data.room);
		socket.room = data.room;

		socket.emit("add_name",{from:socket.user, room: socket.room});
		socket.broadcast.to(socket.room).emit("add_name",{from: socket.user, room: socket.room });
		socket.emit("update_room", {roomlist: roomnames, current: data.room, hash: data.hash});
		socket.emit("switch_pad", {hash: data.hash.toString()});
	});

	socket.on("hasPW", function(data) {		//checks if password exists
		var roomName= data.room;
		//socket.hash=data.hash;
		var file="poop";
		var ans=false;
		for(var i=0;i<roomnames.length;i++){
			if(roomnames[i]==roomName){
				file=hashes[i].toString();
				if(roomPW[i]!==''){
					ans=true;
				}
			}
		}
		socket.emit("pwCheck", {room: data.room, ans: ans, hash: file});
	});

	socket.on("new_pass",function(data) {
		for(var i=0;i<roomnames.length;i++){
			if(roomnames[i]==socket.room){
				roomPW[i]=data.pw;
			}
		}
	});

	socket.on("Validpw", function(data){		//checks if password is valid
		var file = "poop";
		var roomName= data.room;
		var pwAttempt=data.pw;
		console.log(pwAttempt);
		var ans=false;
		for(var i=0;i<roomnames.length;i++){
			if(roomnames[i]==roomName){
				file=hashes[i].toString();
				if(roomPW[i]==pwAttempt){
					console.log(roomPW[i]+"  =  "+pwAttempt);
					ans=true;
				}
			}
		}
		socket.emit("pwAttempt", {room: data.room, ans: ans, hash: file});
	});

	socket.on("privateMsg", function(data){
		var i=0;
		for(var index=0; index<usernames.length;index++){
			if(usernames[index]==data.rc){
				i=index;
			}
		}
		//socket.to(data["rc"]).emit("pm",{from: data["sn"], msg: data["msg"]});
		//socket.to(usernames[i]).emit("incomingPvtMsg",{from: data["sn"], msg: data["msg"]});
		//data["rc"].emit("incomingPvtMsg",{from: data["sn"], msg: data["msg"]});
		socket.to(UserSockets[i]).emit("incomingPvtMsg",{from: data.sn, msg: data.msg});
		socket.emit("outgoingPvtMsg",{to: data.rc, msg:data.msg});
		console.log("message for "+usernames[i]+" from "+data.sn);
	});

	socket.on("checkChatOwner", function(){
		var ans=false;
		console.log(socket.user);
		for(var index=0; index<roomnames.length;index++){
			console.log(roomnames[index]+" : "+roomCreators[index]);
			if(roomnames[index]==socket.room){
				if(roomCreators[index]==socket.user){
					ans=true;
				}
			}
		}
		socket.emit("ownsIt",{ans: ans});
	});

	socket.on("checkChatOwnerDelete", function(){
		var ans=false;
		console.log(socket.user);
		for(var index=0; index<roomnames.length;index++){
			console.log(roomnames[index]+" : "+roomCreators[index]);
			if(roomnames[index]==socket.room){
				if(roomCreators[index]==socket.user){
					ans=true;
				}
			}
		}
		socket.emit("deleteIt",{ans: ans});
	});

	socket.on("checkChatOwnerPass", function(){
		var ans=false;
		console.log(socket.user);
		for(var index=0; index<roomnames.length;index++){
			console.log(roomnames[index]+" : "+roomCreators[index]);
			if(roomnames[index]==socket.room){
				if(roomCreators[index]==socket.user){
					ans=true;
				}
			}
		}
		socket.emit("changeIt",{ans: ans});
	});

	socket.on("kick_me_out", function(){
		console.log("hello");
		socket.leave(socket.room);
		socket.join('default.js');
		socket.room='default.js';
		socket.emit("update_room", {roomlist: roomnames, current: 'default.js'});
		//socket.emit("switch_pad", {hash: 'https://firepad.firebaseio-demo.com/-JcNerfMNQJ053ViUbOn'});
		socket.emit("i_dont_want_to_hear_you");
	});

	socket.on("kickUser", function(data){
		var userToKick = data.user;
		var i=0;
		for(var index=0; index<usernames.length;index++){
			if(usernames[index]==userToKick){
				i=index;
			}
		}
		socket.to(UserSockets[i]).emit("kick_message_out", {room: socket.room});
		socket.emit("kick_message_in", {user: userToKick});
	});

	socket.on("send_image", function(data){
		console.log(socket.user+" : "+data.url); 
		io.sockets.in(socket.room).emit("image_to_client",{url:data.url, from: socket.user });
	});

	socket.on("send_video", function(data){
		console.log(socket.user+" : "+data.url); 
		io.sockets.in(socket.room).emit("video_to_client",{url:data.url, from: socket.user });
	});

	socket.on("delete_file", function(){
		for(var i=0; i<roomnames.length;i++){
			if(roomnames[i]===socket.room){
				roomnames[i] = 'null';
			}
		}
		socket.emit("update_room", {roomlist: roomnames, current: 'default.js'});
		socket.emit("i_dont_want_to_hear_you");
	});

});