import styles from './Left.module.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
function Left() {
    const navigate = useNavigate();
    const Fields = [
        { name: "Home", link: "/" },
        { name: "Profile", link: "/profile" },
        { name: "Settings", link: "/settings" }
    ];
    const {user,postWindow,setPostWindow} = useContext(AppContext);
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <span className={styles.logo}>
                    LinkUp
                </span>
            </div>
            <div className={styles.body}>
                {
                        Fields.map(
                        (item, index) => (
                        <div className={styles.item} key={index} onClick={() => navigate(item.link)}>
                            {item.name}
                        </div>
                        )   
                    )
                }
            </div>
            <div className={styles.PostButton}>
                <button onClick={()=>{setPostWindow(true)}}>Post</button>
            </div>
            <div className={styles.profile}>
                    <div className={styles.Avatar}>
                        <img src={user? user.profilePicture : "/"} alt='profile photo'/>
                    </div>
                    <div className={styles.user}>
                        <div>{user? user.username:"Not logged in"}</div>
                        <div>{user? user.email :"not logged in"}</div>
                </div>
            </div>
        </div>
    );
};

export default Left;
