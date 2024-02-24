import React, {useState,useEffect} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom'
import { auth,db } from '../firebase/config'
import {getDocs, collection, deleteDoc, doc, onSnapshot} from 'firebase/firestore';
 
const Login = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null)
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');

    useEffect(() => {
        const ref = collection(db, 'userInfo');
        onSnapshot(ref, (snapshot)=>{
            console.log(snapshot);
            let results = []
             snapshot.docs.forEach(doc => {
               results.push({id: doc.id, ...doc.data()});
             });
            setUserInfo(results);

          });
    
      },[])
       
    const onLogin = (e) => {
        e.preventDefault();
        let userfound = false
        let passfound = false
        for (let x in userInfo){
            let dbuser = userInfo[x].username
            let dbpass = userInfo[x].password
            if (dbuser === username){
                userfound = true
                if (dbpass === password){
                    passfound = true
                    alert("Login Success")
                    navigate("/")
                }
            }
        }
        if (userfound == true){
            if (passfound == false){
                alert("Incorrect Password, try again")
            }
        } else {
            alert("Username not found, try again")
        }
        // signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     // Signed in
        //     const user = userCredential.user;
        //     navigate("/home")
        //     console.log(user);
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log(errorCode, errorMessage)
        // });
}
    return(
        <main >        
            <section>
                <div className="create">                                         
                    <h1>Article Login</h1>                                               
                    <form>                                                                                            
                        <div>
                            <label>
                            <span>Username:</span>
                            <input
                                type="text"
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}  
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