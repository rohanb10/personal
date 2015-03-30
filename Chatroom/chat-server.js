var http = require("http"),
        socketio = require("socket.io"),
        fs = require("fs");
 
var app = http.createServer(function(req, resp){
        fs.readFile("client.html", function(err, data){
		if(err) return resp.writeHead(500);
		resp.writeHead(200);
		resp.end(data);
	});
});
app.listen(3456);

var usernames = [];
var usercount = 0;
var roomnames = ["Default"];
var roomCreators= [""];
var roomPW=[""];
var roomcount = 0;
var UserSockets=[];

var io = socketio.listen(app);
io.sockets.on("connection", function(socket){
	socket.on('message_to_server', function(data) {
		console.log(data["from"]+" : "+data["message"]); 
		io.sockets.in(socket.room).emit("message_to_client",{message:data["message"], from: data["from"] });
	});
	
	socket.on("add_new_user", function(data) {
		socket.user = data["clientname"];
		socket.room = 'Default';
		usernames.push(data["clientname"]);
		UserSockets.push(socket.id);
		usercount++;
		socket.join('Default');
		socket.broadcast.to('Default').emit("add_name",{from: data["clientname"], room: socket.room });
		socket.emit("update_room", {roomlist: roomnames, current: 'Default'});
	});
	
	socket.on("create_room", function(data) {
		//socket.leave(socket.room);
		//socket.join(data["room"]);
		//socket.room = data["room"];
		roomnames.push(data["room"]);
		roomPW.push(data["password"]);
		roomCreators.push(socket.user);
		//roomnames[data["room"]]=[socket.user,data['password']];
		roomcount++;
		//socket.broadcast.to(data["room"]).emit("add_name",{from: socket.user, room: socket.room});
		console.log("Room: "+data["room"]+" and password: "+data["password"]);
		socket.broadcast.emit("update_room", {roomlist: roomnames, current: socket.room});
		socket.emit("update_room", {roomlist: roomnames, current: socket.room});
	});
	
	socket.on("switch_room", function(data) { 		//switches rooms
		socket.emit("leave",{from: socket.user,room: socket.room });
		socket.broadcast.to(socket.room).emit("leave",{from: socket.user,room: socket.room });
		socket.leave(socket.room);
		socket.join(data["room"]);
		socket.room = data["room"];
		socket.emit("add name",{from:socket.user, room: socket.room});
		socket.broadcast.to(socket.room).emit("add_name",{from: socket.user, room: socket.room });
		socket.emit("update_room", {roomlist: roomnames, current: data["room"]});
	});

	socket.on("hasPW", function(data) {		//checks if password exists
		var roomName= data["room"];
		var ans=false;
		for(var i=0;i<roomnames.length;i++){
			if(roomnames[i]==roomName){
				if(roomPW[i]!=''){
					ans=true;
				}
			}
		}
		socket.emit("pwCheck", {room: data["room"], ans: ans});
	});

	socket.on("Validpw", function(data){		//checks if password is valid
		var roomName= data["room"];
		var pwAttempt=data["pw"];
		console.log(pwAttempt);
		var ans=false;
		for(var i=0;i<roomnames.length;i++){
			if(roomnames[i]==roomName){
				if(roomPW[i]==pwAttempt){
					console.log(roomPW[i]+"  =  "+pwAttempt);
					ans=true;
				}
			}
		}
		socket.emit("pwAttempt", {room: data["room"], ans: ans});
	});

	socket.on("privateMsg", function(data){
		var i=0;
		for(var index=0; index<usernames.length;index++){
			if(usernames[index]==data["rc"]){
				i=index;
			}
		}
		//socket.to(data["rc"]).emit("pm",{from: data["sn"], msg: data["msg"]});
		//socket.to(usernames[i]).emit("incomingPvtMsg",{from: data["sn"], msg: data["msg"]});
		//data["rc"].emit("incomingPvtMsg",{from: data["sn"], msg: data["msg"]});
		socket.to(UserSockets[i]).emit("incomingPvtMsg",{from: data["sn"], msg: data["msg"]});
		socket.emit("outgoingPvtMsg",{to: data["rc"], msg:data["msg"]});
		console.log("message for "+usernames[i]+" from "+data["sn"]);
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

	socket.on("kick_me_out", function(data){
		console.log("hello");
		socket.leave(socket.room);
		socket.join('Default');
		socket.room='Default';
		socket.emit("update_room", {roomlist: roomnames, current: 'Default'});
	});

	socket.on("kickUser", function(data){
		var userToKick = data["user"];
		var i=0;
		for(var index=0; index<usernames.length;index++){
			if(usernames[index]==userToKick){
				i=index;
			}
		}
		socket.to(UserSockets[i]).emit("kick_message_out", {room: socket.room});
		socket.emit("kick_message_in", {user: userToKick});
	});
});