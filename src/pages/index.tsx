import CurrentLocationButton from '@/components/commmos/CurrentLocationButton';
import Map from '@/components/map/Map';
import Markers from '@/components/map/Markers';

import StoreBox from '@/components/map/StoreBox';
import { StoreType } from '@/interface';
import axios from 'axios';

export default function Home({ stores }: { stores: StoreType[] }) {
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
export async function getStaticProps() {
  // export async function getSeverSideProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

  return {
    props: { stores: stores.data },
    revalidate: 60 * 60,
  };
}
