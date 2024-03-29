import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth';
import { auth } from '../firebase/config'
 
const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
              console.log(err)
            );
            await updateProfile(auth.currentUser, { displayName: username }).catch(
              (err) => console.log(err)
            );
          } catch (err) {
            console.log(err);
          }
        navigate('/')
    }
 
  return (
    <main >        
        <section>
            <div>
                <div className="create">                  
                    <h1>Create your Jabs Account</h1>                                                                            
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
                            <span>Username:</span>
                            <input
                                type="text"
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}  
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
                        <button
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </button>
                                                                     
                    </form>
                   
                    <p>
                        Already have an account?{' '}
                        <NavLink to="/login" >
                            Sign in
                        </NavLink>
                    </p>                   
                </div>
            </div>
        </section>
    </main>
  )
}
 
export default Signup