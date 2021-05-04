import Head from "next/head";
import Link from "next/link";
import React from "react";
import classes from "./index.module.scss";

export default function Home() {
  return (
    <div className={classes.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/orders">
        <a>
          <h1>My Account</h1>
        </a>
      </Link>
    </div>
  );
}
