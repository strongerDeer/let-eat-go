// 'use client';
import { useState } from 'react';

import Map from '@/components/map/Map';
import Markers from '@/components/map/Markers';

import * as stores from '@/data/store_data.json';
import StoreBox from '@/components/map/StoreBox';

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeDatas = stores['DATA'];

  console.log(currentStore);

  return (
    <>
      <Map setMap={setMap} />
      <Markers
        map={map}
        storeDatas={storeDatas}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}
