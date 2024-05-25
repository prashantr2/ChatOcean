import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Divider from '../UI/Divider';
import cls from "./ProfileHeader.module.css";
import { NavLink, Link, useParams } from 'react-router-dom';
import {asset, backendURL, PF} from "../../constants/constants";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileUser, followProfileUser, unfollowProfileUser, cancelPendingRequest, profileActions, deleteUser  } from '../../store/profile';
import EditIcon from '@mui/icons-material/Edit';
import MoreOptionsButton from '../UI/MoreOptionButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { logoutUser } from '../../store/auth';
import { displayModal } from '../../store/ui';
import Modal from '../Modal/Modal';
import ProfileNotFound from '../../pages/ProfileNotFound';
import FavoriteIcon from '@mui/icons-material/Favorite';


const ProfileHeader = () => {
    const params = useParams();
    const stateDispatch = useDispatch();
    const {socket } = useSelector(state => state.chat);
    const { user } = useSelector(state => state.auth)
    const { profileUser, followStatus } = useSelector(state => state.profile);

    const moreActions = [{
        content: (<span><DeleteIcon sx={{fontSize: "120%"}} /> Delete</span>),
        clickHandler: () => {
            stateDispatch(displayModal( <Modal showControls={true} title={"Confirm Delete Account"} msg={"Are your sure you want to delete this account? This cannot be undone."} 
                        cb={() => {
                            stateDispatch(deleteUser(profileUser));
                            stateDispatch(logoutUser());
                         }} /> 
                     ))}
    }]

    useEffect(() => {
        stateDispatch(profileActions.resetProfile());
        stateDispatch(fetchProfileUser(user, params.username));
    }, [params.username, user])
    
    const followUserHandler = () => {
        stateDispatch(followProfileUser(socket, user, profileUser));
    }

    const unfollowUserHandler = () => {
        stateDispatch(unfollowProfileUser(user, profileUser));
    }
    
    const cancelPendingRequestHandler = () => {
        stateDispatch(cancelPendingRequest(user, profileUser));
    }

    
    const fullName = profileUser && (profileUser.firstName || '') + " " + (profileUser.lastName || '');

   const classes =  cls["profile-header"] + " card-shadow";

  return (
        profileUser ? (
        <div className={classes}>
            <div className={cls["cover"]}>
                <img src={asset(profileUser.coverImg, 'cover')} alt="" className={cls["cover-img"]} />
                {user._id === profileUser._id && <NavLink to="edit" className={cls["edit-profile-btn"] + " linkStyles"}><EditIcon sx={{fontSize: '100%'}} /></NavLink>}
            </div>
            <div className={cls["user-info"]}>
                <img src={asset(profileUser.avatar, 'profile')} className={cls["user-info-img"]} />
                <div className={cls["user-info-desc"]}>
                    <span className={cls["user-info-name"]}>{fullName}</span> 
                    <span className={cls["user-info-email"]}>@{profileUser.username}</span> 
                </div>
                <div className={cls["user-info-actions"]}>
                    { user._id !== profileUser._id && 
                    ( followStatus === 'unFollowed' ? 
                        <button onClick={followUserHandler} className={cls["follow-btn"]}>Follow</button> :
                        followStatus === 'pending' ?
                            <button onClick={cancelPendingRequestHandler} className={cls["follow-pending-btn"]}>Pending</button> :
                            <button onClick={unfollowUserHandler} className={cls["unfollow-btn"]}>Unfollow</button>
                     )}
                    { followStatus === 'followed' && <div className={cls["message-btn"]}>
                        <Link className="linkStyles" to={`/chat/${profileUser.username}`}>
                            <SendIcon sx={{fontSize: "25px"}} /> 
                        </Link>
                    </div>}
                    { user._id === profileUser._id && <div className={cls["favorites-btn"]}>
                        <NavLink className={(state) => "linkStyles " + (state.isActive ? cls['favorites-btn-active'] : '')} to={`favorites`} >
                            <FavoriteIcon sx={{fontSize: "25px"}} /> 
                        </NavLink>
                    </div>}
                    { profileUser._id === user._id && <MoreOptionsButton items={moreActions} contextMenuClass={cls["more-options-actions"] + ' card-shadow'} className={cls["more-options"]}>
                        <MoreHorizIcon sx={{fontSize: "25px"}} /> 
                    </MoreOptionsButton> }
                </div>
            </div>
            <Divider />
        <nav className={cls["profile-nav"]}>
            <NavLink to="posts" className={(state) => cls["nav-section"] + " linkStyles " + (state.isActive ? cls['active'] : '')}>
                <span>Posts</span>
            </NavLink>
            <NavLink to="videos" className={(state) => cls["nav-section"] + " linkStyles " + (state.isActive ? cls['active'] : '')}>
                <span>Video</span>
            </NavLink>
            <NavLink to="stories" className={(state) => cls["nav-section"] + " linkStyles " + (state.isActive ? cls['active'] : '')}>
                <span>Stories</span>
            </NavLink>
            <NavLink to="followers" className={(state) => cls["nav-section"] + " linkStyles " + (state.isActive ? cls['active'] : '')}>
                <span>Followers</span>
            </NavLink>
            <NavLink to="followings" className={(state) => cls["nav-section"] + " linkStyles " + (state.isActive ? cls['active'] : '')}>
                <span>Followings</span>
            </NavLink>
        </nav>
        </div> ) : (
            <ProfileNotFound />
        )
  )
}

export default ProfileHeader