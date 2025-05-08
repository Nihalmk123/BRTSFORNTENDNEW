import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
    <div className=''>
      <HelmetProvider>    
        <Header/>
        {children}
        <Footer/>
      </HelmetProvider>
    </div>
  )
}

export default Layout