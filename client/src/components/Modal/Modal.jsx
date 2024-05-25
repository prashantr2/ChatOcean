import React from 'react'
import ReactDOM from 'react-dom'
import cls from "./Modal.module.css";
import { removeModal } from '../../store/ui'; 
import { useDispatch } from 'react-redux';

const Modal = ({title, msg, cb, color, showControls}) => {
    const dispatch = useDispatch();
    
    const cancelHandler = () => {
        dispatch(removeModal());
    } 
    
    const okayHandler = () => {
        cb();
        cancelHandler();
    }

  return (
      <div className={cls['modal']}>
         <div className={cls['backdrop']} onClick={cancelHandler}> </div>
         <div className={cls['modal-container']}>
           <div style={color === 'blue' ? {backgroundColor: '#0B54FA'} : { backgroundColor: '#fa0b1f'}} className={cls["modal-top"]}>{title}</div> 
           <div className={cls['modal-center'] + ' ' + (showControls ? ' ' : cls['rounded-bottom'])}>{msg}</div>
           {showControls && 
             <div className={cls["modal-bottom"]}>
              <button className={cls["cancel-btn"]} onClick={cancelHandler}>Cancel</button>
              <button className={cls["okay-btn"]} onClick={okayHandler}>Okay</button>
             </div>
           }
         </div>
      </div>
  )
}

export default Modal