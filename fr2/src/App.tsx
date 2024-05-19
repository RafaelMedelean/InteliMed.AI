import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './pages/_auth/AuthLayout';
import LoginPage from './pages/_auth/pages/LoginPage';
import SignupPage from './pages/_auth/pages/SignupPage';

const App = () => {
  return (
    <Routes>
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignupPage />} />
      </Route>
      {/* <Route element={} */}
    </Routes>
  )
}

export default App