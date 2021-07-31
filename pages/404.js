import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react';
import Footer from "../components/Footer.js"
import ToggleDarkModeButton from "../components/ToggleDarkModeButton.js"
export default function Error404() {  
  const [isDarkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    
      setDarkMode(!isDarkMode)
      window.localStorage.setItem('isDarkMode', !isDarkMode)
    
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
    <div className='dark:bg-black dark:text-white font-mono flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>DZGitrs - 404 ERROR- Page not found</title>
        <meta name="viewport" content="width=device-width"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToggleDarkModeButton onClick={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="flex flex-col items-center justify-center flex-1 text-center">
        
      </main>

      <Footer/>
    </div>
    </div>
  )
}
