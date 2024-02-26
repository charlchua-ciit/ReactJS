import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {collection, addDoc} from 'firebase/firestore';
import {db,auth} from '../firebase/config'
// styles
import './create.css'

export default function Create() {  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let author = auth.currentUser.displayName
    const article = {title,author,description};
    const ref = collection(db, 'articles')
    await addDoc(ref,article)

    // setTitle("");
    // setAuthor("");
    // setDescription("");

    navigate('/')
  }

  return (
    <div className="create">
      <h2 className="page-title">New Post</h2>
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
          <span>Description:</span>
          <textarea 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  )
}