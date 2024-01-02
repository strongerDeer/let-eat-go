/* global kakao */

import Script from 'next/script';

declare global {
  interface Window {
    kakao: any;
  }
}
export default function Map() {
  const loadKakaoMap = () => {
    //kakao map 로드
    window.kakao.maps.load(() => {
      var container = document.getElementById('map');
      var options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };
      var map = new window.kakao.maps.Map(container, options);
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
      <div id="map" className="w-full h-screen bg-slate-50"></div>
    </>
  );
}
