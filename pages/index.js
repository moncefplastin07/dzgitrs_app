import Head from 'next/head'
import TimeAgo from 'react-timeago'
import UserColumn from "../components/UserColumn.js";
export default function Home(data) {
  const { users, header } = data.data
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <span className="text-green-600">
            DZGitrs!
          </span>
        </h1>
        <p className="my-5 text-1xl">
          Last Update:{' '}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            <TimeAgo date={header.lastUpdate} />
          </code>
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <table>
            <thead>
              <tr className="border-dotted border-b-2 border-light-blue-100">
                <th>Score</th>
                <th>User</th>  
                <th>Contribs</th>
                <th className='w-28'>Avatar</th>
              </tr>
            </thead>
            <tbody> 
            {
              users.map(userInfo=> (<UserColumn key={userInfo.score} score={userInfo.score} githubName={userInfo.name} githubUsername={userInfo.username} githubURL={userInfo.URL} contribs={userInfo.contribs} avatarURL={userInfo.avatar} className='shadow'></UserColumn>))
            }
            </tbody>
          </table>
        </div>
      </main>

      <footer className="flex items-center flex-col justify-center w-full h-24 border-t mt-10">
      <p className="my-5 text-1xl">
          <span className="p-3 font-mono text-lg bg-gray-100 rounded-md font-bold">
            Note:
          </span>
          <span className="p-3 font-mono">
            this list genrated by <a href='commits.top/algeria.html'><b className='text-green-500'>commits.top</b></a>
          </span>
        </p>
        <p><a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a></p>
      </footer>
    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://dzgitrs.herokuapp.com/`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}
