import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteBook as deleteBookFromAPI, updateBook as updateBookFromAPI } from '../api/api';
import { deleteBook as deleteBookFromStore, updateBook as updateBookFromStore } from '../features/bookReducer';
import BooksFilter from './BooksFilter';
import { Book } from '../features/bookReducer';
import UpdateBookModal from './UpdateBookModal';

type BooksListProps = {
  onAddBookClick: () => void;
};

const BooksList: React.FC<BooksListProps> = ({ onAddBookClick }) => {
  const booksFromStore = useSelector((state: RootState) => state.books.books);
  const [filteredBooks, setFilteredBooks] = useState<Book[] | undefined>(undefined);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const dispatch = useDispatch();

  const booksToDisplay = filteredBooks ?? booksFromStore; 

  const handleDelete = async (id: number) => {
    try {
      const success = await deleteBookFromAPI(id);
      if (success) {
        dispatch(deleteBookFromStore(id)); 
        if (filteredBooks) {
          setFilteredBooks(filteredBooks.filter(book => book.id !== id));
        }
      } else {
        console.error('API returned false, could not delete the book.');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleUpdate = async (updatedBook: Book) => {
    try {
      const updated = await updateBookFromAPI(updatedBook.id, {
        title: updatedBook.title,
        author: updatedBook.author.name,
        publishedDate: updatedBook.publishedDate,
      });
      
      dispatch(updateBookFromStore(updated));
  
      setSelectedBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleFilter = (filteredBooks: Book[] | undefined) => {
    setFilteredBooks(filteredBooks);
  };

  return (
    <div>
      <div
        className="header-container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <h2>Books</h2>
        <button className="open-modal-btn" onClick={onAddBookClick}>
          Add Book
        </button>
      </div>

      <BooksFilter onFilter={handleFilter} />

      <ul>
        {booksToDisplay.length === 0 && <li>No books found</li>}
        {booksToDisplay.map(book => (
        <li key={book.id} style={{ marginBottom: '0.5rem' }}>
          <span
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
              color: '#3498db',
              transition: 'color 0.3s ease',
            }}
            onClick={() => setSelectedBook(book)}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#2c3e50')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#3498db')}
          >
            {book.title} by {book.author.name} (Published: {book.publishedDate})
          </span>
          <button
            className="delete-btn"
            onClick={() => handleDelete(book.id)}
            style={{ marginLeft: 16 }}
          >
            Delete
          </button>
        </li>
        ))}
      </ul>

      {selectedBook && (
        <UpdateBookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)} 
          onSave={handleUpdate} 
        />
      )}
    </div>
  );
};

export default BooksList;
