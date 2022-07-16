import axios from "axios"
import { useState } from "react"
import './book.css';
import img from './book.png';
export const Book = ({id, title, author, publisher, year, image, searchBook, getBooks}) => {

    const [isActive, setActive] = useState(false);
    const [input, setInput] = useState({id, title, author, publisher, year, image})
    const [, setOrder] = useState('');

    async function deleteBook(e, id){
        e.preventDefault()
        await axios.delete('http://localhost:3001/book/' + id);
        alert('The book has been deleted');
        getBooks();
        searchBook(e, input);
        setOrder(' ')
    };

    function edit(){
        if(isActive) {
            setActive(false);
        } else {
            setActive(true);
        };
    };

    function handleChange(e){
        setInput({ ...input, [e.target.name]: e.target.value});
    };

    async function editBook(e, id, input){
        e.preventDefault();
        await axios.put('http://localhost:3001/book/' + id, input);
        edit();
        searchBook(e, input);
        getBooks();
        setOrder('');
    };

    
    return(
        <div>
            {
            isActive ? 
            <form onSubmit={(e) => editBook(e, id, input)} className='form-edit'>
            <div>
            <div className="input-container-edit">
                <label>Image</label>
                <input name="image" value={input.image} onChange={(e) => handleChange(e)}  className='input-edit'></input>
            </div>
            <div className="input-container-edit">
                <label>Title</label>
                <input name="title" value={input.title} onChange={(e) => handleChange(e)} className='input-edit'></input>
            </div>
            <div className="input-container-edit">
                <label>Author</label>
                <input name="author" value={input.author} onChange={(e) => handleChange(e)} className='input-edit'></input>
            </div>
            </div>
            <div>
            <div className="input-container-edit">
                <label>Year</label>
                <input name="year" value={input.year} onChange={(e) => handleChange(e)} className='input-edit'></input>
            </div>
            <div className="input-container-edit">
                <label>Publisher</label>
                <input name="publisher" value={input.publisher} onChange={(e) => handleChange(e)} className='input-edit'></input>
            </div>
            <div className="buttons-edit">
            <button type="button" onClick={() => edit()} className='button-edit'>Cancel</button>
            <button className="button-edit">Edit</button>
            </div>
            </div>
            </form>: 
            <div className="book-container">
            <div className="book-card">
            <div className="title-book">
            <p>Title: {title}</p>
            </div>
            <div className="book-detail">
            {image ? <img src={image} alt='imagen del libro' className="img-book"/> : <img src={img} alt='imagen del libro' className="img-book"/>}
            <div className="detail-container">
            <p>Author: {author}</p>
            <p>Publisher: {publisher}</p>
            <p>Year: {year}</p>
            <div className="button-book">
            <button onClick={() => edit()} className='button-book'>edit</button>
            <button onClick={(e) => deleteBook(e, id)} className='button-book'>delete</button>
            </div>
            </div>
            </div>
            </div>
        </div>
    }
        </div>
        
        
    )
}