import Head from 'next/head'
import { supabase } from './utils/supabase'
import Link from 'next/link'
import { useUser } from '../context/user'

export default function Home({ lessions }) {
  const { user } = useUser()
  console.log('user:',user);
  // console.log(lessions)
  // console.log(supabase.auth.user())
 
  return (
    <div className="mx-auto p-8 w-full max-w-3xl bg-gray-100">
      {/* <nav> 
        <div className='flex flex-row font-bold text-xl gap-5 top-0 right-50'>
        <Link href={'/login'}>Login</Link>
        <Link href={'/logout'}>Logout</Link>
        </div>

      </nav> */}
      {lessions.map((lession) => (
        <Link href={`/${lession.id}`} key={lession.id}>
          <a className="mb-4 flex h-40 rounded p-8 text-xl shadow-xl">
            {lession.title}
          </a>                        
        </Link>
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const { data: lessions } = await supabase.from('lession').select('*')

  return {
    props: {
      lessions,
    },
    
  }
}
    