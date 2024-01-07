import Loading from '@/components/commmos/Loading';
import { StoreType } from '@/interface';
import axios from 'axios';
import Image from 'next/image';
import { useQuery } from 'react-query';

export default function StoreListPage() {
  const {
    isLoading,
    isError,
    data: stores,
  } = useQuery('stores', async () => {
    const { data } = await axios('/api/stores');
    return data as StoreType[];
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>다시 시도해주세요</p>;
  }

  return (
    <div>
      {stores && (
        <ul>
          {stores.map((store, index) => (
            <li key={index}>
              <Image
                src={`/images/markers/${store.category || 'default'}.png`}
                width={48}
                height={48}
                alt=""
              />
              {store.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
