import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  // const data = location.state;

  const data = {
    street: {
      id: 3,
      name: '평화시장 닭똥집골목',
      detail:
        '평화시장 닭똥집 골목은 대구 시내에서 칠성시장을 거쳐 동촌유원지로 가는 대구의 오래된 길목에 자리 잡고 있다. 닭똥집 골목의 시작은 1972년 문을 연 <삼아통닭>이 닭똥집 튀김 요리를 선보이면서이다. 나이가 지긋한 손님들의 술 안주로 시작한 닭똥집은 생닭을 팔다가 허가 없이 닭을 잡지 못하는 법이 생기면서 닭을 닭 튀김 집으로 발전한 것인데, 80년대가 들어서면서 본격 대구 스타일의 닭똥집 골목이 등장했다.',
      picture:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20141023_28%2Fhjwj_1414061286112loTFc_JPEG%2F20140913_181039.jpg&type=sc960_832',
    },
    cafe: {
      streetId: 3,
      name: '믹쓰케이크',
      address: '대구 동구 아양로9길 10 1층 믹쓰케이크',
      kindof: '카페',
      detail: '저당 케이크가 맛있는 베이커리 카페',
      picture:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEyMTFfMjEg%2FMDAxNjcwNzQyODIwMTYx.uUM9CUzz6KVhln0ccdHH7A4T841RResKNRtyskx31nkg.ldplmVQy778FDMovGYWQUGTxUjHd_lfOBaQ_Ppane0Eg.JPEG.sichanmi%2FIMG_7408.JPG&type=sc960_832',
      liked: 0,
    },
    restaurant: {
      streetId: 3,
      name: '삼아통닭',
      address: '대구 동구 아양로9길 10 삼아아파트',
      kindof: '식당',
      detail: '평화시장 닭똥집거리의 시작이었던 닭똥집 맛집',
      picture:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20141023_28%2Fhjwj_1414061286112loTFc_JPEG%2F20140913_181039.jpg&type=sc960_832',
      liked: 0,
    },
    etc: {
      streetId: 3,
      name: '삼아통닭',
      address: '대구 동구 아양로9길 10 삼아아파트',
      kindof: '식당',
      detail: '평화시장 닭똥집거리의 시작이었던 닭똥집 맛집',
      picture:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20141023_28%2Fhjwj_1414061286112loTFc_JPEG%2F20140913_181039.jpg&type=sc960_832',
      liked: 0,
    },
  };

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
