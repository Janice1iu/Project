import React, { useEffect, useState } from 'react'; 

const LocationTable = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch location data from the server
    fetch('http://localhost:3000/lo')
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error('Error fetching locations:', error));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Link</th>
          <th>Event Count</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location) => (
          <tr key={location.name}>
            <td>{location.name}</td>
            <td>
              <a href={location.link}>{location.link}</a>
            </td>
            <td>{location.eventCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LocationTable;