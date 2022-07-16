const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const { loadDB } = require('./controllers');
const app = express();

require('./database');

//Settings
const port = 3001;

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Routes
app.use('/book', require('./routes/book.routes'));


//Starting
app.listen(port, () => {
    console.log(`server on port ${port}`);
});
loadDB();



