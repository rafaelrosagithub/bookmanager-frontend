import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setBooks} from './features/bookReducer';
import BooksList from './components/BooksList';
import {fetchBooks} from './api/api';
import './App.css'; 
import AddBookModal from './components/AddBookModal';
const App: React.FC = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadBooks = async () => {
            const books = await fetchBooks();
            dispatch(setBooks(books));
        };

        loadBooks();
    }, [dispatch]);

    return (
        <div className="App app-container">
          <h1>Book Management</h1>
      
          <BooksList onAddBookClick={() => setIsModalOpen(true)} />
      
          {isModalOpen && <AddBookModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
      
};

export default App;

