import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Page3.css';
import stoneWall from './images/stone-wall.jpg'; // 돌담 배경 이미지 import

function Page3() {
  const [coords, setCoords] = useState({ lat: null, lng: null }); // 좌표 상태 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [locationDescription, setLocationDescription] = useState(''); // 간략한 설명 저장
  const [activitySuggestions, setActivitySuggestions] = useState([]); // 활동 추천 저장
  const location = useLocation(); // 현재 URL 정보를 가져옴

  useEffect(() => {
    // URL 파라미터에서 좌표 추출
    const searchParams = new URLSearchParams(location.search);
    const lat = parseFloat(searchParams.get('lat'));
    const lng = parseFloat(searchParams.get('lng'));

    // 좌표 상태 업데이트
    if (!isNaN(lat) && !isNaN(lng)) {
      setCoords({ lat, lng });
      setLocationDescription(
        `이 위치는 위도 ${lat.toFixed(6)}도, 경도 ${lng.toFixed(6)}도에 위치한 멋진 지역입니다. 이곳은 평소에 잘 알려지지 않은 숨겨진 명소일 수 있습니다.`
      );

      // 활동 추천 설정 (임의의 예시 활동)
      setActivitySuggestions([
        '근처에서 하이킹',
        '현지 카페에서 커피 한잔',
        '주변 명소 탐방',
        '사진 촬영 명소'
      ]);
    }

    // 로딩 상태 해제
    setLoading(false);
  }, [location]);

  return (
    <div className="page3" style={{ backgroundImage: `url(${stoneWall})` }}>
      {/* 포스터 */}
      <div className="poster">
        {/* 좌표 정보 */}
        <h2>선택된 마커 위치</h2>
        <div className="description-box">
          {loading ? (
            <p>좌표를 불러오는 중입니다...</p>
          ) : coords.lat !== null && coords.lng !== null ? (
            <p>
              <strong>위도:</strong> {coords.lat.toFixed(6)} <br />
              <strong>경도:</strong> {coords.lng.toFixed(6)}
            </p>
          ) : (
            <p>유효한 좌표 정보가 없습니다.</p>
          )}
          {/* 숨겨진 상세 정보 */}
          <div className="hidden-details">
            <p>이 좌표는 특별한 숨겨진 명소입니다. 주변에 유명한 관광지들이 있으며, 자연경관이 매우 아름답습니다.</p>
          </div>
        </div>

        {/* 선택된 지역에 대한 간략한 설명 */}
        <div className="description-summary description-box">
          <h3>지역 간략 설명</h3>
          <p>{locationDescription}</p>
          <div className="hidden-details">
            <p>이 지역은 현지인들이 자주 찾는 장소입니다. 주변에 다양한 음식점과 휴식 공간이 마련되어 있어 방문객들이 편하게 쉴 수 있습니다.</p>
          </div>
        </div>

        {/* 활동 추천 */}
        <div className="description-container">
          <div className="description-box">
            <h3>추천 활동</h3>
            <ul>
              {activitySuggestions.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
            {/* 숨겨진 상세 정보 */}
            <div className="hidden-details">
              <p>하이킹 외에도 자전거 타기, 피크닉 같은 다양한 야외 활동을 즐길 수 있습니다.</p>
            </div>
          </div>

          {/* 주변 정보 */}
          <div className="description-box">
            <h3>주변 정보</h3>
            <p>이 지점 근처의 유명한 명소나 카페, 레스토랑 같은 주요 장소들을 탐험해보세요.</p>
            {/* 숨겨진 상세 정보 */}
            <div className="hidden-details">
              <p>이 지역은 독특한 건축물과 역사적인 장소로 유명합니다. 현지 문화를 경험할 수 있는 기회도 놓치지 마세요!</p>
            </div>
          </div>
        </div>

        {/* 지도 표시 */}
        <div id="map" className="map"></div>
      </div>
    </div>
  );
}

export default Page3;
