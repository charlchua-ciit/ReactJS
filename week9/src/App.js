import './App.css';
//import Modal from './components/Modal';
//import ReminderList from './components/ReminderList';
import { BrowserRouter, Route, NavLink, Routes,Navigate , Link} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebase/config';
import { useNavigate } from 'react-router-dom';

import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Article from './pages/Article'
import FormArticle from './pages/FormArticle'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  // const [isLogged, setLogged] = useState();
  // const [loggedOut, setOut] = useState();

  // useEffect(()=>{
  //   onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         // User is signed in, see docs for a list of available properties
  //         // https://firebase.google.com/docs/reference/js/firebase.User
  //         const uid = user.uid;
  //         setLogged(true)
  //         setOut(false)
  //         // ...
  //         console.log("uid", uid)
  //       } else {
  //         // User is signed out
  //         // ...
  //         setLogged(false)
  //         setOut(true)
  //         console.log("user is logged out")
  //       }
  //     });
  // }, [])

  // const handleLogout = () => {               
  //   signOut(auth).then(() => {
  //   // Sign-out successful.
  //   console.log("Signed out successfully")
  //   }).catch((error) => {
  //   // An error happened.
  //   });
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>My Articles</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/new">New Article</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
          {/* {loggedOut && <NavLink to="/login">Login</NavLink>} */}
          {/* {isLogged && <button onClick={handleLogout}>Log Out</button>} */}
        </nav>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About /> }/>
          <Route path="/contact" element={<Contact /> }/>
          <Route path="/articles/:urlId" element={<Article/> }/>
          <Route path="/new" element={<FormArticle /> }/>
          <Route path="/login" element={<Login /> }/>
          <Route path="/signup" element={<Signup /> }/>
          <Route path="/*" element={<Navigate to="/"/> }/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
