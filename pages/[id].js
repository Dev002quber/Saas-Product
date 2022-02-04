import Link from 'next/link';
import React from 'react'
import { supabase } from './utils/supabase';

const Pages = ({ lession }) => {
  console.log(lession)
  return (
      <div className="mx-auto w-full max-w-3xl px-8 py-16">
          <Link href="/">
          Home page
          </Link>
      <h1 className="mb-6 font-semibold text-3xl">{lession.title}</h1>
      <p>{lession.description}</p>
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
