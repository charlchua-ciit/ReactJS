import React, {useState} from 'react';
import {  signInWithEmailAndPassword, sendPasswordResetEmail    } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import Modal from "../components/Modal"
import CloseIcon from '../assets/close.svg';
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            alert("Credentials not found, please try again.")
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
}

    const reset = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password Email Sent!")
            window.location.reload();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
    }

    const handleClose = () =>{
        setShowModal(false)
    }
    const handleOpen = () =>{
        setShowModal(true)
    }

    return(
        <main >        
            <section>
                <div className="create">                                         
                    <h1>Login to your Jabs Account</h1>                                               
                    <form>                                                                                            
                        <div>
                            <label>
                            <span>Email:</span>
                            <input
                                type="text"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required
                            />
                            </label>
                        </div>

                        <div>
                            <label>
                            <span>Password:</span>
                            <input
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                            </label>
                        </div>
                        <br />
                        <div>
                            <button                                    
                                onClick={onLogin}                                        
                            >      
                                Login                                                                  
                            </button>
                        </div>                               
                    </form>
                    <p>
                        Forgot password? <a onClick={handleOpen}>Send Password Reset Email</a>
                    </p>
                    <p>
                        No account yet? {' '}
                        <NavLink to="/signup">
                            Sign up
                        </NavLink>
                    </p>
                                                
                </div>
                {showModal && 
                <Modal handleClose={handleClose}>
                    <div className="writepost">
                        <h2>Enter email to reset password
                        </h2>
                        <img 
                        className="close"
                        onClick={handleClose}
                        src={CloseIcon} alt="close icon" 
                        />
                        <form onSubmit={reset}>
                            <label>
                            <input
                                type='text' 
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                            </label>

                            <button>Send Reset Email</button>
                        </form>
                    </div>
                </Modal>}
            </section>
        </main>
        )
}
 
export default Login