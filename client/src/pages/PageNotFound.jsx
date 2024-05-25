import React from 'react'
import cls from "./PageNotFound.module.css";
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

  return (
      <div className={cls['page']}>
         <h1 className={cls['header']} >404</h1>
         <h2 className={cls['desc']}>Oops! Seems like you visited the wrong page</h2>
         <div className={cls['options']}>
            <button onClick={() => navigate(-1)} className={cls['go-back-btn']}>Go Back</button>
            <button onClick={() => navigate('/login')} className={cls['login-btn']}>To login</button>
         </div>
      </div>
  )
}

export default PageNotFound