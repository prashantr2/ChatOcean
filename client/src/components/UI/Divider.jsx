import React from 'react'
import cls from "./Divider.module.css";

const Divider = ({ children, className }) => {
  const classes = cls['divider'] + ' ' + className;

  return (
      <hr className={classes} >
        {children}
      </hr>
  )
}

export default Divider