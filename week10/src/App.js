import './App.css';
//import Modal from './components/Modal';
//import ReminderList from './components/ReminderList';
import { BrowserRouter, Route, NavLink, Routes,Navigate , Link} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/config';

import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Article from './pages/Article'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Search  from './pages/Search';

function App() {

  const [isLogged, setLogged] = useState();

  useEffect(()=>{
  
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setLogged(true)
          // ...
          console.log("uid", uid)
        } else {
          // User is signed out
          // ...
          setLogged(false)
          console.log("user is logged out")
        }
      });
  }, [])

  return (
    <div>
      <header>
        <h1>Jabs</h1>
        <p>Just Another Blog Site</p>
      </header>
      <BrowserRouter>
      <nav className='navbar'>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/search">Search</NavLink></li>
            <li>{isLogged ? <NavLink to="/profile">Profile</NavLink> :<NavLink to="/login">Login</NavLink> }</li>
          </ul>
        </nav>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About /> }/>
          <Route path="/contact" element={<Contact /> }/>
          <Route path="/articles/:urlId" element={<Article/> }/>
          <Route path="/login" element={<Login /> }/>
          <Route path="/signup" element={<Signup /> }/>
          <Route path="/profile" element={<Profile /> }/>
          <Route path="/search" element={<Search /> }/>
          <Route path="/*" element={<Navigate to="/"/> }/>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
