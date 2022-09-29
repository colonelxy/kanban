// Server setup
const express = require("express");
const app = express();
const http = require('http').Server(app);
const cors = require("cors");
const PORT = 4000;
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//👇🏻 Generates a random string

const fetchID = () => Math.random().toString(36).substring(2, 10);


//👇🏻 Nested object

let tasks = {

    pending: {

        title: "pending",

        items: [

            {

                id: fetchID(),

                title: "Send the Figma file to Dima",

                comments: [],

            },

        ],

    },

    ongoing: {

        title: "ongoing",

        items: [

            {

                id: fetchID(),

                title: "Review GitHub issues",

                comments: [

                    {

                        name: "David",

                        text: "Ensure you review before merging",

                        id: fetchID(),

                    },

                ],

            },

        ],

    },

    completed: {

        title: "completed",

        items: [

            {

                id: fetchID(),

                title: "Create technical contents",

                comments: [

                    {

                        name: "Dima",

                        text: "Make sure you check the requirements",

                        id: fetchID(),

                    },

                ],

            },

        ],

    },

};


//👇🏻 host the tasks object via the /api route

app.get("/api", (req, res) => {

    res.json(tasks);

});



app.get("/api", (req, res) => {
    res.json({
        message: "Nango Jagedo",
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});





socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    
    socket.on("taskDragged", (data) => {
        console.log(data);
    });
    socket.on('disconnect', () => {
        socket.disconnect()
        console.log(`🔥: A user disconnected`);
    });
});


app.get("/api", (req, res) => {
    res.json({
        message: "Nango Jagedo",
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});






