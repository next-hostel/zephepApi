const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
require("./db/conn");

const app = express();

// bring routes
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');

app.get('/', (req, res) => {
    res.send("Hello ")
})


//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: 'http://localhost:3000' }));
}

// Routes Middlewares
app.use(authRoutes);
app.use(userRoutes);




const port = process.env.PORT || 8000
app.listen(port, (req, res) => {
    console.log(`Server is Running on port ${port}`);
})