import React from "react";
import Header from "../components/Header/Header";
import classes from "../styles/app.module.scss";

import "../styles/global.scss";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: any;
}): JSX.Element {
  return (
    <div className={classes.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
