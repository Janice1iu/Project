//fav
import React, { useState, useEffect } from "react";
import "./about.css";

// const data = [
//   {
//     eventCount: 10,
//     link: "http://localhost:3000/lo/87110120",
//     name: "Kwai Tsing Theatre (Lecture Room)",
//   },
//   {
//     eventCount: 13,
//     link: "http://localhost:3000/lo/87510010",
//     name: "Hong Kong City Hall (Theatre)",
//   },
// ];
// console.log(data);
const Favourite = () => {
  const [searchText, setSearchText] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [sortedData, setSortedData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/fav");
      const dataGOT = await response.json();
      //ammend
      setSortedData(dataGOT);
      console.log(dataGOT);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSort = () => {
    const newSortingOrder = sortingOrder === "asc" ? "desc" : "asc";
    setSortingOrder(newSortingOrder);

    const sorted = [...sortedData].sort((a, b) => {
      if (a.eventCount === "") return 1;
      if (b.eventCount === "") return -1;
      if (newSortingOrder === "desc") {
        return parseInt(a.eventCount) - parseInt(b.eventCount);
      } else {
        return parseInt(b.eventCount) - parseInt(a.eventCount);
      }
    });

    setSortedData(sorted);
  };

  const handleLinkClick = (event, link) => {
    const clickedText = event.target.textContent;
    const internalLink = `/ev/${clickedText}`;
    console.log(internalLink);
    window.open(link, "_blank");
  };

  const generateEmptyRows = () => {
    const emptyRows = [];
    const remainingRows = 10 - sortedData.length;

    for (let i = 0; i < remainingRows; i++) {
      emptyRows.push(
        <tr key={`empty-row-${i}`}>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }

    return emptyRows;
  };

  return (
    <div className="container">
      <div className="title">
        <b>Favourite Locations</b>
      </div>
      <div className="separator"></div>
      <div className="result_bx">
        <table className="result-table">
          <thead>
            <tr>
              <th>
                <div>Venue Name</div>
              </th>
              <th>
                <div>Link to Location Details</div>
              </th>
              <th onClick={handleSort}>
                <u>No. of Events</u>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td id={`name-${index + 1}`}>{item?.name || ""}</td>
                <td
                  id={`link-${index + 1}`}
                  onClick={(event) => handleLinkClick(event, item?.link || "")}
                  style={{ cursor: "pointer" }}
                >
                  <u>{item?.link || ""}</u>
                </td>
                <td id={`no-${index + 1}`}>{item?.eventCount || ""}</td>
              </tr>
            ))}
            {generateEmptyRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Favourite;
