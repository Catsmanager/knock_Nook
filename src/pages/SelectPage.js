import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/_SelectPage.scss'

function SelectPage({ setMarkerPosition }) {
  const [map, setMap] = useState(null);
  const [toggleActive, setToggleActive] =useState([false, false, false]);
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
    if (map) {
      const button = document.getElementById('throw-marker-button');
      button.classList.add('throw-marker-button-active');

      const randomLat = 35.8708 + (Math.random() - 0.5) * 0.1;
      const randomLng = 128.5955 + (Math.random() - 0.5) * 0.1;
      const markerPosition = new window.kakao.maps.LatLng(randomLat, randomLng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      setMarkerPosition({ lat: randomLat, lng: randomLng });

      // 1초 후 마커를 지도에 추가
      setTimeout(() => {
        marker.setMap(map); // 마커를 지도에 표시
        map.panTo(markerPosition); // 마커 위치로 지도 중심 이동
      }, 1000);

      // 페이드 아웃 후 1초 뒤에 페이지 이동, 좌표 전달
      setTimeout(() => {
        navigate(`/result?lat=${randomLat}&lng=${randomLng}`); // URL 파라미터로 좌표 전달
      }, 3000);
    }
  };

  // 카테고리 토글 버튼 클릭 시
  const handleCategoryChange = (category) => {};

  return (
    <div className="select-background">
      <div className="select-container">
        <div className="select-toggle-container">
          <button onClick={() => handleCategoryChange('restaurant')}>식당</button>
          <button onClick={() => handleCategoryChange('cafe')}>카페</button>
          <button onClick={() => handleCategoryChange('date')}>데이트</button>
        </div>
        <div id="map" className="select-map"></div>
        <button className={`select-marker-btn ${throwAnimation ? 'active' : ''}`} onClick={throwMarker}>
          마커 던지기
        </button>
      </div>
    </div>
  );
}

export default SelectPage;
