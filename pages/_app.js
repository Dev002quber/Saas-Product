import '../styles/globals.css';
import UserProvider from '../context/user'
import Layout from '../component/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <div className=''>

          <Component {...pageProps} />
        </div>
      </Layout>

    </UserProvider>

  )

}

export default MyApp
