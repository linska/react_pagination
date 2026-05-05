import { getNumbers } from '../../utils';
import classNames from 'classnames';

interface PaginationProps {
  total: number;
  perPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  onSelectChange: (perPage: number) => void;
}

const SelectOptions: number[] = [3, 5, 10, 20];

export const Pagination = ({
  total,
  perPage = 5,
  currentPage = 1,
  onPageChange,
  onSelectChange,
}: PaginationProps) => {
  const pageCount = Math.ceil(total / perPage);
  const pageList: number[] = getNumbers(1, pageCount);

  function handlePageChange(page: number) {
    if (page === currentPage) {
      return;
    }

    if (page < 1 || page > pageCount) {
      return;
    }

    onPageChange(page);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = event.currentTarget.value;

    onSelectChange(Number(value));
  }

  return (
    <>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSelectChange}
          >
            {SelectOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pageList.map(page => (
          <li
            key={page}
            className={classNames('page-item', {
              active: page === currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage === pageCount,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageCount}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
