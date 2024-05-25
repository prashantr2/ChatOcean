import cls from "./ChatSidebar.module.css";
import BasicInfo from "../UI/BasicInfo";
import SectionCard from "../UI/SectionCard";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { chatActions, fetchChat, addOnlineFriend, removeOnlineFriend, setOnlineFriends, setOfflineFriends } from "../../store/chat";
import { asset } from "../../constants/constants";
import { format } from "timeago.js";

const ChatSidebar = () => {
    const [sidebarMini, setSidebarMini] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { chatName } = useParams();
    const { socket, onlineFriends, offlineFriends, activeChat } = useSelector(state => state.chat);
    

    useEffect(() => {
          if (chatName !== '_') {
            dispatch(fetchChat(user._id, chatName));
          } else {
            dispatch(chatActions.setActiveChat(null));
          }
          console.log(activeChat);
    }, [chatName])
      
    useEffect(() => {
          if (socket) {
            socket.on('friendOnline', (friendId) => {
                  dispatch(addOnlineFriend(friendId));
                  socket.emit('meOnline', (user._id));
            })
            socket.on('alreadyOnline', (friendId) => {
                  dispatch(addOnlineFriend(friendId));
            })
            socket.on('friendOffline', (friendId) => {
                  dispatch(removeOnlineFriend(friendId));
            })
            socket.on('updateFriends', (friends) => {
                  dispatch(setOnlineFriends(friends.onlineFriends));
                  dispatch(setOfflineFriends(friends.offlineFriends));
            })
            socket.emit('getFriends', user?._id);
          }
    }, [socket, user])
      
    useEffect(() => {
         if (window.innerWidth < 1000) setSidebarMini(true);
         else setSidebarMini(false);
    }, []);
     

  return (
       <div className={cls["chat-sidebar"]}>
           <SectionCard type={sidebarMini && 'mini'} className={cls["online-friends"]} title={"Online Friends"} expandLinkText={"See All"}>
               <div style={{ flexDirection : (sidebarMini ? 'row' : 'column') }} className={cls["online-friends-nav"]}>
                  {onlineFriends?.map(friend => 
                    {return (user?._id !== friend._id) && <NavLink key={friend._id} to={`/chat/${friend.username}`} className={(state) => ('linkStyles ' + cls['navlink'] + ' ' + (state.isActive ? cls['active'] : ''))}>
                          <BasicInfo cardStatus={'online'} type={sidebarMini && 'mini'} className={sidebarMini ? cls["basic-info-mini"] : cls['basic-info']} 
                                img={friend.avatar} name={friend.username} info={''} />
                    </NavLink>}
                  )}
               </div>
           </SectionCard>
       

           <SectionCard type={sidebarMini && 'mini'} className={cls["offline-friends"]} title={"Offline Friends"} expandLinkText={"See All"}>
               <div style={{ flexDirection : (sidebarMini ? 'row' : 'column') }} className={cls["offline-friends-nav"]}>
                  {offlineFriends?.map(friend => 
                    {return (user?._id !== friend._id) && <NavLink key={friend._id} to={`/chat/${friend.username}`} className={(state) => ('linkStyles ' + cls['navlink'] + ' ' + (state.isActive ? cls['active'] : ''))}>
                          <BasicInfo cardStatus={'offline'} type={sidebarMini && 'mini'} className={sidebarMini ? cls["basic-info-mini"] : cls['basic-info']} 
                                img={friend.avatar} name={friend.username} info={''} />
                    </NavLink>}
                  )}
               </div>
           </SectionCard>
       </div> 
  )
}

export default ChatSidebar