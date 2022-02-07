import '../styles/globals.css';
import UserProvider from '../context/user'
import Layout from '../component/Layout'
import Nav from '../component/Nav';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Nav />
      <Component {...pageProps} />
    </UserProvider>

  )

}

export default MyApp
