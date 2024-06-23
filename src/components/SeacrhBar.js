import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/index/search/" + search);
  };

  return (
    <form onSubmit={handleSubmit} className="search_super">
      <input
        type="text"
        className="search-inp"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon2"
        value={search}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        id="search-btn"
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          color: "#FFFFFF",
          width: "25%",
          backgroundColor: "#FF0084",
          justifyContent: "center",
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
