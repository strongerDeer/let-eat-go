import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  return (
    <>
      <h1>Page: {router.query.slug}</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/hello">hello</Link>
        <Link href="/bye">bye</Link>
      </nav>

      <br />
      <button
        type="button"
        onClick={() => {
          router.push('/test');
        }}>
        .push('/test')
      </button>

      <h2>push</h2>
      <p>히스토리 스택 추가.</p>
      <button
        type="button"
        onClick={() => {
          // router.push('/test');
          router.push({ pathname: '/[slug]', query: { slug: 'push' } });
        }}>
        push
      </button>
      <br />
      <h2>replace</h2>
      <p>히스토리 스택 추가 X 바꿈.</p>
      <button
        type="button"
        onClick={() => {
          router.replace({ pathname: '/[slug]', query: { slug: 'replace' } });
        }}>
        replace
      </button>

      <h2>reload</h2>
      <button
        type="button"
        onClick={() => {
          router.reload();
        }}>
        reload
      </button>
    </>
  );
}
