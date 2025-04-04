import React from 'react'
import Conversion from './pages/Conversion'
import Explanation from './pages/Explanation'
import Generation from './pages/Generation'
import Navbar from './pages/Navbar'
import Footer from './pages/Footer'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/convert' element={<Conversion/>} />
        <Route path='/explain' element={<Explanation/>} />
        <Route path='/generate' element={<Generation/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;