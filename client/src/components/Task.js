import React from "react";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import Nav from "./Nav";
import socketIO from "socket.io-client";

// Pass Socket-io into the required components where communiations are made within the server 
const socket = socketIO.connect("http://localhost:4000");

const Task = () => {
	return (
		<div>
			<Nav />
			<AddTask socket={socket} />
			<TasksContainer socket={socket} />
		</div>
	);
};

export default Task;