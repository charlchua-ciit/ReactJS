import { useNavigate, useParams } from "react-router-dom"
import {getDoc, doc, updateDoc} from 'firebase/firestore';
import {db} from '../firebase/config'
import Modal from "../components/Modal"
import { useEffect,useState } from 'react';

export default function Article() {
  const { urlId } = useParams()
  const navigate = useNavigate()

  console.log("id: " + urlId)

  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const ref = doc(db, 'articles', urlId);
    getDoc(ref)
      .then((snapshot)=>{        
        setArticle(snapshot.data());
        setTitle(snapshot.data().title)
        setAuthor(snapshot.data().author)
        setDescription(snapshot.data().description)
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
    const article = {title,author,description};
    const ref = doc(db, 'articles', urlId);
    updateDoc(ref,article).then(a=>{
      window.location.reload(true);
    })

    // setTitle("");
    // setAuthor("");
    // setDescription("");
  }

  // if (!article) {
  //   setTimeout(() => {
  //     navigate('/')
  //   }, 2000)
  // }

  return (
    <div>
      {!article && <p>No records found!</p>}
      {article && (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <button className="btn" onClick={handleEditOpen}>Edit</button>
          <p>By {article.author}</p>
          <p>{article.description}</p>
        </div>
      )}
      {showLoadModal && 
        <Modal handleClose={handleLoadClose}>
          <img src = "https://i.gifer.com/ZKZg.gif"></img>
        </Modal>}
        {showEditModal && 
        <Modal handleClose={handleEditClose}>
          <div className="create">
            <h2 className="page-title">Edit Article</h2>
            <form onSubmit={handleSubmit}>

              <label>
                <span>Title:</span>
                <input 
                  type="text" 
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </label>
              
              <label>
                <span>Author:</span>
                <input 
                  type="text" 
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                  required
                />
              </label>

              <label>
                <span>Description:</span>
                <textarea 
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </label>

              <button className="btn" >submit</button>
            </form>
          </div>
        </Modal>}
    </div>
  )
}
