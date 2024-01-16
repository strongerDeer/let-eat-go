/* global kakao */
import Script from 'next/script';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { locationState, mapState } from '@/atom';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export default function Map({ lat, lng, zoom }: MapProps) {
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);

  const loadKakaoMap = () => {
    const kakao = window.kakao;
    //kakao map 로드
    kakao.maps.load(() => {
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(lat ?? location.lat, lng ?? location.lng), //지도의 중심좌표.
        level: zoom ?? location.zoom, //지도의 레벨(확대, 축소 정도)
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
