import React from 'react'
import Navbar from '../components/Navbar'
import UploadSection from '../components/UploadSection'
import IntroSection from '../components/IntroSection'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Navbar />
      <IntroSection />
      <UploadSection />
      <Footer />
    </>
  )
}

export default Home