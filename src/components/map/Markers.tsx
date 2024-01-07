import { StoreType } from '@/interface';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

interface MarkersProps {
  map: any;
  stores: StoreType[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}
export default function Markers({
  map,
  stores,
  setCurrentStore,
}: MarkersProps) {
  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      const kakao = window.kakao;
      // 식당 데이터 마커 띄우기
      // https://apis.map.kakao.com/web/sample/basicMarker/
      // https://apis.map.kakao.com/web/sample/basicMarkerImage/
      stores?.map((store) => {
        const { lat, lan, category, name } = store;
        const markerPosition = new kakao.maps.LatLng(lat, lan);

        const imageSrc = `/images/markers/${category || 'default'}.png`; // 마커이미지의 주소입니다
        const imageSize = new kakao.maps.Size(40, 40); // 마커이미지의 크기입니다
        const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption,
        );

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
        // marker.setMap(null);
        const iwContent = `<div class"infowindow">${name}</div>`;

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          position: markerPosition,
          content: iwContent,
          xAnchor: 0.6,
          yAnchor: 0.6,
        });

        // 마커에 마우스오버 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          infowindow.open(map, marker);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'mouseout', function () {
          // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
          infowindow.close();
        });

        // 선택한 가게 저장
        kakao.maps.event.addListener(marker, 'click', function () {
          setCurrentStore(store);
        });
      });
    }
  }, [map, setCurrentStore, stores]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);
  return <></>;
}
