import React, { useEffect } from 'react'
import cls from "./Navbar.module.css";
import SearchBar from "./SearchBar";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import {PF, asset} from "../../constants/constants";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, getNotification } from '../../store/ui';

const removeLinkStyles = { textDecoration: 'none', color: 'inherit', fontSize: "100%"};

const Navbar = () => { 
    const { user } = useSelector(state => state.auth);
    const { socket } = useSelector(state => state.chat);
    const { notificationDot } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (socket){
            socket.on('recieveNotification', (notification) => {
                dispatch(getNotification(notification));
            })
        }
        dispatch(fetchNotifications(user?._id));
    }, [socket, user]);

  return (
    <nav className={cls["navbar"]}>
        <div className={cls["navbarLeft"]}>
            <img src={asset('', 'profile')} alt="" className={cls["brandLogo"]} />
            <Link to="/" className={cls["brandTitle"] + " linkStyles"}>ChatOcean</Link>
        </div>      
        <div className={cls["navbarCenter"]} >
            <SearchBar />
        </div>
        <div className={cls['navbarRight']}>
           <Link to="/" className={cls["btn-icon"]}>
               <HomeIcon sx={removeLinkStyles} />             
            </Link> 
           <Link to="/notifications" className={cls["btn-icon"]}>
               <NotificationsNoneIcon sx={removeLinkStyles} /> 
               { notificationDot && <div className={cls['notification-dot']}></div> }
            </Link> 
           <Link to="/chat/_" className={cls["btn-icon"]}>
               <ChatBubbleOutlineIcon sx={removeLinkStyles} />
            </Link> 
           <Link to={`/profile/${user.username}`}  className={cls["btn-icon"]}>
               { user.avatar ? <img src={asset(user.avatar, 'profile')} className={cls["user-img"]} /> : <AccountCircleIcon sx={removeLinkStyles} />}
            </Link> 
        </div>
    </nav>
  )
}

export default Navbar