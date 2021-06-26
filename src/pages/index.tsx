import Head from "next/head";
import { useEffect } from "react";
import classes from "./index.module.scss";
import { getGPUTier } from "detect-gpu";

export default function Home() {
  useEffect(() => {
    (async () => {
      const data = await getGPUTier();
      document.body.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    })();
  }, []);

  return (
    <div className={classes.container}>
      <Head>
        <title>My NextJS Playground</title>
        <meta name="description" content="Generated for fun" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello world!</h1>
    </div>
  );
}
