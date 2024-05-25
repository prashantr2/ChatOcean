import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BasicInfo from "../UI/BasicInfo";
import cls from "./FriendRequests.module.css";
import SectionCard from "../UI/SectionCard";
import {PF} from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import { confirmFriendRequest, deleteFriendRequest, profileActions } from "../../store/profile";

const FriendRequest = ({ req, onConfirm, onDelete }) => {
    return (
        <div className={cls["request"]}>
            <BasicInfo img={req.avatar} name={req.username} info={req.from} />
            <div className={cls["request-actions"]} >
                <button onClick={() => onConfirm(req._id)} className={cls["confirm-btn"]}>Confirm</button>
                <button onClick={() => onDelete(req._id)} className={cls["delete-btn"]}>Delete</button>
            </div>
        </div>
    )
}

const FriendRequests = () => {
    const { user, pendingRequests }  = useSelector(state => state.auth);
    const { profileUser } = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const { socket } = useSelector(state => state.chat);
    
    const confirmRequestHandler = (reqId) => {
        dispatch(confirmFriendRequest(socket, user._id, reqId));
    } 
    
    const deleteRequestHandler = (reqId) => {
        dispatch(deleteFriendRequest(user._id, reqId));
    }
    
    useEffect(() => {
        if (socket){
            socket.on('gotFollowRequest', (user) => {
                dispatch(authActions.addPendingRequest(user));
            })
            socket.on('myFollowRequestAccepted', (userId) => {
                if (profileUser._id === userId) dispatch(profileActions.followUser());
            })
        }
    }, [socket, user]);

    
    useEffect(() => {
        const fetchRequests = async() => {
            const { data: fetchedPendingRequests } = await axios.get('/user/followRequests/' + user._id);
            dispatch(authActions.setPendingRequests(fetchedPendingRequests));
        }
        if (user) fetchRequests();
    }, [user])
    
  return (
      <SectionCard title={"Friend Requests"} expandLinkText={"See All"} >
        {(!pendingRequests || !pendingRequests.length) && <div className={cls["no-requests"]}>No pending requests</div>}
        {pendingRequests?.map(req => (
            <FriendRequest req={req} onConfirm={confirmRequestHandler} onDelete={deleteRequestHandler} />
        ))}
      </SectionCard>
  );
};

export default FriendRequests;
