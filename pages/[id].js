import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { supabase } from './utils/supabase';
import Video from 'react-player'

const Pages = ({ lession }) => {
  const [videoUrl, setVideoUrl] = useState();

  const getPremiumContent = async () => {
    const { data } = await supabase.from("premium_content").select("video_url").eq("id", lession.id).single();
    setVideoUrl(data?.video_url);

  }

  // mounting
  useEffect(() => { 
    getPremiumContent()
  },[])


  console.log(lession)
  return (
      <div className="mx-auto bg-blue-400 rounded-md w-full max-w-3xl px-8 py-16">
      <Link href="/" >
        <p className='bg-red-400 w-32 rounded-lg cursor-pointer flex justify-center items-center mb-8' title='Goto Home page'>
        Home page

        </p>
          </Link>
      <h1 className="mb-6 font-semibold text-3xl">{lession.title}</h1>
      <p>{lession.description}</p>
      <iframe id="player" type="text/html" width="640" height="390"
  src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
  frameborder="0"></iframe>
      {!!videoUrl && <Video url={ videoUrl} width="100%" />}
    </div>
  )
}

export default Pages

export const getStaticPaths = async () => {
  const { data: lessions } = await supabase.from('lession').select('id')

  const paths = lessions.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params: { id } }) => {
  const { data: lession } = await supabase
    .from('lession')
    .select('*')
    .eq('id', id)
    .single()

  return {
    props: {
      lession,
    },
  }
}
