const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(errorHandler);

// database connection with mongoose and mongodb
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch(err => {
        console.log('Could not connect to MongoDB...', err);
    });

app.use('/todo', todoHandler);

function errorHandler(err, req, res, next) {
    if (res.headerSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.get('/', async (req, res) => {
    res.send('Hello Express and Mongoose App Server');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


// app.get('/', (req, res) => {
//     throw new Error('Something went wrong');
//     res.send('Hello To Do Application!');
//     res.status(500).send('Something went wrong!');
//     res.status(404).send('Page not found!');
//     res.status(200).send('Hello To Do Application!');
//     res.send(a);
// });

// invisible default error handling middleware
// app.use((err, req, res, next) => {
//     console.log(err);
//     res.status(500).send('Something went wrong!');
// });

// app.use((err, req, res, next) => {
//     if (err.message) {
//         res.send(err.message);
//         res.status(500).send(err.message);
//     } else {
//         res.send('Something went wrong!');
//         res.status(500).send('Something went wrong!');
//     }
// });