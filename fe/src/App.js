import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css'; // 스타일 추가

function App() {
  const mapContainer = useRef(null); // 지도 DOM 요소 참조
  const [map, setMap] = useState(null); // 지도 객체
  const [markers, setMarkers] = useState([]); // 마커 객체 관리
  const [keyword, setKeyword] = useState(''); // 검색 키워드
  const [userLocation, setUserLocation] = useState({ lat: 37.5665, lng: 126.9784 }); // 기본 위치 (서울)
  const [places, setPlaces] = useState([]); // 검색 결과 장소 목록
  const [isNavOpen, setIsNavOpen] = useState(false); // 네비게이션 바 열림/닫힘 상태

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
          level: 3,
        };
        const createdMap = new window.kakao.maps.Map(mapContainer.current, options);
        setMap(createdMap);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ lat: latitude, lng: longitude });
              createdMap.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
            },
            () => console.error('사용자 위치를 가져올 수 없습니다.'),
          );
        }
      });
    };
    document.head.appendChild(script);
  }, [userLocation.lat, userLocation.lng]);

  const searchPlaces = async () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    try {
      const response = await axios.get('http://localhost:5000/api/places', {
        params: {
          query: keyword,
          x: userLocation.lng,
          y: userLocation.lat,
        },
      });
      const fetchedPlaces = response.data.documents;
      setPlaces(fetchedPlaces);

      const newMarkers = fetchedPlaces.map((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${place.place_name}</div>`,
        });
        window.kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map, marker);
        });

        return marker;
      });

      setMarkers(newMarkers);

      if (fetchedPlaces.length > 0) {
        const bounds = new window.kakao.maps.LatLngBounds();
        fetchedPlaces.forEach((place) => {
          bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
        });
        map.setBounds(bounds);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const moveToPlace = (place) => {
    const position = new window.kakao.maps.LatLng(place.y, place.x);
    map.setCenter(position);
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <button type="button" onClick={searchPlaces}>검색</button>
        <button type="button" onClick={() => setIsNavOpen(!isNavOpen)}>
          {isNavOpen ? '닫기' : '결과 보기'}
        </button>
      </div>
      {isNavOpen && (
        <div className="navigation">
          <h2>한눈에 보기</h2>
          <ul>
            {places.map((place) => (
              <button
                key={place.id}
                type="button"
                onClick={() => moveToPlace(place)}
                onKeyDown={(e) => e.key === 'Enter' && moveToPlace(place)}
                className="place-item"
              >
                {place.place_name}
              </button>
            ))}
          </ul>
        </div>
      )}
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default App;
