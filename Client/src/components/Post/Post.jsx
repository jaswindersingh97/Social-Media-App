import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Post.module.css';
import React, { useContext, useEffect, useState } from 'react'
import { FaRegCommentDots } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import fetchFeed from '../../Apis/fetchFeed';
import { AppContext } from '../../Context/AppContext';
function Post({Post}) {
  const navigate = useNavigate();
  const onProfileClk = (e) =>{
    e.stopPropagation();
    navigate(`/user/${Post.user._id}`)
  }
  const onPostClk = () =>{
    navigate(`/Post/${Post._id}`)
  }
  const onLike = (e) =>{
    e.stopPropagation();
    alert("like")
  }
  const onComment = (e) =>{
    e.stopPropagation();
    alert("Comment")
  }
  return (
    <div onClick={onPostClk} className={styles.container}>
      <div className={styles.Header}>
        <div className={styles.left}>
          <img onClick={onProfileClk} src={Post.user.profilePicture} alt='Avatar'/>
        </div>
        <div className={styles.right}>
            <h4 onClick={onProfileClk} className={styles.title}>
              {Post.user.username}
            </h4>
            <span onClick={onProfileClk} className={styles.title}>
              {Post.user.email}
            </span>
            <span onClick={onProfileClk} className={styles.time}>
              {Post.updatedAt}
            </span>
        </div>
      </div>  
      <div className={styles.body}>
        <div className={styles.content}>{Post.content}</div>
        <div className={styles.buttons}>
          <button onClick={onComment}>
            <FaRegCommentDots/>
            <span>{Post.replies.length}</span>
          </button>
          <button onClick={onLike}>
            <CiHeart/>
            <span>{Post.likes.length}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function PostGroup() {
  const {posts,setPosts} = useContext(AppContext);
  const getPosts = async() =>{
    const data = await fetchFeed()
    setPosts(data);
  }
  useEffect(()=>{
    getPosts();
  },[]);
  return (
    <div>
      {posts && posts.map((item, index) => (
        <Post key={index} Post={item} />
      ))}
    </div>
  )
}
export default PostGroup;

