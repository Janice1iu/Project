import React, { useEffect, useState } from 'react';

const Location = ({ locationID }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/lo/${locationID}`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [locationID]);

  return (
    <div>
      <h1>Events at Location {locationID}</h1>
      <table>
        <thead>
          <tr>
            <th>Event Id</th>
            <th>Title</th>
            <th>Date/Time</th>
            <th>Description</th>
            <th>Presenter</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.eventId}>
              <td>{event.eventId}</td>
              <td>{event.title}</td>
              <td>{`${event.startDateTime} to ${event.endDateTime}`}</td>
              <td>{event.description}</td>
              <td>{event.presenter}</td>
              <td>{event.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Location;