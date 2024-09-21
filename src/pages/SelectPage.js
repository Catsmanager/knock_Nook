import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SelectPage({ setMarkerPosition }) {
  const [map, setMap] = useState(null);
  const [toggleRestaurant, setToggleRestaurant] = useState(false);
  const [toggleCafe, setToggleCafe] = useState(false);
  const [toggleEtc, setToggleEtc] = useState(false);
  const [throwAnimation, setThrowAnimation] = useState(false);
  const navigate = useNavigate();

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

    fetch('http://172.30.1.43:8080/street?one=true&two=true&three=true')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const streetData = await response.json();

        setTimeout(() => {
          marker.setMap(map); // 마커를 지도에 표시
          map.panTo(markerPosition); // 마커 위치로 지도 중심 이동
        }, 1000);

        setTimeout(() => {
          setThrowAnimation(false);
        }, 1000);

        setTimeout(() => {
          navigate('/result', { state: { lat: randomLat, lng: randomLng, response: streetData } });
        }, 3000);
      })
      .catch((error) => {
        console.log('Fetch Error: ', error);
      });
  };

  return (
    <div className="select-background">
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
          마커 던지기
        </button>
      </div>
    </div>
  );
}

export default SelectPage;
