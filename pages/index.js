import Head from 'next/head'
import TimeAgo from 'react-timeago'
import UserColumn from "../components/UserColumn.js";
export default function Home(data) {
  const { users, header } = data.data
  return (
    <div className="font-mono flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>DZGitrs - The most active GitHub users in Algeria</title>
        <meta name="viewport" content="width=device-width"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 text-center">
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

      <footer className="font-mono flex items-center flex-col justify-center w-full h-24 border-t mt-10">
      <p className="my-5 text-1xl">
          <span className="text-lg bg-gray-100 rounded-md font-bold">
            Note:
          </span>
          <span>
            this list generated by <a href='https://commits.top/algeria.html'><b className='text-green-500'>commits.top</b></a>
          </span>
      </p>
      <p>
        <span className='pb-5 font-mono'><a href='https://dzgitrs.herokuapp.com/'>َAPI</a></span>
        <span>{' '}.{' '}</span>
        <span className='pb-5 font-mono'><a href='https://github.com/moncefplastin07/dzgitrs_app.vercel'>Github</a></span>
        <span>{' '}.{' '}</span>
        <span className='pb-5 font-mono'><a href='https://twitter.com/moncefplastin07/'>Twitter</a></span>
        <span>{' '}.{' '}</span>
        <span className='pb-5 font-mono'><a href='https://facebook.com/moncefplastin07/'>Facebook</a></span>
      </p>
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
