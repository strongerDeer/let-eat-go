import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import styles from './StoreBox.module.css';
import { FiX } from 'react-icons/fi';

import { StoreType } from '@/interface';

interface StoreBoxProps {
  store: StoreType | null;
  setStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox({ store, setStore }: StoreBoxProps) {
  return (
    <div className={styles.storeBox}>
      {store && (
        <>
          <Image
            src={`/images/markers/${
              store.category ? store.category : 'default'
            }.png`}
            width={100}
            height={100}
            alt=""
          />
          {store.name}
          {store.phone}

          {store.storeType}
          {store.address}
          {store.foodCertifyName}

          <Link href="">상세보기</Link>
          <button type="button" onClick={() => setStore(null)}>
            <FiX />
            <span className="a11y-hidden">닫기</span>
          </button>
        </>
      )}
    </div>
  );
}