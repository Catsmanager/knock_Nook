import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const data = location.state;

  const street = data.response.street;
  const restaurant = data.response.restaurant;
  const cafe = data.response.cafe;
  const etc = data.response.etc;

  const toggleRestaurant = data.toggleRestaurant;
  const toggleCafe = data.toggleCafe;
  const toggleEtc = data.toggleEtc;

  useEffect(() => {
    const lat = data.lat;
    const lng = data.lng;
    setCoords({ lat, lng });

    setLoading(false);
  }, []);

  const addLikes = async (id) => {
    const url = `http://172.20.10.3:8080/like/${id}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-Custom-Header': encodeURIComponent(
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZWFuaWRoMTAxMUBnb…hrR7j3Ug5HYm4zO1NrR2iE30lT9PfPqn3GH8-hPYgXU85oedQ'
          ),
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Data updated successfully:', result);

      // 필요한 경우 상태 업데이트 또는 다른 작업 수행
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="result-background">
      <div className="result-container">
        <div className="result-nook" style={{ backgroundImage: `url(${street.picture})` }}>
          <div className="result-nook-title">{street.name}</div>
          <div className="result-nook-desc">{street.detail}</div>
        </div>
        <div className="result-component-wrap">
          {toggleRestaurant && (
            <div className="result-component">
              <img src={restaurant.picture} alt="1" className="result-component-image" />
              <div className="result-component-text">
                <div className="result-component-title">{restaurant.name}</div>
                <div className="result-component-desc">{restaurant.detail}</div>
                <div className="result-component-addr">{restaurant.address}</div>
                <div className="result-component-liked" onClick={() => addLikes(restaurant.id)}>
                  ♥ {restaurant.liked}
                </div>
              </div>
            </div>
          )}
          {toggleCafe && (
            <div className="result-component">
              <img src={cafe.picture} alt="2" className="result-component-image" />
              <div className="result-component-text">
                <div className="result-component-title">{cafe.name}</div>
                <div className="result-component-desc">{cafe.detail}</div>
                <div className="result-component-addr">{cafe.address}</div>
                <div className="result-component-liked">♥ {cafe.liked}</div>
              </div>
            </div>
          )}
          {toggleEtc && (
            <div className="result-component">
              <img src={etc.picture} alt="3" className="result-component-image" />
              <div className="result-component-text">
                <div className="result-component-title">{etc.name}</div>
                <div className="result-component-desc">{etc.detail}</div>
                <div className="result-component-addr">{etc.address}</div>
                <div className="result-component-liked">♥ {etc.liked}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
