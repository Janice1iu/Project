/* This is for testing purpose, I replaced this code with Daisy's search.jsx, this alone work (need overall implementation)*/
import React, { useState } from "react";
import "./about.css";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [sortedData, setSortedData] = useState([]);

  const handleSearch = async () => {
    if (searchText === "") {
      alert("Invalid input, please type it again!");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/keywords?keywords=${searchText}`);
      const dataGOT = await response.json();
      setSortedData(dataGOT);
      console.log(dataGOT);
    } catch (error) {
      console.error(error);
    }
    setSearchText("");
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>
        <FaSearch />
      </button>
      {/* Render the sortedData */}
      {sortedData.map((location) => (
        <div key={location.id}>
          <h3>{location.name}</h3>
          <p>{location.description}</p>
          {/* Render other fields as needed */}
        </div>
      ))}
    </div>
  );
};

