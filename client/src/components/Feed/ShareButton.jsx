import React from 'react'
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import cls from "./ShareButton.module.css";
import Modal from '../Modal/Modal';
import BasicInfo from '../UI/BasicInfo';
import { NavLink } from 'react-router-dom';
import SectionCard from '../UI/SectionCard';
import { displayModal, removeModal } from '../../store/ui';
import { setOnlineFriends, setOfflineFriends } from "../../store/chat";
import { useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios"
import { sendNewMessage } from '../../store/chat';


const ShareToContainer = ({ cb, postId }) => {
    const { onlineFriends, offlineFriends, socket } = useSelector(state => state.chat);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const shareButtonClickHandler = async(username) => {
        const { data: reciever } = await axios.get('/user/user?username=' + username);
        const msg = {
            text: `__^__/post/${postId}`,
            senderId: user._id,
            recieverId: reciever._id, 
            time: Date.now()
        }
        dispatch(sendNewMessage(socket, msg));

        try {
          await axios.post('/chat/message', { msg, chatName: username, senderId: user._id });
            cb();
        } catch (err) {
          console.log(err);
        }
    } 

    useEffect(() => {
          if (socket) {
            socket.on('updateFriends', (friends) => {
                  dispatch(setOnlineFriends(friends.onlineFriends));
                  dispatch(setOfflineFriends(friends.offlineFriends));
            })
            socket.emit('getFriends', user?._id);
          }
    }, [socket, user])
    
    return (
        <div className={cls['share-container']}>
           <SectionCard className={cls["online-friends"]} title={"Online Friends"}>
               <div style={{ flexDirection : 'column' }} className={cls["online-friends-nav"]}>
                  {onlineFriends?.map(friend => 
                    {return (user?._id !== friend._id) && <div className={cls['section-item']} key={friend._id}>
                          <BasicInfo cardStatus={'online'} className={cls['basic-info']} 
                                img={friend.avatar} name={friend.username} info={''} />
                          <span onClick={() => shareButtonClickHandler(friend.username)} className={cls['send-btn']}><SendIcon sx={{fontSize: '100%'}} /></span>
                    </div>}
                  )}
               </div>
           </SectionCard>
           <SectionCard className={cls["offline-friends"]} title={"Offline Friends"}>
               <div style={{ flexDirection : 'column' }} className={cls["offline-friends-nav"]}>
                  {offlineFriends?.map(friend => 
                    {return (user?._id !== friend._id) && <div className={cls['section-item']} key={friend._id}>
                          <BasicInfo cardStatus={'offline'} className={cls['basic-info']} 
                                img={friend.avatar} name={friend.username} info={''} />
                          <span onClick={() => shareButtonClickHandler(friend.username)} className={cls['send-btn']}><SendIcon sx={{fontSize: '100%'}} /></span>
                    </div>}
                  )}
               </div>
           </SectionCard>
        </div>
    ) 
}

const ShareButton = ({ children, className, postId }) => {
    const classes = className + ' ' + cls["share-btn"];
    const dispatch = useDispatch();

    const cb = async() => {
        dispatch(removeModal());
    } 

    const shareClickHandler = () => {
        dispatch(displayModal(<Modal color='blue' cb={() => {}} hideControls={true} title="Share with" msg={<ShareToContainer cb={cb} postId={postId} />} />))        
    } 

  return (
     <div onClick={shareClickHandler} className={classes}>
        {children}
     </div>  
  )
}

export default ShareButton