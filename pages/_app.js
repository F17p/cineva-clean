// pages/_app.js
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main style={{minHeight:"70vh"}}><Component {...pageProps} /></main>
      <Footer />
    </>
  )
}
