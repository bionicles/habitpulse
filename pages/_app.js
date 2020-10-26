import { useEffect } from "react";
import userbase from "userbase-js";

import { StateProvider, useState } from "state";
import { Layout } from "components";
import "../styles/index.css";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    userbase.init({ appId: process.env.NEXT_PUBLIC_USERBASE_APP_ID });
  }, []);
  return (
    <StateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
};

export default App;
