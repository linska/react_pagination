import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const total: number = 42;

const items = getNumbers(1, total).map(n => `Item ${n}`);

function getFilteredItems(fromIndex: number, toItem: number): string[] {
  return [...items].slice(fromIndex, toItem);
}

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fromIndex = (currentPage - 1) * perPage;
  const fromItem = fromIndex + 1;
  const toItem = Math.min(fromIndex + perPage, total);
  const pageInfo = `Page ${currentPage} (items ${fromItem} - ${toItem} of ${total})`;
  const selectedItems = getFilteredItems(fromIndex, toItem);

  function handlePageChange(page: number) {
    if (currentPage !== page) {
      setCurrentPage(page);
    }
  }

  function handleSelectChange(count: number) {
    setPerPage(count);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {pageInfo}
      </p>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onSelectChange={handleSelectChange}
      />

      <ul>
        {selectedItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
