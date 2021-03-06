import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Error from "next/error";
import TimeAgo from "react-timeago";
import Layout from "../components/Layout.js";
import UserColumn from "../components/UserColumn.js";
import CountUp from "react-countup";
import React, { useEffect, useState } from "react";
export default function Home({ errorCode, data }) {
  const { query } = useRouter();
  if (query.slug?.startsWith("israel") || errorCode == 404) {
    return <Error statusCode={404} />;
  }


  const { users, header } = data?.data;
  return (
    <Layout
      title={`DZGitrs - The most active GitHub users in ${header.country}`}
    >
      <div
        className="dark:bg-black dark:text-white  flex flex-col items-center justify-center min-h-screen py-2"
      >
        <main
          className="flex flex-col items-center justify-center flex-1 text-center"
        >
          <h1
            className="text-4xl font-bold lg:text-6xl border-solid border-b-4 border-green-500"
          >
            Welcome to{" "}
            <span className="text-green-600">
              <Link href="/">DZGitrs!</Link>
            </span>
          </h1>
          <h2 className="text-lg lg:text-xl">
            This is a list of most active GitHub users in{" "}
            <b className="text-green-600">{header.country}</b>
          </h2>
          <p className="my-16 text-1xl">
            <b>Last Update:</b>{" "}
            <code
              className="p-3  text-lg bg-gray-100 rounded-md dark:text-black"
            >
              <TimeAgo
                date={new Date(header.lastUpdate.split("UTC")[0]) || new Date()}
              />
            </code>
          </p>
          <p className="mb-4">
            There are{" "}
            <span className="font-bold">
              <CountUp
                start={0}
                end={header.totalUsersNumber}
                duration={1}
              >
              </CountUp>
            </span>{" "}
            users on the GitHub who say they are from {header.country}
          </p>
          <ul className="grid grid-cols-3 gap-4">
            <li
              className={`hover:font-bold ${
                query.slug == header.country.toLowerCase()
                  ? "bg-green-500 font-bold"
                  : "hover:bg-green-400"
              }`}
            >
              <Link href={`/${header.country.toLowerCase()}`}>Commits</Link>
            </li>
            <li
              className={`hover:font-bold ${
                query.slug == `${header.country.toLowerCase()}_public`
                  ? "bg-green-500 font-bold"
                  : "hover:bg-green-400"
              } px-5 border-solid border-r-2 border-l-2 border-green-500`}
            >
              <Link href={`/${header.country.toLowerCase()}_public`}>
                Contributions
              </Link>
            </li>
            <li
              className={`hover:font-bold ${
                query.slug == `${header.country.toLowerCase()}_private`
                  ? "bg-green-500 font-bold"
                  : "hover:bg-green-400"
              }`}
            >
              <Link href={`/${header.country.toLowerCase()}_private`}>All</Link>
            </li>
          </ul>
          <div
            className="flex flex-wrap items-center justify-around max-w-4xl sm:w-full"
          >
            <table>
              <thead>
                <tr>
                  <th>Score</th>
                  <th>User</th>
                  <th>Contribs</th>
                  <th className="w-28 sm:w-24">Avatar</th>
                </tr>
              </thead>
              <tbody>
                {users.map(
                  (userInfo) => (
                    <UserColumn
                      key={userInfo.score}
                      score={userInfo.score}
                      githubName={userInfo.name}
                      githubUsername={userInfo.username}
                      githubURL={userInfo.URL}
                      contribs={userInfo.contribs}
                      avatarURL={userInfo.avatar}
                      className="shadow"
                    >
                    </UserColumn>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </Layout>
  );
}
export async function getStaticPaths() {
  const response = await fetch('https://dzgitrs.herokuapp.com/get_countries')
  const countriesList = await response.json()
  const paths = countriesList.map(({slug})=>({
    params: {slug}
  }))
  const publicPaths = countriesList.map(({slug})=>({
    params: {slug: `${slug}_public`}
  }))
  const privatePaths = countriesList.map(({slug})=>({
    params: {slug: `${slug}_private`}
  }))
  return {
    paths:[...paths,...publicPaths, ...privatePaths],
    fallback: false, // See the "fallback" section below
  };
}
export async function getStaticProps(context) {
  const res = await fetch(
    `https://dzgitrs.herokuapp.com/${context.params.slug}`,
  );
  const data = await res.json();
  console.log(data)
  const errorCode = res.ok ? false : res.status;
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { errorCode, data }, // will be passed to the page component as props
  };
}
