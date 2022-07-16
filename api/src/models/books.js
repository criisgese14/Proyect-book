const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
    ISBN: String,
    title: String,
    author: String,
    year: String,
    publisher: String,
    imageS: String,
    imageM: String
});

module.exports = mongoose.model('Book', BookSchema);