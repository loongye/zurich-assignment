import Head from "next/head";
import { signOut, useSession } from "next-auth/react";

interface IHeaderProps {
  title: string;
  description: string;
}

export const Header: React.FC<IHeaderProps> = ({ title, description }) => {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>{title}</h2>
      {status === 'authenticated' ? <p>You are signed in. <button onClick={() => signOut()}>Sign Out</button></p> : null}
    </>
  );
};
