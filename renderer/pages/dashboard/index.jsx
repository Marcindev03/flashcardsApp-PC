import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { BsArrowReturnRight } from 'react-icons/bs';

import Meta from '../../components/Meta';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <>
      <Meta title="Flashcards App - Dashboard" />
      <div className={styles.wrapper}>
        <section className={styles.userPhoto}>
          <FaUser size="15rem" />
        </section>
        <section className={styles.greeting}>
          <h2>Hello Marcin</h2>
          <Link href="/learn">
            <a>Go to Learn section</a>
          </Link>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
