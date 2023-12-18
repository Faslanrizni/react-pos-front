import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Routes, Link, Route, Router} from "react-router-dom";
import './App.css'

function App() {


  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/customer'}>Customer</Link>
            </li>
            <li>
              <Link to={'/product'}>Product</Link>
            </li>
          </ul>
        </nav>
        <hr/>

        <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/customer'} element={<Customer/>} />
          <Route path={'/product'} element={<Product/>} />
        </Routes>
        
      </div>
    </Router>

  )
}

export default App
