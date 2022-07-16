const Book = require('../models/books');
const fs = require('fs');
const parse = require('csv-parser');

const getBook = async (data) => {
    const {title, author, year, publisher} = data;
    const obj = {};
    
    for (const key in data) {
        if (data[key] !== '') {
            let expReg = new RegExp(data[key], "i");
            obj[key] = expReg;
        };
    };
    if(title || author || year || publisher){
    try {
            const book = await Book.find(obj);
            if (book.length === 0) return "Book not found";
            return book; 
    } catch (error) {
        console.log(error);
    };
    } return "Book not found";
    };

const getBooks = async () => {
    const books = await Book.find().limit(8);
    return books;
}

const editBook = async (data, id) => {
    try {
        const {title, author, year, publisher, image} = data;

        const newBook = {
            title,
            author,
            year,
            publisher,
            imageM: image
        };

        await Book.findByIdAndUpdate(id, newBook);
        
        return 'Book updated';

    } catch (error) {
        console.log("Failed to update book", error);
    };
}

const deleteBook = async (id) => {
    try {
        await Book.findByIdAndRemove(id);
        return 'Book has been deleted';  
    } catch (error) {
        console.log("Failed to delete book");
    };
};

const postBook = async (data) => {
    
try {
    const book = new Book(data);
    await book.save();
    return 'Book created successfully';    
} catch (error) {
    console.log('Failed to create book');
};

}

const loadDB = async () => {

    const Allbooks = await Book.find();

    if(!Allbooks.length){
    
        fs.createReadStream('./books.csv')
        .pipe(
            parse()
        )
        .on('data', dataRow => {
            Book.create(dataRow)        
        })
        .on('end', () => {
            console.log("Batabase loader successfully");
    });
    } else {
        console.log("Batabase is loader");
    };
}

module.exports = {
    getBook,
    getBooks,
    editBook,
    deleteBook,
    loadDB,
    postBook
};