import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import TimeAgo from 'react-timeago'
import UserColumn from "../components/UserColumn.js";
export default function Home(data) {
  const { query } = useRouter()
  const { users, header } = data.data
  return (
    <div className="font-mono flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>DZGitrs - The most active GitHub users in {header.country}</title>
        <meta name="viewport" content="width=device-width"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <h1 className="text-4xl font-bold lg:text-6xl border-solid border-b-4 border-green-500">
          Welcome to{' '}
          <span className="text-green-600">
            DZGitrs!
          </span>
        </h1>
        <h2 className='text-lg lg:text-xl'>This is a list of most active GitHub users in <b className='text-green-600'>{header.country}</b></h2>
        <p className="my-16 text-1xl">
          <b>Last Update:</b>{' '}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            <TimeAgo date={header.lastUpdate} />
          </code>
        </p>
        <ul className='grid grid-cols-3 gap-4'>
            <li className={`hover:font-blod ${query.slug == header.country.toLowerCase()? 'bg-green-300 font-blod' : ''}`}><Link href={`${header.country.toLowerCase()}`}>Commits</Link></li>
            <li className={`hover:font-blod ${query.slug == `${header.country.toLowerCase()}_public`? 'bg-green-300 font-blod' : ''} px-5 border-solid border-r-2 border-l-2 border-green-500`}><Link href={`${header.country.toLowerCase()}_public`}>Contributions</Link></li>
            <li className={`hover:font-blod ${query.slug == `${header.country.toLowerCase()}_private`? 'bg-green-300 font-blod' : ''}`}><Link href={`${header.country.toLowerCase()}_private`}>All</Link></li>
          </ul>
        <div className="flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
          
          <table>
            <thead>
              <tr>
                <th>Score</th>
                <th>User</th>  
                <th>Contribs</th>
                <th className='w-28 sm:w-24'>Avatar</th>
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

      <footer className="font-mono flex items-center flex-col justify-center w-full h-24 border-t text-center">
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

export async function getServerSideProps(context) {
  const res = await fetch(`https://dzgitrs.herokuapp.com/${context.params.slug}`)
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
// const slugsList = ["afghanistan","albania","algeria","angola","argentina","australia","austria","azerbaijan","bangladesh","belarus","belgium","benin","bolivia","brazil","bulgaria","burkina_faso","burundi","cambodia","cameroon","canada","chad","chile","china","colombia","congo","croatia","cuba","czech_republic","denmark","dominican_republic","ecuador","egypt","el_salvador","estonia","ethiopia","finland","france","germany","ghana","greece","guatemala","guinea","haiti","honduras","hong_kong","hungary","india","indonesia","iran","ireland","israel","italy","ivory_coast","japan","jordan","kazakhstan","kenya","kyrgyzstan","laos","latvia","lebanon","libya","lithuania","luxembourg","malawi","malaysia","mali","malta","mexico","morocco","mozambique","myanmar","nepal","netherlands","new_zealand","nicaragua","niger","nigeria","norway","pakistan","paraguay","peru","philippines","poland","portugal","romania","russia","rwanda","saudi_arabia","senegal","serbia","sierra_leone","singapore","slovakia","somalia","south_africa","south_korea","south_sudan","spain","sri_lanka","sudan","sweden","switzerland","syria","taiwan","tajikistan","tanzania","thailand","togo","tunisia","turkey","turkmenistan","uae","uganda","uk","ukraine","united_states","uzbekistan","venezuela","vietnam","worldwide","yemen","zambia","zimbabwe","afghanistan_public","afghanistan_private","albania_public","albania_private","algeria_public","algeria_private","angola_public","angola_private","argentina_public","argentina_private","australia_public","australia_private","austria_public","austria_private","azerbaijan_public","azerbaijan_private","bangladesh_public","bangladesh_private","belarus_public","belarus_private","belgium_public","belgium_private","benin_public","benin_private","bolivia_public","bolivia_private","brazil_public","brazil_private","bulgaria_public","bulgaria_private","burkina_faso_public","burkina_faso_private","burundi_public","burundi_private","cambodia_public","cambodia_private","cameroon_public","cameroon_private","canada_public","canada_private","chad_public","chad_private","chile_public","chile_private","china_public","china_private","colombia_public","colombia_private","congo_public","congo_private","croatia_public","croatia_private","cuba_public","cuba_private","czech_republic_public","czech_republic_private","denmark_public","denmark_private","dominican_republic_public","dominican_republic_private","ecuador_public","ecuador_private","egypt_public","egypt_private","el_salvador_public","el_salvador_private","estonia_public","estonia_private","ethiopia_public","ethiopia_private","finland_public","finland_private","france_public","france_private","germany_public","germany_private","ghana_public","ghana_private","greece_public","greece_private","guatemala_public","guatemala_private","guinea_public","guinea_private","haiti_public","haiti_private","honduras_public","honduras_private","hong_kong_public","hong_kong_private","hungary_public","hungary_private","india_public","india_private","indonesia_public","indonesia_private","iran_public","iran_private","ireland_public","ireland_private","israel_public","israel_private","italy_public","italy_private","ivory_coast_public","ivory_coast_private","japan_public","japan_private","jordan_public","jordan_private","kazakhstan_public","kazakhstan_private","kenya_public","kenya_private","kyrgyzstan_public","kyrgyzstan_private","laos_public","laos_private","latvia_public","latvia_private","lebanon_public","lebanon_private","libya_public","libya_private","lithuania_public","lithuania_private","luxembourg_public","luxembourg_private","malawi_public","malawi_private","malaysia_public","malaysia_private","mali_public","mali_private","malta_public","malta_private","mexico_public","mexico_private","morocco_public","morocco_private","mozambique_public","mozambique_private","myanmar_public","myanmar_private","nepal_public","nepal_private","netherlands_public","netherlands_private","new_zealand_public","new_zealand_private","nicaragua_public","nicaragua_private","niger_public","niger_private","nigeria_public","nigeria_private","norway_public","norway_private","pakistan_public","pakistan_private","paraguay_public","paraguay_private","peru_public","peru_private","philippines_public","philippines_private","poland_public","poland_private","portugal_public","portugal_private","romania_public","romania_private","russia_public","russia_private","rwanda_public","rwanda_private","saudi_arabia_public","saudi_arabia_private","senegal_public","senegal_private","serbia_public","serbia_private","sierra_leone_public","sierra_leone_private","singapore_public","singapore_private","slovakia_public","slovakia_private","somalia_public","somalia_private","south_africa_public","south_africa_private","south_korea_public","south_korea_private","south_sudan_public","south_sudan_private","spain_public","spain_private","sri_lanka_public","sri_lanka_private","sudan_public","sudan_private","sweden_public","sweden_private","switzerland_public","switzerland_private","syria_public","syria_private","taiwan_public","taiwan_private","tajikistan_public","tajikistan_private","tanzania_public","tanzania_private","thailand_public","thailand_private","togo_public","togo_private","tunisia_public","tunisia_private","turkey_public","turkey_private","turkmenistan_public","turkmenistan_private","uae_public","uae_private","uganda_public","uganda_private","uk_public","uk_private","ukraine_public","ukraine_private","united_states_public","united_states_private","uzbekistan_public","uzbekistan_private","venezuela_public","venezuela_private","vietnam_public","vietnam_private","worldwide_public","worldwide_private","yemen_public","yemen_private","zambia_public","zambia_private","zimbabwe_public","zimbabwe_private"];

// const paths = slugsList.map((e)=>{ return {params:{slug:e}}})
// export async function getStaticPaths() {
//   return {
//     paths,
//     fallback: false,
//   }
// }