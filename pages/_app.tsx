import { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider } from 'react-redux';
import store from 'store/store';
import 'styles/globals.css';

const NixApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default NixApp;
