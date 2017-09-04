/**
 * 
 * @authors kong
 * @date    2017-08-25 13:45:14
 * @version $Id$
 */
var socket = io("ws://localhost:3000");
var local = new Local(socket);
var remote = new Remote(socket);

socket.on('waiting',function(str){
	
})