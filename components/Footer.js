export default function Footer() {
  return (
    <footer className="font-mono flex items-center flex-col justify-center w-full h-24 border-t text-center">
      <p className="my-5 text-1xl">
          <span className="text-lg bg-gray-100 rounded-md font-bold dark:text-black p-2 mr-2">
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
  )
}

