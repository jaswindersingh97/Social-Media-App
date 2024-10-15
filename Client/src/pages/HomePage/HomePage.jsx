import React from 'react'
import styles from './HomePage.module.css';
import {MainBodyCreatePost,Post,HeaderList} from './../../components/index';
function HomePage() {
  const Lst = [{title:"For You", link : "/"},{title:"Following", link : "/"}]
  return (
    <div className={styles.container}>
      <div className={styles.header}>
      <HeaderList Lst={Lst}/>
      </div>
      <div className={styles.body}>
        <MainBodyCreatePost/>
        <Post/>
      </div>
      
    </div>
  )
}

export default HomePage
