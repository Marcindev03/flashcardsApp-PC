import Head from 'next/head';

const Meta = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: 'Flashcards App by Marcin Sacha',
};

export default Meta;
