import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DeleteUser from './user/DeleteUser';
import EditProfile from './user/EditProfile';
import Home from './core/Home';
import Profile from './user/Profile';
import Signin from './auth/Signin';
import Signup from './user/Signup';
import Users from './user/Users';
import NotFound from './core/NotFound';
import NavBar from './core/NavBar';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/signup' element={<Signup />} exact />
        <Route path='/signin' element={<Signin />} exact />
        <Route path='/users/all' element={<Users />} exact />
        <Route path='/users/:id/profile' element={<Profile />} exact />
        <Route path='/users/:id/delete' element={<DeleteUser />} exact />
        <Route path='/users/:id/edit' element={<EditProfile />} exact />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
