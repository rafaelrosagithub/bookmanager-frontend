import React, { useState } from 'react';
import { fetchBooksByDateInterval } from '../api/api';
import { Book } from '../features/bookReducer';

type BooksFilterProps = {
  onFilter: (filteredBooks: Book[] | undefined) => void; // Usar `undefined` em vez de `null`
};

const BooksFilter: React.FC<BooksFilterProps> = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilterClick = async () => {
    if (!startDate || !endDate) {
      onFilter(undefined); // Restaurar a lista completa de livros
      return;
    }

    try {
      const filteredBooks = await fetchBooksByDateInterval(startDate, endDate);
      onFilter(filteredBooks); // Passar os livros filtrados
    } catch (error) {
      console.error('Error fetching filtered books:', error);
      onFilter(undefined); // Se houver erro, restaurar a lista completa
    }
  };

  const handleClearFilter = () => {
    setStartDate('');
    setEndDate('');
    onFilter(undefined);
  };

  return (
    <div className="books-filter" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '0.5rem' }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="filter-date-input"
          />
        </div>

        <div style={{ flex: 1, textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="filter-date-input"
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <button
          className="open-modal-btn"
          onClick={handleFilterClick}
          disabled={!startDate || !endDate}
        >
          Filter
        </button>
        <button className="open-modal-btn clear-btn" onClick={handleClearFilter}>
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default BooksFilter;
