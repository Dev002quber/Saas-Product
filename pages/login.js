import React, { useEffect } from 'react'
import { supabase } from './utils/supabase'
import Head from 'next/head'


import {useUser} from '../context/user';
const login = () => {
  const {login} = useUser()
    
    const BtnClick = () => {
        login()
    }
  return (
    <div className="flex flex-col items-center space-y-20 pt-48">
    <Head>
      <title>Login page</title>
    </Head>
    <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
      width={150}
      height={150}
      
    />

    <div>
      
        <div >
         
          <button
            className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
            onClick={BtnClick}
          >
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1f2427] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              Sign in with Github
            </span>
          </button>
        </div>
     
    </div>
  </div>
  )
}

export default login


