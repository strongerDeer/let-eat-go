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
              store.bizcnd_code_nm ? store.bizcnd_code_nm : 'default'
            }.png`}
            width={100}
            height={100}
            alt=""
          />
          {store.upso_nm}
          {store.tel_no}

          {store.cob_code_nm}
          {store.rdn_addr_code}
          {store.crtfc_gbn_nm}

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
