import Link from 'next/link';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

//MyApp.getInitialProps = async (appContext) => {
//	// calls page's `getInitialProps` and fills `appProps.pageProps`
//	const appProps = await App.getInitialProps(appContext);
//	return { ...appProps }
// }

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
        <li style={{ margin: '1rem 0' }}>
          <Link href="/dev/state">
            <a>Go to /state</a>
          </Link>
        </li>
      </ul>
    </nav>
    <main>{children}</main>
  </>
);

export default MyApp;
