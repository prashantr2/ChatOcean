import React from 'react'
import cls from "./Notification.module.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {asset, PF} from "../../constants/constants";
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import ShareableLink from "../UI/ShareableLink";

const Notification = ({ type, notification }) => {

  return (
        <div className={(type === 'unread' ? cls['unread'] : '') + ' ' + cls["notification"]}>
            <img src={asset(notification.image, 'profile')} className={cls["user-img"]} />
            <div className={cls["info"]}>
               <div className={cls["info-text"]}>
                    {notification.action === 'like' && (<>
                        <ShareableLink className={cls['username']} to={`/profile/${notification.username}`}>
                                    {notification.username}
                                </ShareableLink>&nbsp;liked your post&nbsp;
                        <span className={cls['link']}>
                                <Link to={`/post/${notification.postId}`} className="linkStyles">
                                    {notification.desc || 'this post'}
                                </Link>
                            </span>
                    </>)}
                    {notification.action === 'follow' && (<>
                        <ShareableLink className={cls['username']} to={`/profile/${notification.username}`}>
                                    {notification.username}
                                </ShareableLink>&nbsp;started following you&nbsp;
                    </>)}
                </div> 
                <span className={cls["info-time"]}>{format(notification.createdAt)}</span>
            </div>  
           <div className={cls["more-options"]}>
                <MoreHorizIcon sx={{fontSize: "100%"}} />
            </div> 
        </div>
  )
}

export default Notification