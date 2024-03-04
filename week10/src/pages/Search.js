import { Link,useNavigate } from 'react-router-dom'
import {getDocs, addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, query, orderBy,where } from 'firebase/firestore';
import {db,auth} from '../firebase/config'
import Modal from "../components/Modal"
import { useEffect,useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
// styles
import './Home.css'

export default function Search() {

  const [articles, setArticles] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
       
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setArticles(null)
    const ref = collection(db, 'articles');
    const q = query(ref, orderBy('time','desc'))
    setShowModal(true)
    getDocs(q)
    .then((snapshot)=>{
      let results = []
      console.log(snapshot)
      snapshot.docs.forEach(doc => {
        if (doc.data().author==search){
          results.push({id: doc.id, ...doc.data()});
        }
      });
      handleClose()
      setArticles(results);
    })    
  }


  const handleClose = () =>{
    setShowModal(false);
  }


  return (
    <div className="home">
      <h2>Search for user's posts</h2>

      <form onSubmit={handleSubmit}>
        <div className="writepost">
          <input
          type='text'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder='Write something!'
          required
          >
          </input>
          <button>Find</button>
        </div>
      </form>
      <br />
      <br />
    

      {articles && articles.map(article => (
        
        <div key={article.id} className="post">
          <Link to={`/articles/${article.id}`}>
          <p>{article.author}</p>
          <p>{article.post}</p>
          </Link>
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
