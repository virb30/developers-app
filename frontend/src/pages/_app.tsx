import Modal from 'react-modal';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { DevelopersProvider } from '../hooks/useDevelopers';

Modal.setAppElement('#__next')

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DevelopersProvider>
      <Component {...pageProps} />
    </DevelopersProvider>
  )
}
export default MyApp
