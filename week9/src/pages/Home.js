import { Link } from 'react-router-dom'
import {getDocs, collection, deleteDoc, doc, onSnapshot} from 'firebase/firestore';
import {db} from '../firebase/config'
import Modal from "../components/Modal"
import { useEffect,useState } from 'react';
import DeleteIcon from '../assets/delete.svg'

// styles
import './Home.css'

export default function Home() {

  const [articles, setArticles] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const ref = collection(db, 'articles');
    setShowModal(true)
    onSnapshot(ref, (snapshot)=>{
        console.log(snapshot);
        let results = []
         snapshot.docs.forEach(doc => {
           results.push({id: doc.id, ...doc.data()});
         });
         handleClose()
        setArticles(results);
      });

    // getDocs(ref)
    //   .then((snapshot)=>{
    //     let results = []
    //     console.log(snapshot)
    //     snapshot.docs.forEach(doc => {
    //       results.push({id: doc.id, ...doc.data()});
    //     });
    //     setArticles(results);
    //   })    
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

  return (
    <div className="home">
      <h2>Articles</h2>

      {articles && articles.map(article => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <Link to={`/articles/${article.id}`}>Read More...</Link>
          <img 
            className="icon"
            onClick={() => handleDelete(article.id)}
            src={DeleteIcon} alt="delete icon" 
          />
        </div>
      ))}
      {showModal && 
        <Modal handleClose={handleClose}>
          <img src = "https://i.gifer.com/ZKZg.gif"></img>
        </Modal>}
    </div>

  )
}
