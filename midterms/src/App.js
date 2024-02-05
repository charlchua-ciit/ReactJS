
import './App.css';
import React, {useState} from 'react';

function Header() {
  return (
    <div id="head">
    <h1>Charl Daniel Chua Profile</h1>
    </div>
  )
}

function Home(){
  return (
    <div id="main">
        <p>This is the Home Page of this website. Insert a bunch of words and filler text here. Lorem ipsum and all that jazz.</p>
    </div>
  )
}

function Contact(){
  return (
    <div id="main">
        <p>This is the Contact Page of this website. Insert a bunch of words and filler text here. Lorem ipsum and all that jazz.</p>
    </div>
  )
}

function About(){
  return (
    <div id="main">
        <p>This is the About Me Page of this website. Insert a bunch of words and filler text here. Lorem ipsum and all that jazz.</p>
    </div>
  )
}

function Modal({ children, handleClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        {children}
        <button onClick={handleClose}>Ok</button>
      </div>
    </div>
  )
}



function Footer(){
  return (
    <div id="foot">JS Midterms</div>
  )
}

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showHome, setShowHome] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  
  const home = () =>{
    setShowHome(true)
    setShowContact(false)
    setShowAbout(false)
    setShowLogin(false)
  }
  const contact = () =>{
    setShowHome(false)
    setShowContact(true)
    setShowAbout(false)
    setShowLogin(false)
  }
  const about = () =>{
    setShowHome(false)
    setShowContact(false)
    setShowAbout(true)
    setShowLogin(false)
  }
  const login = () =>{
    setShowHome(false)
    setShowContact(false)
    setShowAbout(false)
    setShowLogin(true)
  }
  function Login(){
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const userInfo = [
      {
          username: "john",
          password: "123456"
      },
      {
          username: "mary",
          password: "456"
      }
    ];
    
    const handleClose = () =>{
      setShowModal(false);
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      for (var i=0, iLen=userInfo.length; i<iLen; i++) {
        let userPass = userInfo[i]
        if (userPass.username === user){
          if (userPass.password === pass){
            home()
          }
          else{
            setShowModal(true)
        }
      } 
      else {
        setShowModal(true)
      }
    }
    }
    return (
      <div id="main">
        <form onSubmit={handleSubmit}>
          <label>Username:
          <input 
            type="text" 
            onChange={(e) => setUser(e.target.value)}
          /><br/><br/>
          </label>Password
          <label>:
          <input 
            type="password" 
            onChange={(e) => setPass(e.target.value)}
          />
          </label><br/><br/>
          <input type="submit" />
        </form>
        {showModal && 
          <Modal handleClose={handleClose}>
        <h2>Wrong Username or Password</h2>
        <p>
          Username or Password is wrong, please try again
        </p>
      </Modal>}
      </div>
    )
}
  return (
  <html>
    <body id="body">
      <Header />
      <ul>
        <li><a onClick={()=>home()}>Home</a></li>
        <li><a onClick={()=>contact()}>Contact</a></li>
        <li><a onClick={()=>about()}>About</a></li>
        <li id="login"><a onClick={()=>login()}>Login</a></li>
      </ul>
      {showHome && <Home />}
      {showContact && <Contact />}
      {showAbout && <About />}
      {showLogin && <Login />}
      <Footer />
    </body>
  </html>
  );
}
export default App;
