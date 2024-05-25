import React from 'react'
import cls from "./Message.module.css";
import { format } from 'timeago.js';
import { useImperativeHandle, useRef, forwardRef } from 'react';
import ShareableLink from '../UI/ShareableLink';

const Message = forwardRef(({ own, msg }, ref) => {
  const msgRef = useRef();
  console.log(msg);
  
  useImperativeHandle(ref, () => msgRef, [])

  return (
       <div ref={msgRef} className={cls["message"] + ` ${own ? cls["own"] : ""}`}>
          <div className={cls["text"]}>{msg.text.includes('__^__') ? 
              <ShareableLink own={own} to={msg.text.replace('__^__', '')} >
                {msg.text.replace('__^__', '')}
              </ShareableLink> :
                 msg.text}
          </div>  
           <div className={cls["time"]}>{format(msg.time)}</div> 
       </div> 
  )
});

export default Message