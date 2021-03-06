import Head from "next/head";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer.js";
import RegionsList from "../components/RegionsList.js";
import Alert from "../components/Alert.js";
import Layout from "../components/Layout.js";
export default function Home({ regionsList }) {
  const [displayTheme, setDisplayTheme] = useState("light");
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    if (window.localStorage.displayTheme) {
      setDisplayTheme(window.localStorage.displayTheme);
    }
  });
  const toggleDisplayTheme = () => {
    const newDisplayTheme = displayTheme == "light" ? "dark" : "light";
    window.localStorage.setItem("displayTheme", newDisplayTheme);
    return newDisplayTheme;
  };
  const pushAlert = (alert) => {
    setAlert(alert);
    // setTimeout(()=> pushAlert(false), 10000)
  };
  return (
    <Layout>
      <div
        className="dark:bg-black dark:text-white flex flex-col items-center justify-center min-h-screen py-2"
      >
        <Head>
          <title>DZGitrs - The most active GitHub By geographic region</title>
          <meta name="viewport" content="width=device-width"></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {alert ? <Alert {...alert} /> : ""}
        <main
          className="flex flex-col items-center justify-center flex-1 text-center"
        >
          <h1 className="text-4xl font-bold lg:text-6xl">
            Welcome to{" "}
            <span className="text-green-600">
              DZGitrs!
            </span>
          </h1>
          <RegionsList allRegionsList={regionsList} pushAlert={pushAlert} />
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`https://dzgitrs.herokuapp.com/get_countries`);
  const regionsList = await res.json();
  if (!regionsList) {
    return {
      notFound: true,
    };
  }

  return {
    props: { regionsList }, // will be passed to the page component as props
  };
}
