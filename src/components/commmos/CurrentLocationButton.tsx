import { mapState } from '@/atom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import Loader from './Loader';
import FullPageLoader from './FullPageLoader';

export default function CurrentLocationButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const map = useRecoilValue(mapState);

  const handleCurrentPosition = () => {
    setLoading(true);

    const options = {
      enabledHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );

          if (currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            toast.success('현재 위치로 이동하였습니다.');
          }

          return currentPosition;
        },
        () => {
          toast.error('현재 위치를 가져올 수 없습니다');
          setLoading(false);
        },
        options,
      );
    }
  };
  return (
    <>
      {loading && <FullPageLoader />}
      <button
        type="button"
        onClick={handleCurrentPosition}
        className="fixed z-10 right-5 bottom-10 bg-blue-200 rounded-md p-1">
        위치이동
      </button>
    </>
  );
}
