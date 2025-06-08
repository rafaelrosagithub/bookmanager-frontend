import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../features/bookReducer';
import { createBook } from '../api/api';

interface AddBookModalProps {
  onClose: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');

  const handleAddBook = async () => {
    if (!title || !author || !publishedDate) {
      alert('Please fill all fields');
      return;
    }
    const newBook = await createBook({ title, author, publishedDate });
    dispatch(addBook(newBook));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Add Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <input
          type="date"
          placeholder="Published Date"
          value={publishedDate}
          onChange={e => setPublishedDate(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleAddBook}>Add</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
