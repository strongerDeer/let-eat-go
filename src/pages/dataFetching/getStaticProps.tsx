// getStaticProps: 빌드된 시점의 데이터

//https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props

import type { InferGetStaticPropsType, GetStaticProps } from 'next';
const RANDOM_URL =
  'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain';

export default function Page({
  number,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>getStaticProps</h1>
      <p>{number}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{ number: number }> = async () => {
  const num = await fetch(RANDOM_URL);
  const number = await num.json();
  return { props: { number } };
};
