import react from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import {HomePage,RegisterUser,SignIn} from './pages/Pages';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path = '/Register' element = {<RegisterUser/>}/>
          <Route path =  '/SignIn' element = {<SignIn/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
