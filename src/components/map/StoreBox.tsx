import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { FiX } from 'react-icons/fi';

interface StoreBoxProps {
  store: any;
  setStore: Dispatch<SetStateAction<any>>;
}
import styles from './StoreBox.module.css';
import Link from 'next/link';
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
