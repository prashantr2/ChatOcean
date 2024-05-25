import React from 'react'
import cls from "./ContextMenu.module.css";

const ContextMenu = ({className, items}) => {
    const classes = className + ' ' + cls["context-menu"];

  return (
      <div className={classes}>
          {items.map((item, idx) => (
            <div key={idx} onClick={item.clickHandler} className={cls["item"]}> 
                  <span>{item.content}</span>
            </div>
          ))} 
      </div>
  )
}

export default ContextMenu