import '../styles/globals.css'
import MenuBar from '../components/menubar'

function MyApp({ Component, pageProps }) {
  return <>
    <MenuBar />
    <Component {...pageProps} />
  </>
}

export default MyApp
