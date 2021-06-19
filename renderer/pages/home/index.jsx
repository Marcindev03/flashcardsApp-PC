import Link from 'next/link';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Flashcards App</h1>
      <button className={styles.loginBtn}>
        <Link href="/dashboard">
          <a>Login</a>
        </Link>
      </button>
    </div>
  );
};

export default Home;
