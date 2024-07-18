import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import Map from '../../components/Map';
import FormMonument from '../../components/FormMonument';
import { isPointWithinRadius } from 'geolib';
import AuthContext from '../../context/AuthContext';

const socket = io('https://tokengo-z0d3.onrender.com/');

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [placesCoords, setPlacesCoords] = useState([]);
  const [capturedMonuments, setCapturedMonuments] = useState([]);
  const { token } = useContext(AuthContext);
  const [tracking, setTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Token being sent:', token);
    const fetchMonuments = async () => {
      console.log('Fetching monuments from server...');
      try {
        const response = await fetch('https://tokengo-z0d3.onrender.com/api/monuments/available', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching monuments');
        }

        const data = await response.json();
        console.log('Data fetched from server:', data);

        const availableMonuments = data.map(monument => ({
          lat: monument.location.coordinates[1],
          lon: monument.location.coordinates[0],
          name: monument.name,
          id: monument._id,
        }));

        setPlacesCoords(availableMonuments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching monuments:', error);
        setLoading(false);
      }
    };

    fetchMonuments();
  }, [token]);

  useEffect(() => {
    if (tracking) {
      const newWatchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { latitude, longitude };
          setLocations((prevLocations) => [...prevLocations, newLocation]);
          socket.emit('updateLocation', newLocation);
        },
        (error) => console.error(error),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      setWatchId(newWatchId);

      socket.on('locationUpdated', (data) => {
        setLocations((prevLocations) => [...prevLocations, data]);
      });

      return () => {
        if (newWatchId) {
          navigator.geolocation.clearWatch(newWatchId);
        }
        socket.off('locationUpdated');
      };
    } else {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        setWatchId(null);
      }
    }
  }, [tracking]);

  useEffect(() => {
    const checkProximity = () => {
      const currentLocation = locations[locations.length - 1];
      if (!currentLocation) return;

      placesCoords.forEach((place) => {
        if (!place.lat || !place.lon || !place.id) {
          return;
        }

        const isWithinRadius = isPointWithinRadius(
          { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
          { latitude: place.lat, longitude: place.lon },
          100 
        );

        if (isWithinRadius && !capturedMonuments.some(m => m.id === place.id)) {
          captureMonument(place.id);
        }
      });
    };

    if (locations.length > 0) {
      checkProximity();
    }
  }, [locations, placesCoords, capturedMonuments]);

  const captureMonument = async (monumentId) => {
    try {
      const response = await fetch('https://tokengo-z0d3.onrender.com/api/monuments/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ monumentId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error capturing monument');
      }

      const data = await response.json();
      console.log('Monument captured:', data);

      setCapturedMonuments((prevMonuments) => [...prevMonuments, data.monument]);
      setPlacesCoords((prevCoords) => prevCoords.filter(monument => monument.id !== monumentId));

      // Notificar al usuario
      alert(`¡Has capturado el monumento ${data.monument.name}!`);
    } catch (error) {
      console.error('Error capturing monument:', error);
      alert(`Error capturing monument: ${error.message}`);
    }
  };

  const handleMonumentAdded = (newMonument) => {
    setPlacesCoords((prevCoords) => [
      ...prevCoords,
      {
        lat: newMonument.location.coordinates[1],
        lon: newMonument.location.coordinates[0],
        name: newMonument.name,
        id: newMonument._id
      }
    ]);
  };

  const toggleTracking = () => {
    setTracking((prevTracking) => !prevTracking);
  };

  return (
    <div>
      <button onClick={toggleTracking}>
        {tracking ? 'Detener seguimiento' : 'Iniciar seguimiento'}
      </button>
      {loading ? <div>Loading map...</div> : (
        <>
          <Map locations={locations} placesCoords={placesCoords} />
          <FormMonument onMonumentAdded={handleMonumentAdded} />
          <div>
            <h3>Captured Monuments:</h3>
            <ul>
              {capturedMonuments.map((monument, index) => (
                <li key={index}>{monument.name}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;