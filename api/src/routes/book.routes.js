const express = require('express');
const { getBook, editBook, deleteBook, getBooks, postBook } = require('../controllers');
const router = express.Router();

router.post('/', async (req, res) => {
    const data = req.body;
    try {
        const book = await getBook(data);
        res.json(book);
    } catch (error) {
        console.log('book not found', error);
    };
});

router.get('/', async (req, res) => {
    try {
        const books = await getBooks();
        res.json(books);
    } catch (error) {
        console.log(error);
    };
});

router.post('/create', async (req, res) => {
    req.body.year ? req.body.year : 0;
    const data = req.body;
    try {
        const response = await postBook(data);
        res.json(response);
    } catch (error) {
        console.log('failes to create, ', error);
    };
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    try {
        const book = await editBook(data, id);
        res.json(book);
    } catch (error) {
        console.log("updated failed", error);
    };
});

router.delete('/:id', async (req, res) => {

    const { id } = req.params;
    
    try {
    
        const book = await deleteBook(id);
        res.json(book);    
    
    } catch (error) {
        console.log(error);
    };
});

module.exports = router;