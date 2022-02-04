import '../styles/globals.css';
import UserProvider from '../context/user'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className='bg-gray-300'>

        <Component {...pageProps} />
      </div>
    </UserProvider>

  )

}

export default MyApp
