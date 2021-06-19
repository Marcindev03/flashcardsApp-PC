import Link from 'next/link';

import '../styles/global.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

const Layout = ({ children }) => (
  <>
    <nav style={{ fontFamily: 'Arial' }}>
      <ul>
        <li style={{ margin: '1rem 0' }}>
          <Link href="/home">
            <a>Go to /home</a>
          </Link>
        </li>
        <li style={{ margin: '1rem 0' }}>
          <Link href="/dev/sets">
            <a>Go to /sets</a>
          </Link>
        </li>
      </ul>
    </nav>
    <main>{children}</main>
  </>
);

export default MyApp;
