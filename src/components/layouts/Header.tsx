import Link from 'next/link';
import Nav from './Nav';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link href="/">Let Eat Go!</Link>
      </h1>
      <Nav />
    </header>
  );
}
