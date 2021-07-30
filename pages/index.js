import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import TimeAgo from 'react-timeago'
import UserColumn from "../components/UserColumn.js";
import React, { useState } from 'react';
import Footer from '../components/Footer.js'
import ToggleDarkModeButton from '../components/ToggleDarkModeButton.js'
export default function Home(data) {
  const { countriesList } = data
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
        <title>DZGitrs - The most active GitHub users in </title>
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
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        { countriesList.length ? <ul className='text-left grid grid-cols-4 gap-4'>
             
            {
              countriesList.map(country=> (
                <li key={country.country} className={`${country.slug == 'israel' ? 'line-through text-red-800 bg-red-200 border-red-500' : ''} border-green-500 duration-200 ease-in-out	hover:border-l-4 hover:pl-2`}>
                  <Link href={country.slug !== 'israel' ? country.slug : '#' }><a title={country.slug !== 'israel' ? country.country : 'A country that encourages terrorism' }>{country.country}</a></Link>
                </li>
              ))
            }
          </ul> :'لا توجد احصائيات'  }
        </div>
      </main>
      <Footer/>
    </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://dzgitrs.herokuapp.com/get_countries`)
  const countriesList = await res.json()
  if (!countriesList) {
    return {
      notFound: true,
    }
  }

  return {
    props: { countriesList }, // will be passed to the page component as props
  }
}
