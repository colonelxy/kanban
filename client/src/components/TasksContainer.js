import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TasksContainer = ({ socket }) => {
	const [tasks, setTasks] = useState({});

	useEffect(() => {
		function fetchTasks() {
			fetch("http://localhost:4000/api")
				.then((res) => res.json())
				.then((data) => setTasks(data));
		}
		fetchTasks();
	}, []);

	useEffect(() => {
		socket.on("tasks", (data) => {
			setTasks(data);
		});
	}, [socket]);

	const handleDragEnd = ({ destination, source }) => {
		if (!destination) return;
		if (
			destination.index === source.index &&
			destination.droppableId === source.droppableId
		)
			return;

		socket.emit("taskDragged", {
			source,
			destination,
		});
	};
	return (
		<div className='container' >
			

			{/* 👇🏻 Returns an array of each tasks  */}
			<DragDropContext onDragEnd={handleDragEnd}>
				{Object.entries(tasks).map((task) => (
					<div
						className={`${task[1].title.toLowerCase()}__wrapper`}
						key={task[1].title}
					>
						<h3>{task[1].title} Tasks</h3>
						<div className={`${task[1].title.toLowerCase()}__container`}>
							<Droppable droppableId={task[1].title}>
								{(provided) => (
									<div ref={provided.innerRef} {...provided.droppableProps}>
										{task[1].items.map((item, index) => (
											<Draggable
												key={item.id}
												draggableId={item.id}
												index={index}
											>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className={`${task[1].title.toLowerCase()}__items`}
													>
														<p>{item.title}</p>
														<p className='comment'>
															<Link
																to={`/comments/${task[1].title}/${item.id}`}
															>
																{item.comments.length > 0
																	? `View Comments`
																	: "Add Comment"}
															</Link>
														</p>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					</div>
				))}
				</DragDropContext>
			</div>
	);
};

export default TasksContainer;



// import React from "react";
// import { Link } from "react-router-dom";

// const TasksContainer = ({ socket }) => {
//     return (
//         <div className='container'>
//             <div className='pending__wrapper'>
//                 <h3>Pending Tasks</h3>
//                 <div className='pending__container'>
//                     <div className='pending__items'>
//                         <p>Debug the Notification center</p>
//                         <p className='comment'>
//                             <Link to='/comments'>2 Comments</Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className='ongoing__wrapper'>
//                 <h3>Ongoing Tasks</h3>
//                 <div className='ongoing__container'>
//                     <div className='ongoing__items'>
//                         <p>Create designs for Novu</p>
//                         <p className='comment'>
//                             <Link to='/comments'>Add Comment</Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className='completed__wrapper'>
//                 <h3>Completed Tasks</h3>
//                 <div className='completed__container'>
//                     <div className='completed__items'>
//                         <p>Debug the Notification center</p>
//                         <p className='comment'>
//                             <Link to='/comments'>2 Comments</Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TasksContainer;
