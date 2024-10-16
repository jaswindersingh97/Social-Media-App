import { useContext, useState } from 'react';
import styles from './MainBodyCreatePost.module.css';
import {AppContext} from './../../Context/AppContext';
import createPost from '../../Apis/createPost';
function MainBodyCreatePost() {
    const {user,setPosts} = useContext(AppContext);
    const maxLength = 500;
    const [PostContent,setPostContent]=useState("")
    const postSubmit = async(e) =>{
        e.preventDefault()
        if(PostContent.trim()){
          let {message,response} = await createPost(PostContent);
          response.user = user;
          setPosts((posts)=>[response,...posts]);
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
        maxLength={maxLength}
        />
        <span>Character limit: {maxLength-PostContent.length}</span>
        <button type='submit'>Post</button>
      </form>
      </div>
    </div>
  )
}

export default MainBodyCreatePost
