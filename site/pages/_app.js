import * as React from "react";
import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../theme/themeUtils/createEmotionCache";
import Layout from "../components/Layout/Index";
import { DataProvider } from "../store/GlobalState";
import Head from 'next/head'
import "../styles/index.css"
import { SizeProvider } from '@bucky24/mobile-detect';


const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <DataProvider>
        <SizeProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
        </SizeProvider>
      </DataProvider>
    </CacheProvider>

  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
