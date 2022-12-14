const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env' });

connectDB();

const transactions = require('./routes/Transactions');

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/v1/Transactions', transactions);

if(process.env.NODE_ENV === 'production'){
app.use(express.static('client/build'));

app.get('*', (req, res) => res.sendFile(path.resolve(_dirname, 'client', 'build',
'index.html')));
}

const PORT = process.env.PORT || 3003;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV.toUpperCase()} MODE on PORT ${PORT}`.blue.bold));  