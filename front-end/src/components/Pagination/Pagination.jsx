import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "./pagination.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageLinks = 3;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageLinks / 2));
    let endPage = Math.min(totalPages, startPage + maxPageLinks - 1);

    if (totalPages <= maxPageLinks) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage === 1) {
        startPage = 1;
        endPage = 2;
      } else if (currentPage === totalPages) {
        endPage = totalPages;
        startPage = endPage - 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <>
      {totalPages === 0 ? (
        <></>
      ) : (
        <div className="paging">
          {totalPages !== 1 ? (
            <div
              className="paging-control"
              onClick={() =>
                setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1)
              }
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          ) : (
            <></>
          )}
          <div className="paging-nums">
            {getPageNumbers().map((page, index) => (
              <div
                key={index}
                onClick={() => setCurrentPage(page)}
                className={
                  page === currentPage
                    ? "paging-item paging-active"
                    : "paging-item"
                }
              >
                {page}
              </div>
            ))}
          </div>
          {totalPages !== 1 ? (
            <div
              className="paging-control"
              onClick={() =>
                setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1)
              }
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;
