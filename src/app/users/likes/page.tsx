'use client';

import Loading from '@/components/commmos/Loading';
import Pagination from '@/components/commmos/Pagination';
import StoreListBox from '@/components/commmos/StoreListBox';

import { LikeAPIResponse, LikeInterface } from '@/interface';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

export default function LikesPage({ params }: { params?: { page?: string } }) {
  const page = params?.page || '1';

  const fetchLikes = async () => {
    const { data } = await axios(`/api/likes?limit=10&page=${page}`);
    return data as LikeAPIResponse;
  };

  const {
    data: likes,
    isError,
    isSuccess,
    isLoading,
  } = useQuery(`likes-${page}`, fetchLikes);

  if (isError) {
    return <p>다시 시도해주세요</p>;
  }

  return (
    <div>
      <h2>찜한 맛집</h2>
      {likes && (
        <>
          <ul>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {likes?.data?.map((like: LikeInterface, i) => (
                  <React.Fragment key={i}>
                    {like.store && <StoreListBox store={like.store} />}
                  </React.Fragment>
                ))}
              </>
            )}
            {isSuccess && !!!likes.data.length && (
              <p>
                찜한 가게가 없습니다<div className=""></div>
              </p>
            )}
          </ul>
          {likes?.totalPage && likes?.totalPage > 0 && (
            <Pagination
              totalPage={likes?.totalPage}
              page={page}
              pathname="likes"
            />
          )}
        </>
      )}
    </div>
  );
}
