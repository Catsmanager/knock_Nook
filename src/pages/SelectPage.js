import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SelectPage({ setMarkerPosition }) {
  const [map, setMap] = useState(null);
  const [toggleRestaurant, setToggleRestaurant] = useState(false);
  const [toggleCafe, setToggleCafe] = useState(false);
  const [toggleEtc, setToggleEtc] = useState(false);
  const [throwAnimation, setThrowAnimation] = useState(false);
  const navigate = useNavigate();

  const tapeImage = `${process.env.PUBLIC_URL}/tape.png`;

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(35.8708, 128.5955),
      level: 7,
    };
    const mapInstance = new window.kakao.maps.Map(container, options);
    setMap(mapInstance);
  }, []);

  const throwMarker = () => {
    setThrowAnimation(true);

    const randomLat = 35.8708 + (Math.random() - 0.5) * 0.1;
    const randomLng = 128.5955 + (Math.random() - 0.5) * 0.1;
    const markerPosition = new window.kakao.maps.LatLng(randomLat, randomLng);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    setMarkerPosition({ lat: randomLat, lng: randomLng });

    fetch('http://172.20.10.3:8080/street?restaurant=true&cafe=true&etc=true')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const streetData = await response.json();
        console.log(streetData); // 데이터가 잘 들어오는지 확인

        setTimeout(() => {
          marker.setMap(map); // 마커를 지도에 표시
          map.panTo(markerPosition); // 지도 중심을 마커 위치로 이동
        }, 1000);

        setTimeout(() => {
          setThrowAnimation(false);
        }, 1000);

        // 데이터를 받아온 후 결과 페이지로 네비게이트
        setTimeout(() => {
          navigate('/result', {
            state: {
              lat: randomLat,
              lng: randomLng,
              response: streetData,
            },
          });
        }, 3000);
      })
      .catch((error) => {
        console.log('Fetch Error: ', error);
      });
  };

  return (
    <div className="select-background">
      <div className="tape" style={{ backgroundImage: `url(${tapeImage})` }}></div>
      <div className="select-container">
        <div className="select-toggle-container">
          <button className={`${toggleRestaurant ? 'on' : ''}`} onClick={() => setToggleRestaurant(!toggleRestaurant)}>
            식당
          </button>
          <button className={`${toggleCafe ? 'on' : ''}`} onClick={() => setToggleCafe(!toggleCafe)}>
            카페
          </button>
          <button className={`${toggleEtc ? 'on' : ''}`} onClick={() => setToggleEtc(!toggleEtc)}>
            기타
          </button>
        </div>
        <div id="map" className="select-map"></div>
        <button className={`select-marker-btn ${throwAnimation ? 'active' : ''}`} onClick={map ? throwMarker : null}>
        {throwAnimation ? (
          <img src={`${process.env.PUBLIC_URL}/marker-icon.png`} alt="Marker Icon" />):(
          <span>마커 던지기</span>)}
        </button>
      </div>
    </div>
  );
}

export default SelectPage;