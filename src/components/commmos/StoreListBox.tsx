import { StoreType } from '@/interface';
import Image from 'next/image';
import Link from 'next/link';

export default function StoreListBox({ store }: { store: StoreType }) {
  return (
    <li>
      <Link href={`/stores/${store.id}`}>
        <Image
          src={`/images/markers/${store.category || 'default'}.png`}
          width={48}
          height={48}
          alt=""
        />
        {store.name}
      </Link>
    </li>
  );
}
