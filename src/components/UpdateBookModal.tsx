import React, { useState, useEffect } from 'react';
import { Book } from '../features/bookReducer';

type UpdateBookModalProps = {
  book: Book;
  onClose: () => void;
  onSave: (updatedBook: Book) => void;
};

const UpdateBookModal: React.FC<UpdateBookModalProps> = ({ book, onClose, onSave }) => {
  const [title, setTitle] = useState(book.title);
  const [authorName, setAuthorName] = useState(book.author.name);
  const [publishedDate, setPublishedDate] = useState(book.publishedDate);

  useEffect(() => {
    setTitle(book.title);
    setAuthorName(book.author.name);
    setPublishedDate(book.publishedDate);
  }, [book]);

  const handleSubmit = () => {
    if (!title || !authorName || !publishedDate) {
      alert('Please fill all fields');
      return;
    }

    const updatedBook: Book = {
      ...book,
      title,
      author: { ...book.author, name: authorName },
      publishedDate,
    };

    onSave(updatedBook);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Update Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={authorName}
          onChange={e => setAuthorName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Published Date"
          value={publishedDate}
          onChange={e => setPublishedDate(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBookModal;
