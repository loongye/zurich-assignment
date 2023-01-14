import Head from "next/head";

interface IHeaderProps {
  title: string;
  description: string;
}

export const Header: React.FC<IHeaderProps> = ({ title, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>{title}</h2>
    </>
  );
};
