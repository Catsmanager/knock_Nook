import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const data = location.state;

  console.log(data);
  const street = data.response.street;
  const restaurant = data.response.restaurant;
  const cafe = data.response.cafe;
  const etc = data.response.etc;

  useEffect(() => {
    const lat = data.lat;
    const lng = data.lng;
    setCoords({ lat, lng });

    setLoading(false);
  }, []);

  return (
    <div className="result-background">
      <div className="result-container">
        <div className="result-nook">
          <div className="result-nook-title">{street.name}</div>
          <div className="result-nook-desc">{street.detail}</div>
        </div>
        <div className="result-component-wrap">
          <div className="result-component">
            <img src="a.png" alt="1" className="result-component-image" />
            <div className="result-component-text">
              <div className="result-component-title">{restaurant.name}</div>
              <div className="result-component-desc">{restaurant.detail}</div>
            </div>
          </div>
          <div className="result-component">
            <img src="a.png" alt="1" className="result-component-image" />
            <div className="result-component-text">
              <div className="result-component-title">{cafe.name}</div>
              <div className="result-component-desc">{cafe.detail}</div>
            </div>
          </div>
          <div className="result-component">
            <img src="a.png" alt="1" className="result-component-image" />
            <div className="result-component-text">
              <div className="result-component-title">{etc.name}</div>
              <div className="result-component-desc">{etc.detail}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
