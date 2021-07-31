import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import TimeAgo from 'react-timeago'
import UserColumn from "../components/UserColumn.js";
import React, { useState } from 'react';
import Footer from '../components/Footer.js'
import ToggleDarkModeButton from '../components/ToggleDarkModeButton.js'
import RegionsList from '../components/RegionsList.js'
export default function Home({regionsList}) {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    if (isDarkMode){
      setDarkMode(false)
    }else{
      setDarkMode(true)
    }
  };
  
  return (
  <div className={`${isDarkMode ? 'dark' : ''}`}>
    <div className="dark:bg-black dark:text-white font-mono flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>DZGitrs - The most active GitHub By geographic region </title>
        <meta name="viewport" content="width=device-width"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <h1 className="text-4xl font-bold lg:text-6xl">
          Welcome to{' '}
          <span className="text-green-600">
            DZGitrs!
          </span>
        </h1>
        <ToggleDarkModeButton onClick={toggleDarkMode} isDarkMode={isDarkMode} />
        <RegionsList allRegionsList={regionsList} />
      </main>
      <Footer/>
    </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://dzgitrs.herokuapp.com/get_countries`)
  const regionsList = await res.json()
  if (!regionsList) {
    return {
      notFound: true,
    }
  }

  return {
    props: { regionsList }, // will be passed to the page component as props
  }
}
