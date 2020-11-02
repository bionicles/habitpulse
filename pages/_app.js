// import { useMemo } from "react";
import Head from "next/head";
//For me it didn't work without the following import...
import favico from "../static/favicon.ico";
import { StateProvider } from "state";
import { Layout } from "components";
import "../styles/index.css";

// import userbase from "userbase-js";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicon.ico"
        />
      </Head>
      <StateProvider>
        <Layout>
          <Component {...pageProps} />
          <div id="svg-container">
            <audio src="snap.m4a" crossOrigin="anonymous" />
          </div>
        </Layout>
      </StateProvider>
    </>
  );
};

export default App;
