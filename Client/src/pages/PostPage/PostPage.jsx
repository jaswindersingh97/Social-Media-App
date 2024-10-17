import React from 'react'
import styles from './PostPage.module.css';
import { useParams } from 'react-router-dom';
function PostPage() {
    const {postId} = useParams();
  return (
    <div className={styles.container}> 

    </div>
  )
}

export default PostPage
