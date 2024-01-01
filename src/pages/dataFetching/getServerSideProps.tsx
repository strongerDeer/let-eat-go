// getServerSideProps: 요청마다 가져옴

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
const RANDOM_URL =
  'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain';

export default function Page({
  number,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>getServerSideProps</h1>
      <p>{number}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  number: number;
}> = async () => {
  const num = await fetch(RANDOM_URL);
  const number = await num.json();

  return { props: { number } };
};
