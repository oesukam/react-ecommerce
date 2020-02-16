import React from 'react';
import './Pagination.scss';
import angleLeft from '../../assets/icons/angle-left.svg';
import angleRight from '../../assets/icons/angle-right.svg';
import propTypes from 'prop-types';

const renderBeforeDots = (page, pages) =>
  page > 3 ? (
    <li>
      <span className="pagination-dots" />
    </li>
  ) : null;

const renderAfterDots = (page, pages) =>
  page + 2 < pages ? (
    <li>
      <span className="pagination-dots" />
    </li>
  ) : null;

const renderBeforeCurrent = (page, _, goToPage) => {
  const links = [];
  if (page > 3) {
    links.push(page - 2);
  }

  if (page > 2) {
    links.push(page - 1);
  }

  return links.map((link, index) => (
    <li key={index}>
      <button
        type="button"
        onClick={() => goToPage(link)}
        className={`pagination-page page-${link}-btn`}
        aria-label={`Goto page ${link}`}
      >
        {link}
      </button>
    </li>
  ));
};

const renderAfterCurrent = (page, pages, goToPage) => {
  const links = [];
  if (page + 1 < pages) {
    links.push(page + 1);
  }
  if (page + 2 < pages) {
    links.push(page + 2);
  }

  return links.map((link, index) => (
    <li key={index}>
      <button
        type="button"
        onClick={() => goToPage(link)}
        className={`pagination-page page-${link}-btn`}
        aria-label={`Goto page ${link}`}
      >
        {link}
      </button>
    </li>
  ));
};

const Pagination = ({ page, pages, goToPage }) => (
  <nav
    className="pagination-container"
    role="navigation"
    aria-label="pagination"
  >
    <button
      disabled={page < 2}
      onClick={() => goToPage(page - 1)}
      type="button"
      className="pagination-nav prev-btn"
    >
      <img
        src={angleLeft}
        className="pagination-arrow"
        alt="Pagination arrow"
      />
      <span className="ml-10">Back</span>
    </button>

    <ul className="pagination-pages">
      {pages > 1 && page !== 1 ? (
        <li>
          <button
            type="button"
            onClick={() => goToPage(1)}
            className="pagination-page page-1-btn"
            aria-label="Goto page 1"
          >
            1
          </button>
        </li>
      ) : null}
      {renderBeforeDots(page, pages)}
      {renderBeforeCurrent(page, pages, goToPage)}
      <li>
        <button
          type="button"
          className={`pagination-page active page-${page}-btn`}
          aria-label={`Goto page ${page}`}
        >
          {page}
        </button>
      </li>
      {renderAfterCurrent(page, pages, goToPage)}
      {renderAfterDots(page, pages)}
      {pages > 1 && page !== pages ? (
        <li>
          <button
            type="button"
            onClick={() => goToPage(pages)}
            className={`pagination-page page-${pages}-btn`}
            aria-label={`Goto page ${pages}`}
          >
            {pages}
          </button>
        </li>
      ) : null}
    </ul>
    <button
      type="button"
      className="pagination-nav next-btn"
      onClick={() => goToPage(page + 1)}
      disabled={page >= pages}
    >
      <span className="mr-10">Forward</span>
      <img
        src={angleRight}
        className="pagination-arrow"
        alt="Pagination arrow"
      />
    </button>
  </nav>
);

Pagination.propTypes = {
  page: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
  pages: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
  goToPage: propTypes.func.isRequired,
};

export default Pagination;
