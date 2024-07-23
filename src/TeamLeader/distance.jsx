import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const MyComponent = () => {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [distance, setDistance] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleCalculateDistance = useCallback(() => {
    if (startPoint && endPoint) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: startPoint,
          destination: endPoint,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setResponse(result);
            const distanceValue = result.routes[0].legs[0].distance.text;
            setDistance(distanceValue);
          } else {
            console.error(`Error fetching directions ${result}`);
            setError('Error fetching directions. Please check the console for more details.');
          }
        }
      );
    }
  }, [startPoint, endPoint]);

  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY"
      onLoad={() => console.log('Script loaded')}
      onError={(error) => {
        console.error('Error loading Google Maps script:', error);
        setError('Error loading Google Maps script.');
      }}
      libraries={['places']}
    >
      <div>
        <input
          type="text"
          placeholder="Start Point"
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Point"
          value={endPoint}
          onChange={(e) => setEndPoint(e.target.value)}
        />
        <button onClick={handleCalculateDistance}>Calculate Distance</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>Distance: {distance}</p>
      </div>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {response && (
          <DirectionsRenderer
            directions={response}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyComponent;
