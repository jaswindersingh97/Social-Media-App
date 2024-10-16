import styles from './HomeRight.module.css';
import { CiSearch } from "react-icons/ci";
import React, { useState } from 'react'

function HomeRight() {
    const [search,setSearch] = useState("");
    const SearchHandler = (e) =>{
        e.preventDefault()
        if(search.trim()){
            alert(search);
        }
    }
  return (
    <div className={styles.container}>
      <form onSubmit={SearchHandler}>
        <div className={styles.header}>
          <input type='text' value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder='Search...'/>
          <CiSearch onClick={SearchHandler}/>
        </div>
      </form>
    </div>
  )
}

export default HomeRight
