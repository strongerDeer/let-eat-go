import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '@/styles/globals.css';

import Layout from '@/components/layouts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
          <ReactQueryDevtools />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
