import { Link,useNavigate } from 'react-router-dom'
import {collection, deleteDoc, doc, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import {db,auth} from '../firebase/config'
import Modal from "../components/Modal"
import { useEffect,useState } from 'react';
import DeleteIcon from '../assets/delete.svg';
import { signOut } from "firebase/auth";
// styles
import './Home.css'

export default function Profile() {

  const [articles, setArticles] = useState(null);
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  
  useEffect(() => {
    const ref = collection(db, 'articles');
    setShowModal(true)
    auth.onAuthStateChanged(()=>{
        setShowModal(false);
        setName(auth.currentUser.displayName)
        const q = query(ref, orderBy('time','desc'),where('author','==',auth.currentUser.displayName))
        onSnapshot(q, (snapshot)=>{
            console.log(snapshot);
            let results = []
            snapshot.docs.forEach(doc => {
            results.push({id: doc.id, ...doc.data()});
            });
            setArticles(results);
        });    
    })
       
  },[])

  const handleDelete = async (id) => {
    const ref = doc(db, 'articles', id)
    setShowModal(true)
    deleteDoc(ref).then(unload=>{
      setShowModal(false);
    });
  }

  const handleClose = () =>{
    setShowModal(false);
  }

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
    navigate('/')
    console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
  }

  return (
    <div className="home">
        <h2>
            {name}'s posts 
            <button className='logout' onClick={handleLogout}>Log Out</button>
        </h2>
        <br />

        {articles && articles.map(article => (
        
        <div key={article.id} className="post">
            <Link to={`/articles/${article.id}`}>
            <p>{article.author}</p>
            <p>{article.post}</p>
            </Link>
            <img 
            className="icon"
            onClick={() => handleDelete(article.id)}
            src={DeleteIcon} alt="delete icon" 
            />
            <br></br>
        </div>
        ))}
        {showModal && 
        <Modal handleClose={handleClose}>
            <img src = "https://i.gifer.com/ZKZg.gif"></img>
        </Modal>}
    </div>

  )
}
