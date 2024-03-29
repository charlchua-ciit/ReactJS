import { Link,useNavigate } from 'react-router-dom'
import {getDocs, addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';
import {db,auth} from '../firebase/config'
import Modal from "../components/Modal"
import { useEffect,useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
// styles
import './Home.css'

export default function Home() {

  const [articles, setArticles] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const ref = collection(db, 'articles');
    const q = query(ref, orderBy('time','desc'))
    setShowModal(true)
    onSnapshot(q, (snapshot)=>{
        console.log(snapshot);
        let results = []
         snapshot.docs.forEach(doc => {
           results.push({id: doc.id, ...doc.data()});
         });
         handleClose()
        setArticles(results);
      });   
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        var time = serverTimestamp()
        let author = auth.currentUser.displayName
        const article = {author,post,time};
        const ref = collection(db, 'articles')
        addDoc(ref,article)
        setPost('')
      } else {
        navigate('/login')
      }
    })
  }


  const handleClose = () =>{
    setShowModal(false);
  }


  return (
    <div className="home">
      <h2>Home</h2>

      <form onSubmit={handleSubmit}>
        <div className="writepost">
          <textarea
          onChange={(e) => setPost(e.target.value)}
          value={post}
          placeholder='Write something!'
          required
          >
          </textarea>
          <button>Post</button>
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
