import AppBarComponent from '@/components/Appbar';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className='font-raleway'>
        <AppBarComponent />
        <Component {...pageProps} />
      </div>
  </RecoilRoot>
  );
}
