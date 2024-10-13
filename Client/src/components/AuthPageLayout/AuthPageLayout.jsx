import React from 'react'
import styles from './AuthPageLayout.module.css';

function AuthPageLayout({Component}) {
  return (
    <div className={styles.container}>
        <div className={styles.left}>

        </div>
        <div className={styles.right}>
            {Component}
        </div>      
    </div>
  )
}

export default AuthPageLayout
