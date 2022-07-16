import { Book } from "../Book/Book"

export const Books = ({allBooks, searchBook, getBooks}) => {

    return (
        <div>
        {allBooks?.map(book => {
            return(

                <Book
                    key={book._id}
                    id={book._id}
                    title={book.title}
                    author={book.author}
                    publisher={book.publisher}
                    year={book.year}
                    image={book.imageM}
                    searchBook={searchBook}
                    so
                    getBooks={getBooks}
                    />
            )
        })}
        </div>
    )
}