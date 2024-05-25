import React from "react";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import cls from "./Chat.module.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useRef, useReducer } from "react";
import MoreOptionsButton from "../UI/MoreOptionButton";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { chatActions, recieveNewMessage, sendNewMessage } from "../../store/chat";
import { fetchChat } from "../../store/chat"; 


const fileReducer = (state, action) => {
  if (action.type === 'IMG'){
    if (!state.fileSelected){
      state.fileSelected = true;
      state.file = action.payload;
      state.type = 'image';
    } else {
      state.fileSelected = false;
      state.file = null;
      state.type = '';
    }
  } else if (action.type === 'VIDEO'){
    if (!state.fileSelected){
      state.fileSelected = true;
      state.file = action.payload;
      state.type = 'video';
    } else {
      state.fileSelected = false;
      state.file = null;
      state.type = '';
    }
  } else if (action.type === 'CLEAR'){
      state.fileSelected = false;
      state.file = null;
      state.type = '';
  }
  return state;
}

const Chat = ({ }) => {
  const imgRef = useRef();
  const videoRef = useRef();
  const textRef = useRef();
  const { user } = useSelector(state => state.auth);
  const { activeChat, socket } = useSelector(state => state.chat);
  const { chatName } = useParams();
  const scrollRef = useRef();
  const dispatch = useDispatch();
  

  useEffect(() => {
      if (socket) {
          socket.on('recieveNewMessage', (msg) => {
              dispatch(recieveNewMessage(msg));
          })
      }
  }, [user, socket])
  
  useEffect(() => {
      scrollRef?.current?.current?.scrollIntoView({ behaviour: 'smooth' }); 
  }, [activeChat])
  
  const sendMessageHandler = async(e) => {
    e.preventDefault();
    if (!textRef.current.value) return;
    
    
    const { data: reciever } = await axios.get('/user/user?username=' + chatName);
    const msg = {
        text: textRef.current.value,
        senderId: user._id,
        recieverId: reciever._id, 
        time: Date.now()
    }
    textRef.current.value = '';
    dispatch(sendNewMessage(socket, msg));

    try {
      const { data: newChat } = await axios.post('/chat/message', { msg, chatName, senderId: user._id });
      if (!activeChat) dispatch(chatActions.setActiveChat(newChat));
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className={cls["chat"]}>
      <div className={cls["chat-wrapper"]}>
        {chatName === '_' ? <div className={cls['no-chat']}>Select a chat to message</div> :
          (!activeChat || activeChat.content?.length === 0) ? 
            <div className={cls['no-messages']}>No messages to show</div> :
            <>
              {activeChat.content.map(msg => (
                  <Message ref={scrollRef} key={msg.time} msg={msg} own={msg.senderId === user?._id} />
              ))}
            </>
        }
      </div>
        {chatName !== '_' && 
          <form onSubmit={sendMessageHandler}>
            <div className={cls["chat-input-wrapper"]}>
              <div className={cls["file-btn-wrapper"]}>
                { false && <div className={cls["file-cancel-btn"]} > X </div> }
                <label htmlFor="attachFile" className={ cls["file-btn"] + " " + (false && cls["file-btn-active"]) } >
                    <AttachFileIcon sx={{ fontSize: "100%" }} />
                </label>
              </div>
              <textarea ref={textRef} className={cls["input"]} placeholder="Type something..." ></textarea>
              <button type="submit" className={cls["send-btn"]}>
                <SendIcon sx={{ fontSize: "100%" }} />
              </button>
            </div>
          </form>
        }
    </div>
  );
};

export default Chat;
