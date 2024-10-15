import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Left from '../Left/Left';
import fetchUserProfile from '../../Apis/fetchUserProfile';
import styles from './MainLayout.module.css';
import { AppContext } from '../../Context/AppContext';
function MainLayout() {
  const navigate = useNavigate();
  const {user, setUser} = useContext(AppContext);
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = await fetchUserProfile();  // Assuming this is an async function
        setUser(userData.response);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/signIn")
      }
    };
    getUserProfile();
  }, []);
  // Log user data after it is updated
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Left />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
      <div className={styles.right}>
        right
      </div>
    </div>
  );
}

export default MainLayout;
