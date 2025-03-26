import React from 'react';
import { useState, useEffect } from 'react';
import Map from './components/Map';
import Loader from './components/Loader';

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events');
        const { events } = await res.json();
        setEventData(events);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {!loading ? <Map eventData={eventData} /> : <Loader />}
    </div>
  );
}

export default App;
