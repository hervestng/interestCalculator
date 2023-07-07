import { Box } from '@chakra-ui/react'
import React from 'react'
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Home from './Pages/Home'
const App = () => {
  return (
    <>
     <Router>
      <Routes>
          <Route exact={true} path='/' element={<Home/>}></Route> 
      </Routes>
    </Router>
    
    </>
  )
}

export default App
