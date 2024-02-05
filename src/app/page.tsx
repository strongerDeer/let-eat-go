import CurrentLocationButton from '@/components/commmos/CurrentLocationButton';
import Map from '@/components/map/Map';
import Markers from '@/components/map/Markers';

import StoreBox from '@/components/map/StoreBox';
import { StoreType } from '@/interface';

export default async function Page() {
  const stores: StoreType[] = await getData();

  return (
    <>
      <div className="h-screen">
        <Map />
        <Markers stores={stores} />
        <StoreBox />
        <CurrentLocationButton />
      </div>
    </>
  );
}
async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
}
