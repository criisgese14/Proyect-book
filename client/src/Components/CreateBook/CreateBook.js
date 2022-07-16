import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './createBook.css';

export const CreateBook = () => {

    const navigate = useNavigate();
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState({});

    const validate = input => {
        let errors = {};
        if (!input.title) {
            errors.title = 'Title is required';
        }  
        if (!input.author) {
            errors.author = 'Author is required';
        } 
        if (!input.publisher) {
            errors.publisher = 'Publisher is required';
        }
        return errors;
    }

    const createBook = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/book/create', input);
        alert('Book created');
        navigate('/');
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value});
        setErrors(validate({...input, [e.target.name]: e.target.value}));
    };

    return(
        <div>
            <h1 className="title-create">Create book</h1>
            <form onSubmit={e => createBook(e)} className='form-create'>
                <div className="input-row">
                <div className="input-create">
                <label>Image</label>
                <input 
                    placeholder="insert URL" 
                    name="imageM" 
                    value={input.imageM} 
                    onChange={(e) => handleChange(e)}
                    className='input-form'>
                </input>
                </div>
                <div className="input-create">
                <div className="labels">
                <label>Title(*)</label>
                {errors.title && (<p className="error">{errors.title}</p>)}
                </div>
                <input 
                    placeholder="title..."
                    value={input.title}
                    type='text'
                    name="title"
                    onChange={e => handleChange(e)}
                    className='input-form'>
                </input>
                </div>  
                </div>
                <div className="input-row">
                <div className="input-create">
                <label>Year</label>
                <input 
                    placeholder="year..."
                    value={input.year}
                    type='number'
                    name="year"
                    onChange={e => handleChange(e)}
                    className='input-form'>
                </input> 
                </div>
                <div className="input-create">
                <div className="labels">
                <label>Author(*)</label>
                {errors.author && (<p className="error">{errors.author}</p>)}
                </div>
                <input 
                    placeholder="author..."
                    value={input.author}
                    type='text'
                    name="author"
                    onChange={e => handleChange(e)}
                    className='input-form'>
                </input>
                </div>
                </div>
                <div className="input-row">
                <div className="input-create-publisher">
                <div className="labels">
                <label>Publisher(*)</label>
                {errors.publisher && (<p className="error">{errors.publisher}</p>)}
                </div>
                <input 
                    placeholder="publisher..."
                    value={input.publisher}
                    type='text'
                    name="publisher"
                    onChange={e => handleChange(e)}
                    className='input-form'>
                </input>
                </div>
                <div className="buttons-form-create">
                {errors.title || errors.author || errors.publisher ? <button className="button1-form-create-disabled" disabled>Create</button> : <button className="button1-form-create">Create</button>}
                <Link to='/'><button className="button2-form-create">Back</button></Link>
                </div>
                </div>    
            </form>
        </div>
        
    )
    
}