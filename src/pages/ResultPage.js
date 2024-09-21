import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  // const data = location.state;

  const data = location.state;

  const street = data.street;
  const restaurant = data.restaurant;
  const cafe = data.cafe;
  const etc = data.etc;

  const toggleRestaurant = true;
  const toggleCafe = true;
  const toggleEtc = true;

  useEffect(() => {
    const lat = data.lat;
    const lng = data.lng;
    setCoords({ lat, lng });

    setLoading(false);
  }, []);

//로딩 중이라면 
  if (loading) {
    return <div>잠깐만 기다려주세요</div>;
  }

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
                <div className="result-component-liked">♥ {restaurant.liked}</div>
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