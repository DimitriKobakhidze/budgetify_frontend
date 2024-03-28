import { useRef } from "react";

import "./searchBar.css";

const SearchBar = ({ handleSearch, defaultValue = "" }) => {
  const searchInputRef = useRef(null);

  return (
    <div className="search-bar-ctn">
      <img
        src="/search-icon.png"
        alt="search"
        onClick={() => handleSearch(searchInputRef.current.value)}
      />
      <input
        type="text"
        placeholder="Search"
        className="search-bar-input"
        ref={searchInputRef}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default SearchBar;
