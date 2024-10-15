import { useNavigate } from 'react-router-dom';
import styles from './Post.module.css';
import React from 'react'

function Post() {
  const navigate = useNavigate();
  const Post ={
    Avatar:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    UserName:"TestingPost",
    email:"TestingMail@gmail.com",
    Content:"hi therehi therehi therehi therehi therehi therehi therehi therehi therehi therehi therehi therehi therehi therehi therehi therehi therehi therehi there",
    DateTime:"15-10-2024 13423",
    _id:'xyz to be used with on click for route',
    userId:"abc to be used on clicking of profile"
  }
  const onProfileClk = (e) =>{
    e.stopPropagation();
    alert("innerclikced")
  }
  const onPostClk = () =>{
    navigate(`/Post/${Post._id}`)
  }
  return (
    <div onClick={onPostClk} className={styles.container}>
      <div className={styles.Header}>
        <div className={styles.left}>
          <img onClick={onProfileClk} src={Post.Avatar} alt='Avatar'/>
        </div>
        <div className={styles.right}>
            <h4 onClick={onProfileClk} className={styles.title}>
              {Post.UserName}
            </h4>
            <span onClick={onProfileClk} className={styles.title}>
              {Post.email}
            </span>
            <span onClick={onProfileClk} className={styles.time}>
              {Post.DateTime}
            </span>
        </div>
      </div>  
      <div className={styles.body}>
        <span>{Post.Content}</span>
      </div>
    </div>
  )
}

export default Post
