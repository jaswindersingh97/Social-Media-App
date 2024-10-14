import { Outlet } from 'react-router-dom';

import React from 'react'
import styles from './MainLayout.module.css';
function MainLayout() {
  return (
    <div className={styles.container}>
    	<div className={styles.left}>left</div>
    	<div className={styles.mainHeader}>mainHeader</div>
    	<div className={styles.mainBody}>Main<Outlet /> </div>
    	<div className={styles.right}>right</div>
    </div>
  )
}

export default MainLayout;
