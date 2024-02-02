import { StoreType } from '@/interface';
import Link from 'next/link';

interface PagenationProps {
  totalPage: number;
  page: string;
  pathname: string;
}
export default function Pagenation({
  totalPage,
  page,
  pathname,
}: PagenationProps) {
  return (
    <div className="py-6 w-full px-10 flex justify-center gap-2 bg-white my-10 flex-wrap text-sm ">
      {totalPage <= 10 ? (
        [...Array(totalPage)].map((x, i) => (
          <Link key={i} href={{ pathname: pathname, query: { page: i + 1 } }}>
            {i + 1 === parseInt(page, 10) ? (
              <strong className="inline-flex justify-center items-center px-2 min-w-10 h-8 rounded border shadow-sm bg-white text-blue-600">
                {i + 1}
              </strong>
            ) : (
              <span className="inline-flex justify-center items-center  px-2 min-w-10 h-8 rounded border shadow-sm bg-white text-gray-300">
                {i + 1}
              </span>
            )}
          </Link>
        ))
      ) : (
        <>
          {parseInt(page) > 1 && (
            <Link
              href={{
                pathname: pathname,
                query: { page: parseInt(page) - 1 },
              }}
              className="inline-flex justify-center items-center  px-2 min-w-10 h-8 rounded border shadow-sm bg-white text-gray-300">
              이전
            </Link>
          )}
          <strong className="inline-flex justify-center items-center px-2 min-w-10 h-8 rounded border shadow-sm bg-white text-blue-600">
            {page}
          </strong>
          {parseInt(page) < totalPage && (
            <Link
              href={{
                pathname: pathname,
                query: { page: parseInt(page) + 1 },
              }}
              className="inline-flex justify-center items-center  px-2 min-w-10 h-8 rounded border shadow-sm bg-white text-gray-300">
              다음
            </Link>
          )}
        </>
      )}
    </div>
  );
}
