/* global kakao */
import Script from 'next/script';
import { Dispatch, SetStateAction } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  setMap: Dispatch<SetStateAction<any>>;
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}
// 서울 강남
const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;
const DEFAULT_ZOOM = 3;

export default function Map({ setMap, lat, lng, zoom }: MapProps) {
  const loadKakaoMap = () => {
    const kakao = window.kakao;
    //kakao map 로드
    kakao.maps.load(() => {
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(lat || DEFAULT_LAT, lng || DEFAULT_LNG), //지도의 중심좌표.
        level: zoom || DEFAULT_ZOOM, //지도의 레벨(확대, 축소 정도)
      };
      var map = new kakao.maps.Map(container, options);

      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-full"></div>
    </>
  );
}
