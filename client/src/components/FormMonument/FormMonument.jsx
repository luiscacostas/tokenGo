import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const FormMonument = ({ onMonumentAdded }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [icon, setIcon] = useState('');
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMonument = { name, city, latitude: parseFloat(latitude), longitude: parseFloat(longitude), icon };

    try {
      const response = await fetch('https://tokengo-production.up.railway.app/api/monuments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newMonument),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error adding new monument');
      }

      const data = await response.json();
      console.log(data)
      onMonumentAdded(data.monument);
    } catch (error) {
      console.error('Error adding monument:', error);
      alert(`Error adding monument: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
      </div>
      <div>
        <label>Latitude:</label>
        <input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
      </div>
      <div>
        <label>Longitude:</label>
        <input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
      </div>
      <div>
        <label>Icon URL:</label>
        <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} required />
      </div>
      <button type="submit">Add Monument</button>
    </form>
  );
};

export default FormMonument;
