import React, { useEffect } from 'react'
import Navbar from './components/navbar/navbar'
import Home from './components/Home/home'
import Footer from './components/Footer/footer'
import About from './components/About/about'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './components/SignUp/Signup'
import Signin from './components/SignUp/Signin'
import Todo from './components/Todo/Todo'
import { authActions } from './store'
import { useDispatch } from 'react-redux'

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    const id = sessionStorage.getItem('id')
    if(id){
    dispatch(authActions.login())
    }
  }, [])

  return (
    <div>
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/todo' element={<Todo/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
         
        </Routes>
      </Router>
       <Footer/>
    </div>
  )
}

export default App

