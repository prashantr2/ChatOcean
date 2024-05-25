import React, { useEffect } from 'react'
import cls from "./Notifications.module.css";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import Notification from '../components/Notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { markAsReadNotifications } from '../store/ui';

const Notifications = () => {
    const { unreadNotifications, readNotifications } = useSelector(state => state.ui);
    // const unreadNotifications = ['akldfja'];
    // const readNotifications = ['akldfja', 'alkdaf'];
    const dispatch = useDispatch();
    const { socket } = useSelector(state => state.chat);
    const location = useLocation();
    let totalNotifications = (unreadNotifications && unreadNotifications.length || 0) + (readNotifications && readNotifications.length || 0)

    useEffect(() => {
        
        return () => {
            if (location.pathname !== '/notifications/') dispatch(markAsReadNotifications(unreadNotifications));
        }
    }, [location, socket]);

  return (
       <div className={cls["notifications-page"]}>
           <div className={cls["container"] + ' card-shadow'}>
               <div className={cls["top"]}>
                   <div className={cls["top-left"]}>
                       <span className={cls["top-left-title"]}>Notifications</span> 
                       {unreadNotifications?.length && <div className={cls["top-left-total"]}>{unreadNotifications?.length}</div> }
                    </div> 
                   <div className={cls["top-right"]}>
                       {/* <div className={cls["btn-icon"]}>
                            <DoneAllIcon /> 
                        </div>  */}
                       {/* <div className={cls["btn-icon"]}>
                            <DeleteIcon /> 
                        </div>  */}
                    </div> 
                </div> 
               <div className={cls["notifications"]}>
                    {totalNotifications ?
                        <>
                            {unreadNotifications?.map(notif => (
                                <Notification notification={notif} type="unread" />
                            ))}
                            {readNotifications?.map(notif => (
                                <Notification notification={notif} type="read" />
                            ))}
                        </> :
                        <div className={cls['no-notifications']}>Your notifications will appear here</div>
                    }
                </div> 
            </div>  
       </div> 
  )
}

export default Notifications