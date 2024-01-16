import { DISTRICT_ARR } from '@/data/store';
import { Dispatch, SetStateAction } from 'react';

interface SearchFilterProps {
  setQ: Dispatch<SetStateAction<string | null>>;
  setDistrict: Dispatch<SetStateAction<string | null>>;
}
export default function SearchFilter({
  q,
  setQ,
  setDistrict,
}: SearchFilterProps) {
  return (
    <div>
      <input
        onChange={(e) => setQ(e.target.value)}
        type="search"
        placeholder="음식점 검색"
      />
      <select onChange={(e) => setDistrict(e.target.value)}>
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
