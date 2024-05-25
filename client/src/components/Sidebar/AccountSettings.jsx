import React from 'react'
import cls from "./AccountSettings.module.css";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, logoutUser } from '../../store/auth';
import { profileActions } from '../../store/profile';
import { useEffect, useRef } from 'react';
import { disconnectSocket  } from '../../store/chat';

const AccountSettings = () => {
  const dispatch = useDispatch();
  const logoutRef = useRef();
  const { socket } = useSelector(state => state.chat);
  
  useEffect(() => {
      dispatch(authActions.setLogoutRef(logoutRef.current));
  }, [])
  
  const logoutUserHandler = () => {
    dispatch(profileActions.resetProfile());
    dispatch(logoutUser());
    if (socket) dispatch(disconnectSocket(socket));
  }
  
  return (
      <div className={"card-shadow category-card"}>
        <span className={"title"}>More Pages</span>
        <div className={"category"}>
            <SettingsIcon sx={{fontSize:"30px"}} />
            <span className={"category-text"}>Settings</span>
        </div>
        <div ref={logoutRef} onClick={logoutUserHandler} className={"category"}>
            <LogoutIcon sx={{fontSize:"30px"}} />
            <div  className={"category-text"} styles={{textDecoration: 'none', color: 'inherit'}}>Log Out</div>
        </div>
      </div>
  )
}

export default AccountSettings