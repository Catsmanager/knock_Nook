import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const data = location.state;
  const street = data.response.street;
  const restaurant = data.response.restaurant;
  const cafe = data.response.cafe;
  const etc = data.response.etc;

  const toggleRestaurant = data.toggleRestaurant;
  const toggleCafe = data.toggleCafe;
  const toggleEtc = data.toggleEtc;

  const [restLiked, setRestLiked] = useState(restaurant.liked);
  const [cafeLiked, setCafeLiked] = useState(cafe.liked);
  const [etcLiked, setEtcLiked] = useState(etc.liked);

  const addLikes = async (id) => {
    const url = `http://192.168.45.151:8080/like/${id}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log(response.json());
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // 에러 발생 시 에러를 다시 던져서 호출한 곳에서 처리할 수 있게 함
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
                <div
                  className="result-component-liked"
                  onClick={() => {
                    setRestLiked(restLiked + 1);
                    addLikes(restaurant.id);
                  }}
                >
                  ♥ {restLiked}
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
                {/* <div className="result-component-liked" onClick={() => setCafeLiked(cafeLiked + 1)}>
                  ♥ {cafeLiked}
                </div> */}
                <div
                  className="result-component-liked"
                  onClick={() => {
                    setCafeLiked(cafeLiked + 1);
                    addLikes(cafe.id);
                  }}
                >
                  ♥ {cafeLiked}
                </div>
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
                <div
                  className="result-component-liked"
                  onClick={() => {
                    setEtcLiked(etcLiked + 1);
                    addLikes(etc.id);
                  }}
                >
                  ♥ {etcLiked}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
