import Head from "next/head";
import React, { useEffect } from "react";
import classes from "./index.module.scss";
import { getGPUTier } from "detect-gpu";
import { m, motion } from "framer-motion";
import { CheckBox } from "../components/Animations/Checkbox";
import { SunSpinner } from "../components/Animations/SunSpinner";

const svgVariants = {
  hidden: { rotate: -180 },
  visible: {
    rotate: 0,
    transition: { duration: 1 },
  },
};

const pathVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opativity: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

export default function Home() {
  // useEffect(() => {
  //   (async () => {
  //     const data = await getGPUTier();
  //     document.body.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  //   })();
  // }, []);

  return (
    <div className={classes.container}>
      <Head>
        <title>My NextJS Playground</title>
        <meta name="description" content="Generated for fun" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <CheckBox /> */}
      <SunSpinner />

      {/* <m.svg
          variants={svgVariants}
          initial="hidden"
          animate="visible"
          width="211.72mm"
          height="215.07mm"
          version="1.1"
          viewBox="0 0 211.72 215.07"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke-width=".26458">
            <m.path
              variants={pathVariants}
              d="m106.71 215.02c-0.65485-0.0569-2.7384-0.2305-4.6302-0.38585-14.352-1.1786-29.574-6.193-42.402-13.968-11.321-6.8618-21.878-16.59-29.509-27.194-8.0934-11.246-14.106-24.895-16.835-38.218-0.52446-2.5601-1.414-8.6766-1.7387-11.955l-0.17686-1.7859h106.67l0.0668-53.247 0.0668-53.247 1.8521 0.06883c1.0186 0.03786 3.56 0.31025 5.6475 0.60531 17.617 2.4902 34.148 9.6427 48.401 20.942 6.1689 4.8904 14.421 13.604 18.998 20.06 19.357 27.304 23.893 61.898 12.245 93.394-2.5717 6.9538-7.5426 16.309-12.054 22.686-6.1861 8.7439-15.217 17.775-23.961 23.961-7.6966 5.4452-16.772 10.072-25.729 13.115-6.4834 2.2033-15.296 4.0937-22.357 4.7958-2.9847 0.29679-12.595 0.54335-14.552 0.37337zm14.949-10.553c30.547-3.5732 56.945-22.147 70.705-49.749 9.7412-19.54 11.929-42.882 5.997-63.991-5.6795-20.211-18.299-37.925-35.621-50.002-7.209-5.0261-16.337-9.4765-24.677-12.031-2.8264-0.86579-9.1075-2.431-9.7553-2.431-0.0916 0-0.16658 23.693-0.16658 52.652v52.652h-105.31l0.12747 0.59531c5.0459 23.564 17.492 42.756 36.446 56.198 13.862 9.8304 29.414 15.317 47.045 16.597 2.7686 0.20103 11.788-0.0897 15.214-0.4905z"
            />
            <m.path
              variants={pathVariants}
              d="m0.17564 103.09c0.8419-18.528 5.8092-35.355 14.975-50.729 4.4116-7.3994 9.1232-13.479 15.487-19.985 8.8914-9.0898 18.381-15.982 29.373-21.335 13.787-6.7142 27.185-10.083 43.193-10.862l3.7703-0.18336v106.96h-106.97z"
            />
          </g>
        </m.svg> */}

      {/* <m.svg
          variants={svgVariants}
          initial="hidden"
          animate="visible"
          style={{ stroke: "red" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <m.path
            fill="none"
            d="M40 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 40 C0 40 0 0 40 0Z"
            variants={pathVariants}
          />

          <m.path
            fill="none"
            d="M50 30 L50 -10 C50 -10 90 -10 90 30 Z"
            variants={pathVariants}
          />
        </m.svg> */}
    </div>
  );
}
