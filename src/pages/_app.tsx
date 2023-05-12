import Head from 'next/head';
import '../app/globals.css'

function MyApp({ Component, pageProps: { ...pageProps }  }) {
  return (
    <div className='h-screen w-full'>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;