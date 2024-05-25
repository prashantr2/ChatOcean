import React from 'react'
import cls from "./ShareableLink.module.css";
import { Link } from 'react-router-dom';

const ShareableLink = ({ className, to, own, children }) => {
  const classes = className + ' linkStyles ' + cls['shareable-link'] + ' ' + (own && cls['own']);

  return (
      <Link to={to} className={classes}>
        {children}
      </Link>
  )
}

export default ShareableLink