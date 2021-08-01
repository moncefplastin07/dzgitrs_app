import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer.js'
import ToggleDisplayThemeButton from '../components/ToggleDisplayThemeButton.js'
import RegionsList from '../components/RegionsList.js'
export default function Home({regionsList}) {
  const [displayTheme, setDisplayTheme] = useState('light');
  useEffect(()=>{
    if(window.localStorage.displayTheme){
      setDisplayTheme(window.localStorage.displayTheme)
    }
  })
  const toggleDisplayTheme = () => {
    console.log(displayTheme)
    const newDisplayTheme = displayTheme == 'light' ? 'dark' : 'light'
      window.localStorage.setItem('displayTheme', newDisplayTheme)
      return newDisplayTheme
  };
  
  return (
  <div className={`${displayTheme == 'dark' ? 'dark' : ''}`}>
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
        <ToggleDisplayThemeButton onClick={setDisplayTheme(toggleDisplayTheme())} displayTheme={displayTheme} />
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
