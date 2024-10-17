import react from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import {HomePage,RegisterUser,SignIn,Settings,PostPage} from './pages/Pages';
import {MainLayout} from './components/index';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<MainLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path='/settings' element={<Settings/>}/>
            <Route path='/post/:postId' element={<PostPage/>}/>
          </Route>
          <Route path = '/Register' element = {<RegisterUser/>}/>
          <Route path =  '/SignIn' element = {<SignIn/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
