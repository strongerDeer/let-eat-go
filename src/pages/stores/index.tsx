import { StoreType } from '@/interface';
import Image from 'next/image';

export default function StoreListPage({ stores }: { stores: StoreType[] }) {
  return (
    <div>
      {stores && (
        <ul>
          {stores.map((store, index) => (
            <li key={index}>
              <Image
                src={`/images/markers/${store.category || 'default'}.png`}
                width={48}
                height={48}
                alt=""
              />
              {store.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`,
  ).then((res) => res.json());

  return {
    props: { stores },
  };
}
