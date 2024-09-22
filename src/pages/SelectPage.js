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

    fetch(`http://192.168.45.151:8080/street?restaurant=${toggleRestaurant}&cafe=${toggleCafe}&etc=${toggleEtc}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const streetData = await response.json();

        setTimeout(() => {
          marker.setMap(map);
          map.panTo(markerPosition);
        }, 1000);

        setTimeout(() => {
          setThrowAnimation(false);
        }, 1000);

        setTimeout(() => {
          navigate('/result', {
            state: {
              response: streetData,
              toggleRestaurant: toggleRestaurant,
              toggleCafe: toggleCafe,
              toggleEtc: toggleEtc,
            },
          });
        }, 3000);
      })

      .catch((error) => {
        console.log('Fetch Error: ', error);
        alert(error);
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
            <img src={`${process.env.PUBLIC_URL}/marker-icon.png`} alt="Marker Icon" />
          ) : (
            <span>마커 던지기</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default SelectPage;
