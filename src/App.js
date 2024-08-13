import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { ProdutoProvider } from './context/createContext';
import Login from './views/Login/Login'
import MR from './views/MR/MR'
import RT from './views/RT/RT'
import GL from './views/GL/GL'
import NotFound from './components/PageNotFound/NotFound'
import { SolicitProvider } from './context/mrSolictContext';

function App() {
  const valid = localStorage.getItem('token')

  React.useEffect(() => {

  }, [valid])

  return (
  <AuthProvider>
    <ProdutoProvider>
      <SolicitProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/merendeira/:_id' element={<MR />}/>
            <Route path='/rt/:_id' element={<RT />}/>
            <Route path='/gl/:_id' element={<GL />}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </SolicitProvider>
    </ProdutoProvider>
    </AuthProvider>
  );
}

export default App;
