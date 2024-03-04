import { useNavigate, useParams } from "react-router-dom"
import {getDoc, doc, updateDoc} from 'firebase/firestore';
import {db,auth} from '../firebase/config'
import Modal from "../components/Modal"
import { useEffect,useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import CloseIcon from '../assets/close.svg';
import './Home.css';

export default function Article() {
  const { urlId } = useParams()
  const navigate = useNavigate()

  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState('')
  const [post, setPost] = useState('')
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  

  const ref = doc(db, 'articles', urlId);

  var check = ''

  useEffect(() => {
    handleLoadOpen()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid)
      } else {
        // User is signed out
        // ...
        console.log("user is logged out")
      }
    });
    getDoc(ref)
      .then((snapshot)=>{     
        handleLoadClose()   
        setArticle(snapshot.data());
        setPost(snapshot.data().post)
        setAuthor(snapshot.data().author)
      })
  },[])  

  const handleLoadClose = () =>{
    setShowLoadModal(false);
  }

  const handleEditClose = () =>{
    setShowEditModal(false);
  }

  const handleLoadOpen = () =>{
    setShowLoadModal(true);
  }

  const handleEditOpen = () =>{
    setShowEditModal(true);
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    handleEditClose()
    handleLoadOpen()
    const article = {author,post};
    const ref = doc(db, 'articles', urlId);
    updateDoc(ref,article).then(a=>{
      window.location.reload(true);
    })
  }

  const load = ()=>{
    var user = auth.currentUser
    if (user){
      if (user.displayName==author){
        check = 'article'
      } else {
        check = 'articlenobtn'
      }
    } else {
      check = 'articlenobtn'
    }
  }

  return (
    <div>
      <div onLoad={load()} className={check}>
        {!article && <p>No records found!</p>}
        {article && (
          <div key={article.id}>
            <h2>{article.author}</h2>
            <p>{article.post}</p>
            {check=='article' && <button onClick={handleEditOpen}>Edit</button>}
          </div>
        )}
        {showLoadModal && 
          <Modal handleClose={handleLoadClose}>
            <img src = "https://i.gifer.com/ZKZg.gif"></img>
          </Modal>}
          {showEditModal && 
          <Modal handleClose={handleEditClose}>
            <div className="writepost">
              <h2>Edit Post
              </h2>
              <img 
                className="close"
                onClick={handleEditClose}
                src={CloseIcon} alt="close icon" 
              />
              <form onSubmit={handleSubmit}>
                <label>
                  <textarea 
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    required
                  />
                </label>

                <button>Post</button>
              </form>
            </div>
          </Modal>}
      </div>
    </div>
  )
}
