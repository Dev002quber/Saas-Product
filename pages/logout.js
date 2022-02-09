import React, { useEffect } from 'react'
import { supabase } from './utils/supabase'
import { useRouter } from 'next/router'

import {useUser} from '../context/user';


const logout = () => {
  const {logout} = useUser()
  useEffect(logout, [])
  return (
    <div className='bg-gray-500 min-h-screen '>
      
      <h2>Logout page </h2>
    </div>
  )
}

export default logout;