import Image from 'next/image';
import Link from 'next/link';
import styles from './StoreBox.module.css';
import { FiX } from 'react-icons/fi';

import { StoreType } from '@/interface';
import { useRecoilState } from 'recoil';
import { currentStoreState } from '@/atom';
import Like from '../commmos/Like';

export default function StoreBox() {
  const [store, setStore] = useRecoilState(currentStoreState);

  return (
    <div className={styles.storeBox}>
      {store && (
        <>
          <Like storeId={store.id} />

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

          <Link href={`/stores/${store.id}`}>상세보기</Link>
          <button type="button" onClick={() => setStore(null)}>
            <FiX />
            <span className="a11y-hidden">닫기</span>
          </button>
        </>
      )}
    </div>
  );
}
