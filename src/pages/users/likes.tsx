import Loading from '@/components/commmos/Loading';
import Pagenation from '@/components/commmos/Pagenation';
import StoreListBox from '@/components/commmos/StoreListBox';
import StoreBox from '@/components/map/StoreBox';
import { LikeAPIResponse, LikeInterface, StoreType } from '@/interface';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

export default function LikesPage() {
  const router = useRouter();
  const { page = '1' }: any = router.query;

  const fetchLikes = async () => {
    const { data } = await axios(`/api/likes?limit=10&page=${page}`);
    return data as LikeAPIResponse;
  };

  const {
    data: likes,
    isError,
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
          </ul>
          {likes?.totalPage && likes?.totalPage > 0 && (
            <Pagenation
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
