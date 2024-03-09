import { Link,useNavigate } from 'react-router-dom'
import {collection, deleteDoc, doc, onSnapshot, query, orderBy, where, getDocs, updateDoc, writeBatch } from 'firebase/firestore';
import {db,auth} from '../firebase/config'
import {  reload, updateProfile  } from 'firebase/auth';
import Modal from "../components/Modal"
import { useEffect,useState } from 'react';
import DeleteIcon from '../assets/delete.svg';
import CloseIcon from '../assets/close.svg';
import { signOut } from "firebase/auth";
// styles
import './Home.css'

export default function Profile() {

  const [articles, setArticles] = useState(null);
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const navigate = useNavigate()
  
  useEffect(() => {
    const ref = collection(db, 'articles');
    setShowModal(true)
    auth.onAuthStateChanged(()=>{
        setShowModal(false);
        setName(auth.currentUser.displayName)
        setUser(auth.currentUser.displayName)
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

  const handleEditClose = () =>{
    setEditModal(false);
  }

  const handleEditOpen = () =>{
    setEditModal(true);
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

  const editName = async (e) =>{
    e.preventDefault()
    alert(user)
    alert(name)
    db.collection('articles')
    .where('author', '==', name)
    .get()
    .then(async (snapshots) => {
      const updates = []
      snapshots.forEach((doc) =>
        updates.push(doc.ref.update({
          author: user,
        }))  
      )
      await Promise.all(updates).then(execEdit())
    })
      // const ref = collection(db, 'articles');
      // const q = query(ref, orderBy('time','desc'),where('author','==',name))
      // snapshot.docs.forEach(doc => {
      //   alert(doc.id)
      //   if (doc.get('author')==name){
      //     const articleRef = doc(db, "articles", doc.data);
      //     updateDoc(articleRef, {
      //       author: user
      //     });
      //   }
      // });
  }


  const execEdit = async () =>{
    try {
      await updateProfile(auth.currentUser, { displayName: user }).catch(
        (err) => console.log(err)
      );} 
      catch (err) {
        console.log(err);
      }
    window.location.reload();
  }

  return (
    <div className="home">
        <h2>
            {name}'s posts 
            <button className='logout' onClick={handleLogout}>Log Out</button>
        </h2>
        <button onClick={handleEditOpen}>Change Username</button>
        <br />
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
        {editModal && 
        <Modal handleClose={handleEditClose}>
            <div className="writepost">
              <h2>Edit Username
              </h2>
              <img 
                className="close"
                onClick={handleEditClose}
                src={CloseIcon} alt="close icon" 
              />
              <form onSubmit={editName}>
                <label>
                  <input
                    type='text' 
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                  />
                </label>

                <button>Post</button>
              </form>
            </div>
        </Modal>}
    </div>

  )
}
