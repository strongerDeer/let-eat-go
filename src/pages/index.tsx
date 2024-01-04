import { useState } from 'react';

import Map from '@/components/map/Map';
import Markers from '@/components/map/Markers';

import StoreBox from '@/components/map/StoreBox';
import { StoreType } from '@/interface';

export default function Home({ stores }: { stores: StoreType[] }) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);

  return (
    <>
      <Map setMap={setMap} />
      <Markers stores={stores} map={map} setCurrentStore={setCurrentStore} />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}

export async function getStaticProps() {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`,
  ).then((res) => res.json());

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
