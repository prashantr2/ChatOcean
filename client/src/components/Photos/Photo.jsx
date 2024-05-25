import React from 'react'
import cls from "./Photo.module.css";

const Photo = ({ src, className }) => {
    const classes = cls["photo"] + " " + className;

  return (
      <img src={src} className={classes} />
  )
}

export default Photo