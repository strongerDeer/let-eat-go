import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [router, status]);
  return (
    <>
      LoginPage
      <button
        type="button"
        onClick={() => signIn('google', { callbackUrl: '/' })}>
        Google
      </button>
      <button
        type="button"
        onClick={() => signIn('naver', { callbackUrl: '/' })}>
        Naver
      </button>
      <button
        type="button"
        onClick={() => signIn('kakao', { callbackUrl: '/' })}>
        Kakao
      </button>
    </>
  );
}
