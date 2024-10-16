import { useContext, useState } from 'react';
import styles from './MainBodyCreatePost.module.css';
import {AppContext} from './../../Context/AppContext';
import createPost from '../../Apis/createPost';
function MainBodyCreatePost() {
    const {user} = useContext(AppContext);
    const [PostContent,setPostContent]=useState("")
    const postSubmit = async(e) =>{
        e.preventDefault()
        if(PostContent.trim()){
          const {message,response} = await createPost(PostContent);
          console.log(message,response)
          setPostContent("")
        }
    }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={user.profilePicture} alt='ProfilePhoto'/>
      </div>
      <div className={styles.right}>
      <form onSubmit={postSubmit}>
        <textarea 
        type='text' 
        name='PostContent' 
        value={PostContent} 
        onChange={(e)=>{setPostContent(e.target.value)}} 
        placeholder="What's Happening!"    
        />
        <span>Character limit: {150-PostContent.length}</span>
        <button type='submit'>Post</button>
      </form>
      </div>
    </div>
  )
}

export default MainBodyCreatePost
