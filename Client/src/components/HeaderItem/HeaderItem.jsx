import React from 'react'
import styles from './HeaderItem.module.css';
import { useNavigate } from 'react-router-dom';
function HeaderItem({title, link}) {
    const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(link)} className={styles.HeaderItem}>
        {title}      
    </div>
  )
}

function HeaderList({ Lst }) {
    return (
        <>
        {Lst.map((item, index) => (
          <HeaderItem key={index} title={item.title} link={item.link} />
        ))}
        </>
    );
  }

export {HeaderItem};
export default HeaderList;
