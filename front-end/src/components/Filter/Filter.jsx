import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";

import "./filter.css";

const Filter = ({ filter, filterList, setFilter, setCurrentPage }) => {
  const [showFilter, setShowFilter] = useState(false);
  const toggleFilter = () => {
    setShowFilter(!showFilter);
    if (!showFilter) {
      document.querySelector(".filter-box").style.borderRadius = "8px 8px 0 0";
    } else {
      document.querySelector(".filter-box").style.borderRadius = "8px";
    }
  };
  const selectFilter = (filterType) => {
    setCurrentPage(1);
    setFilter(filterType);
    toggleFilter();
  };

  document.body.addEventListener("click", (event) => {
    const homeFilterBox = document.querySelector(".filter-box");
    if (homeFilterBox && !event.target.closest(".filter-box")) {
      setShowFilter(false);
      homeFilterBox.style.borderRadius = "8px";
    }
  });

  const unFilter = () => {
    setCurrentPage(1);
    setFilter("");
    toggleFilter();
  };
  return (
    <>
      <div className="filter-box" onClick={toggleFilter}>
        {filter ? filter : "Price filter"}
        {filter ? (
          <FontAwesomeIcon icon={faXmark} onClick={unFilter} />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} />
        )}
      </div>
      {showFilter && (
        <div className="filter-dropdown">
          {filterList.map((item, index) => (
            <div key={index} onClick={() => selectFilter(item)}>
              {item}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Filter;
