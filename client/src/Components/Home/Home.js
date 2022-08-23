import axios from "axios";
import { useEffect, useState } from "react";
import { Books } from "../Books/Books";
import { Link } from "react-router-dom";
import './home.css';

export const Home = () => {

    const [data, setData] = useState([]);
    const [books, setBook] = useState('');
    const [, setOrder] = useState('');
    const [input, setInput] = useState({title: '',author: '',year:'',publisher:''});
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        getBooks();
    },[books]);

    const getBooks = async () => {
        const books = await axios.get('http://localhost:3001/book');
        setData(books.data);
    };
    
    const searchBook = async (e, input) => {
        e.preventDefault();
        if(input || input !== {}) {
            try {
                const book = await axios.post('http://localhost:3001/book', input);
                setInput({title: '',author: '',year:'',publisher:''});
                setBook(book.data);
            } catch (error) {
                console.log('Book not found', error);
            };
        };
    }; 

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value});
    };

    const changeStatus = () => {
    if(isActive){
        setActive(false);
    } else {
        setActive(true);
    };
};
    const sort = (e) => {
        console.log(e.target.value);
        if (e.target.value === 'Author') {
            books.sort((a,b) => {
                if(a.author.toLowerCase() > b.author.toLowerCase())return 1;
                if(a.author.toLowerCase() < b.author.toLowerCase())return -1;
                return 0;
            });
            setBook(books);
            setOrder(e.target.value);
        };
        if (e.target.value === 'Year') {
            books.sort((a, b) => {
                if(a.year > b.year) return 1;
                if(a.year < b.year) return -1;
                return 0;
            });
            setBook(books);
            setOrder(e.target.value);
        };
        if (e.target.value === 'Title'){
            books.sort((a,b) => {
                if(a.title > b.title) return 1;
                if(a.title < b.title) return -1;
                return 0;
            })
            setBook(books);
            setOrder(e.target.value);
        };
        if (e.target.value === 'Default'){
            books.sort((a, b) => {
                if(a._id > b._id) return 1;
                if(a._id < b._id) return -1;
                return 0;
            })
            setBook(books);
            setOrder(e.target.value);
        };
    };

    return (
        <div>
            <div className="nav">
            <div className="header">
            <h1 className="title">Welcome to Book Directory!</h1>
            <div>
            <Link to='/create'><button className="button-create">Create book</button></Link>
            </div>
            </div>
            </div>
            {isActive ?
            <div className="form-advanced">
            <h3 className="subtitle-search">Search by:</h3>
            <form onSubmit={e => searchBook(e, input)} className='search-form'>
                <div className="input-container">
                    <label>Title</label>
                    <input
                        className="input-advanced"
                        placeholder="title..."
                        value={input.title}
                        type='text'
                        name="title"
                        onChange={e => handleChange(e)}>
                    </input>
                </div>
                <div className="input-container">
                <label>Year</label>
                <input 
                    className="input-advanced"
                    placeholder="year..."
                    value={input.year}
                    type='text'
                    name="year"
                    onChange={e => handleChange(e)}>
                </input>
                </div>
                <div className="input-container">
                <label>Author</label>
                <input 
                    className="input-advanced"
                    placeholder="author..."
                    value={input.author}
                    type='text'
                    name="author"
                    onChange={e => handleChange(e)}>
                </input>
                </div>
                <div className="input-container">
                <label>Publisher</label>
                <input 
                    className="input-advanced"
                    placeholder="publisher..."
                    value={input.publisher}
                    type='text'
                    name="publisher"
                    onChange={e => handleChange(e)}>
                </input>
                </div>
                <div className="button-pair">
                <button className="button-form">Search</button>
                <button onClick={() => changeStatus()} className='button-form'>Cancel</button>
                </div>
            </form>
            </div>:
            <div className="nav">
            <form onSubmit={e => searchBook(e, input)} className='form-simple'>
                <input
                    placeholder="search book..."
                    value={input.title}
                    type='text'
                    name="title"
                    onChange={e => handleChange(e)}
                    className='search-book'>
                </input>
                <button className="search-button">Search</button>
                <button onClick={() => changeStatus()} className='advanced-button'>Advanced</button>
            </form>
            </div>}
            { Array.isArray(books) ?
            <div>
            <div className="header-order">
            <div className="order-book">    
            <h3 className="order-title">Order by: </h3>
            <select onChange={e => sort(e)} className='select'>
                <option value='Default'>Default</option>
                <option value='Title'>Title</option>
                <option value='Author'>Author</option>
                <option value='Year'>Year</option>
            </select>
            </div>
            <h3 className="result-book">{books?.length} result(s)</h3>
            </div>
            <Books allBooks={books} searchBook={searchBook} getBooks={getBooks}/>
            </div>
            : null}   
            <h2 className="subtitle">Some books:</h2>
            <Books allBooks={data} searchBook={searchBook} getBooks={getBooks}/>
        </div>
    )
}