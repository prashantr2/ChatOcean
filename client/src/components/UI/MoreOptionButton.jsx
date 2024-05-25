import {useState} from 'react'
import ContextMenu from './ContextMenu';
import cls from "./MoreOptionsButton.module.css"

const MoreOptionsButton = ({ className, onClick, items, children, contextMenuClass }) => {
   const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const classes = className + ' ' + cls["btn"];

   const clickHandler = () => {
        if (onClick) onClick();
        setContextMenuOpen((state) => !state);
   } 

  return (
      <div onClick={clickHandler} className={classes}>
        {children}
        {contextMenuOpen && <ContextMenu items={items} className={contextMenuClass} /> }
      </div>
  )
}

export default MoreOptionsButton