import React from 'react'
import cls from "./ProfileNotFound.module.css";
import { useNavigate } from 'react-router-dom';

const ProfileNotFound = () => {
    const navigate = useNavigate();

  return (
      <div className={cls['page']}>
         <h1 className={cls['header']} >No such user</h1>
         <h2 className={cls['desc']}>Oops! Seems like you misspelled the username</h2>
         <div className={cls['options']}>
            <button onClick={() => navigate(-1)} className={cls['go-back-btn']}>Go Back</button>
            <button onClick={() => navigate('/login')} className={cls['login-btn']}>To login</button>
         </div>
      </div>
  )
}

export default ProfileNotFound
