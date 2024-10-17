// PostGroup.js
import { useNavigate } from 'react-router-dom';
import styles from './Post.module.css';
import React, { useContext, useEffect } from 'react';
import { FaRegCommentDots } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import fetchFeed from '../../Apis/fetchFeed';
import { AppContext } from '../../Context/AppContext';
import likePost from '../../Apis/likePost';

function Post({ Post, updatePost }) {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const onProfileClk = (e) => {
    e.stopPropagation();
    navigate(`/user/${Post.user._id}`);
  };

  const onPostClk = () => {
    navigate(`/Post/${Post._id}`);
  };

  const onLike = async (e) => {
    e.stopPropagation();
    await likePost({ postId: Post._id });

    // Update the likes array immutably
    const updatedLikes = Post.likes.includes(user._id)
      ? Post.likes.filter(id => id !== user._id)  // Remove like
      : [...Post.likes, user._id];                 // Add like

    // Update the post in the parent component's state
    updatePost({ ...Post, likes: updatedLikes });
  };

  const onComment = (e) => {
    e.stopPropagation();
    alert("Comment");
  };

  return (
    <div onClick={onPostClk} className={styles.container}>
      <div className={styles.Header}>
        <div className={styles.left}>
          <img onClick={onProfileClk} src={Post.user.profilePicture} alt="Avatar" />
        </div>
        <div className={styles.right}>
          <h4 onClick={onProfileClk} className={styles.title}>
            {Post.user.username}
          </h4>
          <span onClick={onProfileClk} className={styles.title}>
            {Post.user.email}
          </span>
          <span className={styles.time}>
            {new Date(Post.updatedAt).toLocaleString()}
          </span>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.content}>{Post.content}</div>
        <div className={styles.buttons}>
          <button onClick={onComment}>
            <FaRegCommentDots />
            <span>{Post.replies.length}</span>
          </button>
          <button onClick={onLike}>
            {Post.likes.includes(user._id) ? <FcLike /> : <CiHeart />}
            <span>{Post.likes.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function PostGroup() {
  const { posts, setPosts } = useContext(AppContext);

  const getPosts = async () => {
    const data = await fetchFeed();
    setPosts(data);
  };

  // Function to update a specific post in the state
  const updatePost = (updatedPost) => {
    setPosts((prevPosts) => 
      prevPosts.map(post => post._id === updatedPost._id ? updatedPost : post)
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts && posts.map((item, index) => (
        <Post key={index} Post={item} updatePost={updatePost} />
      ))}
    </div>
  );
}

export default PostGroup;
