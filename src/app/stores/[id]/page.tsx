'use client';

import Loader from '@/components/commmos/Loader';
import Map from '@/components/map/Map';
import { StoreType } from '@/interface';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import Marker from '@/components/map/Marker';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Like from '@/components/commmos/Like';
import Comments from '@/components/comments';

interface ParamsProps {
  params: { id: string };
  searchParams: { page: string };
}

export default function StoreDetailPage({ params, searchParams }: ParamsProps) {
  const router = useRouter();
  const id = params.id;
  const { status } = useSession();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data as StoreType;
  };
  const {
    data: store,
    isFetching,
    isSuccess,
    isError,
  } = useQuery<StoreType>(`store-${id}`, fetchStore, {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const handleDelete = async () => {
    const confirm = window.confirm('해당 가게를 삭제하시겠습니까?');

    if (confirm && store) {
      try {
        const result = await axios.delete(`/api/stores?id=${store?.id}`);
        if (result.status === 200) {
          toast.success('삭제되었습니다');
          router.replace('/');
        } else {
          toast.error('다시 시도해 주세요');
        }
      } catch (error) {
        console.log(error);
        toast.error('다시 시도해 주세요');
      }
    }
  };

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }
  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            {store?.name}
          </h3>
          {status === 'authenticated' && store && <Like storeId={store?.id} />}

          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            {store?.category}
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                주소
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.address}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                전화번호
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.phone}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                업종명
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.storeType}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                식품인증 구분
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.foodCertifyName}
              </dd>
            </div>
          </dl>
        </div>

        {isSuccess && (
          <>
            <div className="w-full mx-auto h-[500px] overflow-hidden ">
              <Map lat={store?.lat} lng={store?.lng} zoom={10} />
              <Marker store={store} />
            </div>
            <Comments storeId={store.id} page={searchParams.page} />{' '}
          </>
        )}

        {status === 'authenticated' && (
          <>
            <Link href={`/stores/${store?.id}/edit`}>수정</Link>
            <button type="button" onClick={handleDelete}>
              삭제
            </button>
          </>
        )}
      </div>
    </>
  );
}
