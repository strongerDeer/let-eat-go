import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button">
        {isOpen ? (
          <>
            <FiX /> 메뉴 닫기
          </>
        ) : (
          <>
            <FiMenu />
            메뉴 열기
          </>
        )}
      </button>

      {isOpen && <NavList />}
    </>
  );
}

interface NavListProps {
  className?: string;
}
const NavList = ({ className }: NavListProps) => {
  return (
    <nav>
      <ul className={className}>
        <li>
          <Link href="/stores">맛집 목록</Link>
        </li>
        <li>
          <Link href="/stores/new">맛집 생성</Link>
        </li>
        <li>
          <Link href="/stores/1">맛집 상세 페이지</Link>
        </li>
        <li>
          <Link href="/stores/1/edit">맛집 수정 페이지</Link>
        </li>
        <li>
          <Link href="/users/login">로그인 페이지</Link>
        </li>
        <li>
          <Link href="/users/mypage">마이 페이지</Link>
        </li>
        <li>
          <Link href="/users/likes">찜한 맛집 페이지</Link>
        </li>
      </ul>
    </nav>
  );
};

export default function Nav() {
  const [isPC, setIsPC] = useState(true);
  return <>{isPC ? <NavList className="flex gap-3" /> : <MobileNav />}</>;
}
