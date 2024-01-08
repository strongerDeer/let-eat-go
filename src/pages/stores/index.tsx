import React, { useCallback, useEffect, useRef } from 'react';

import Image from 'next/image';
import { StoreType } from '@/interface';

import { useInfiniteQuery } from 'react-query';

import axios from 'axios';
import Loading from '@/components/commmos/Loading';

import { useRouter } from 'next/router';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Loader from '@/components/commmos/Loader';

export default function StoreListPage() {
  const router = useRouter();
  const { page = '1' }: any = router.query;
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios('/api/stores?page=' + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
      },
    });

    return data;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery('stores', fetchStores, {
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

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
          {stores?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((store: StoreType, i: number) => (
                <li key={i}>
                  <Image
                    src={`/images/markers/${store.category || 'default'}.png`}
                    width={48}
                    height={48}
                    alt=""
                  />
                  {store.name}
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      )}
      <button onClick={() => fetchNextPage()}>next</button>

      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref}></div>
    </div>
  );
}
