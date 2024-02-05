'use client';

import { DISTRICT_ARR } from '@/data/store';

import { useRecoilState } from 'recoil';
import { searchState } from '@/atom';

export default function SearchFilter() {
  const [search, setSearch] = useRecoilState(searchState);

  return (
    <div>
      <input
        onChange={(e) => setSearch({ ...search, q: e.target.value })}
        type="search"
        placeholder="음식점 검색"
      />
      <select
        onChange={(e) => setSearch({ ...search, district: e.target.value })}>
        <option value="">지역선택</option>
        {DISTRICT_ARR.map((data) => (
          <option value={data} key={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
}
