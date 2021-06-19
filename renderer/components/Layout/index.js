import Link from 'next/link';

import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link href="/sets">
              <a>Sets</a>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/flashcards">
              <a>Flashcards</a>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/learn">
              <a>Learn</a>
            </Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
