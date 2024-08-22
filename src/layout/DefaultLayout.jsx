import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default DefaultLayout