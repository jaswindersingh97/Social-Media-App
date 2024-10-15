import React from 'react'
import styles from './HomePage.module.css';
import MainBodyCreatePost from '../../components/MainBodyCreatePost/MainBodyCreatePost';
function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.HeaderItem}>
          ForYou
        </div>
        <div className={styles.HeaderItem}>
          Following
        </div>
      </div>
      <div className={styles.body}>
        <MainBodyCreatePost/>
      </div>
      
    </div>
  )
}

export default HomePage
