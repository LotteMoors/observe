import Head from 'next/head';
import '../app/globals.css';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div className='h-screen w-full font-mono'>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, viewport-fit=cover'
        />
      </Head>
      <Component key={router.asPath} {...pageProps} />
    </div>
  );
}

export default MyApp;
