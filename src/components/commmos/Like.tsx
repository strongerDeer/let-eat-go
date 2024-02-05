'use client';

import { StoreType } from '@/interface';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

export default function Like({ storeId }: { storeId: number }) {
  const { data: session, status } = useSession();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${storeId}`);
    return data as StoreType;
  };
  const { data: store, refetch } = useQuery(
    `like-store-${storeId}`,
    fetchStore,
    {
      enabled: !!storeId,
      refetchOnWindowFocus: false,
    },
  );

  const toggleLike = async () => {
    if (session?.user && store) {
      try {
        const like = await axios.post('/api/likes', {
          storeId: store.id,
        });
        if (like.status === 201) {
          toast.success('가게를 찜했습니다.');
        } else {
          toast.warn('찜을 취소했습니다.');
        }
        refetch();
      } catch (error) {
        console.log(error);
      }
    } else if (status === 'unauthenticated') {
      toast.warning('로그인 후 이용해주세요!');
    }
  };

  return (
    <button type="button" onClick={toggleLike}>
      {status === 'unauthenticated' && store?.likes?.length
        ? '좋아(누름)'
        : '좋아안함(안누름)'}
    </button>
  );
}
