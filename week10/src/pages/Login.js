import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
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
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
}
    return(
        <main >        
            <section>
                <div className="create">                                         
                    <h1>Article Login</h1>                                               
                    <form>                                                                                            
                        <div>
                            <label>
                            <span>Email:</span>
                            <input
                                type="text"
                                label="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Username"                                
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
                                placeholder="Password"              
                            />
                            </label>
                        </div>    
                                            
                        <div>
                            <button                                    
                                onClick={onLogin}                                        
                            >      
                                Login                                                                  
                            </button>
                        </div>                               
                    </form>
                    
                    <p>
                        No account yet? {' '}
                        <NavLink to="/signup">
                            Sign up
                        </NavLink>
                    </p>
                                                
                </div>
            </section>
        </main>
        )
}
 
export default Login