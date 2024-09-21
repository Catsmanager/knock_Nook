import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SelectPage({ setMarkerPosition }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [activeCategory, setActiveCategory] = useState(''); // 선택된 카테고리 상태
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]); // 마커 배열 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    // 지도 생성
    const mapInstance = new window.kakao.maps.Map(container, options);
    setMap(mapInstance);

    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [markers]);

  // 카테고리별 마커 추가 함수
  const addCategoryMarkers = (category) => {
    const categories = {
      restaurant: [
        { lat: 33.450701, lng: 126.570667, name: '식당 1' },
        { lat: 33.451701, lng: 126.571667, name: '식당 2' },
      ],
      cafe: [
        { lat: 33.449701, lng: 126.569667, name: '카페 1' },
        { lat: 33.448701, lng: 126.568667, name: '카페 2' },
      ],
      date: [
        { lat: 33.452701, lng: 126.572667, name: '데이트 1' },
        { lat: 33.453701, lng: 126.573667, name: '데이트 2' },
      ],
    };

    if (map) {
      // 기존 마커 제거
      markers.forEach((marker) => marker.setMap(null));

      // 새로운 마커 배열 생성 및 지도에 추가
      const newMarkers = categories[category].map((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.lat, place.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map); // 마커를 지도에 표시
        return marker;
      });

      setMarkers(newMarkers); // 상태에 새롭게 추가된 마커 저장
    }
  };

  // 마커 던지기 기능
  const addRandomMarker = () => {
    if (map) {
      const button = document.getElementById('throw-marker-button');
      button.classList.add('throw-marker-button-active');

      const randomLat = 33.45 + (Math.random() - 0.5) * 0.02;
      const randomLng = 126.57 + (Math.random() - 0.5) * 0.02;
      const markerPosition = new window.kakao.maps.LatLng(randomLat, randomLng);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      // 좌표 상태 업데이트
      setMarkerPosition({ lat: randomLat, lng: randomLng });

      // 1초 후 마커를 지도에 추가
      setTimeout(() => {
        marker.setMap(map); // 마커를 지도에 표시
        map.panTo(markerPosition); // 마커 위치로 지도 중심 이동
        setFadeOut(true); // 페이드 아웃 시작
      }, 1000);

      // 페이드 아웃 후 1초 뒤에 페이지 이동, 좌표 전달
      setTimeout(() => {
        navigate(`/page3?lat=${randomLat}&lng=${randomLng}`); // URL 파라미터로 좌표 전달
      }, 2000);
    }
  };

  // 카테고리 토글 버튼 클릭 시
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    addCategoryMarkers(category); // 카테고리에 맞는 마커 추가
  };

  return (
    <div
      className={`page2 ${fadeOut ? 'fade-out' : ''}`}
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/stone-wall.jpg'})` }}
    >
      {/* 포스터 */}
      <div className="poster">
        {/* 상단 토글 버튼 */}
        <div className="category-toggle">
          <button
            className={activeCategory === 'restaurant' ? 'active' : ''}
            onClick={() => handleCategoryChange('restaurant')}
          >
            식당
          </button>
          <button className={activeCategory === 'cafe' ? 'active' : ''} onClick={() => handleCategoryChange('cafe')}>
            카페
          </button>
          <button className={activeCategory === 'date' ? 'active' : ''} onClick={() => handleCategoryChange('date')}>
            데이트
          </button>
        </div>

        {/* 지도 */}
        <div id="map" className="map"></div>

        {/* 마커 던지기 버튼 */}
        <button id="throw-marker-button" className="throw-marker-button" onClick={addRandomMarker}>
          마커 던지기
        </button>
      </div>
    </div>
  );
}

export default SelectPage;
