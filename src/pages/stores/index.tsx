import Loading from '@/components/commmos/Loading';
import Pagenation from '@/components/commmos/Pagenation';
import { StoreAPIResponse } from '@/interface';
import axios from 'axios';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export default function StoreListPage() {
  const router = useRouter();
  const { page = '1' }: { page?: any } = router.query;

  const {
    isLoading,
    isError,
    data: stores,
  } = useQuery(`stores-${page}`, async () => {
    const { data } = await axios(`/api/stores?page=${page}`);
    return data as StoreAPIResponse;
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
          {stores?.data.map((store, index) => (
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
      {stores?.totalPage && (
        <Pagenation totalPage={stores?.totalPage} page={page} />
      )}
    </div>
  );
}
