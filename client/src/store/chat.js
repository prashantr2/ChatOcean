import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { io } from "socket.io-client";

const initialState = {
    chatsVisible: true,
    socket: null,
    onlineFriends: null,
    offlineFriends: null,
    activeChat: null,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        toggleChatsVisible: (state) => {
            state.chatsVisible = !state.chatsVisible;            
        },
        setSocket: (state, action) => {
            state.socket = action.payload;
            state.activeChat = null;
        },
        setActiveChat: (state, action) => {
            state.activeChat = action.payload;
        },
        addOnline: (state, action) => {
            if (!state.onlineFriends) {
                state.onlineFriends = [action.payload];
            } else if (!state.onlineFriends?.find(f => f._id === action.payload._id)){
                state.onlineFriends.push(action.payload);
            }
        }, 
        removeOnline: (state, action) => {
            state.onlineFriends = state.onlineFriends?.filter(f => f._id !== action.payload)
            if (state.activeChat?._id === action.payload) state.activeChat = null;
        },
        addOffline: (state, action) => {
            if (!state.offlineFriends) {
                state.offlineFriends = [action.payload];
            } else if (!state.offlineFriends?.find(f => f._id === action.payload._id)){
                state.offlineFriends.push(action.payload);
            }
        }, 
        removeOffline: (state, action) => {
            state.offlineFriends = state.offlineFriends?.filter(f => f._id !== action.payload)
            if (state.activeChat?._id === action.payload) state.activeChat = null;
        },
        setOnlineFriends: (state, action) => {  
            state.onlineFriends = action.payload;
        },
        setOfflineFriends: (state, action) => {
            state.offlineFriends = action.payload;
        },
        addNewMessage: (state, action) => {
            if (state.activeChat) {
                // Checking if last message is duplicate of current message (i.e. having same time)
                if (state.activeChat.content.length){
                    if (state.activeChat.content.slice(-1)[0].time !== action.payload.time) state.activeChat.content.push(action.payload);
                } 
            }
            else state.activeChat = {
                members: [action.payload.senderId, action.payload.recieverId].sort(),
                content: [action.payload]
            } 
        }
    }
}) 

export const connectSocket = (user) => {
    return async(dispatch) => {
       try {
            const socket = io('ws://localhost:8000');
            socket.emit('addUser', user._id);

            dispatch(chatSlice.actions.setSocket(socket));
            dispatch(chatSlice.actions.setActiveChat(null));
       } catch (err) {
            console.log(err);
       } 
    }
}

export const disconnectSocket = (socket) => {
    return async(dispatch) => {
        try {
            socket.emit('logout');
            
            dispatch(chatSlice.actions.setSocket(null));
        } catch (err) {
            console.log(err); 
        } 
    }
}

export const fetchChat = (userId, chatName) => {
    return async(dispatch) => {
        try {
            const { data } = await axios.get(`/chat/chat/${userId}/${chatName}`);
            dispatch(chatSlice.actions.setActiveChat(data));
        } catch (err) {
            console.log(err); 
            dispatch(chatSlice.actions.setActiveChat(null));
        }
    }
}

export const setOnlineFriends = (friends) => {
    return async(dispatch) => {
        try {
            dispatch(chatSlice.actions.setOnlineFriends(friends)); 
        } catch (err) {
            console.log(err); 
        }
    }
}

export const setOfflineFriends = (friends) => {
    return async(dispatch) => {
        try {
            dispatch(chatSlice.actions.setOfflineFriends(friends)); 
        } catch (err) {
            console.log(err); 
        }
    }
}

export const addOnlineFriend = (friendId) => {
    return async(dispatch) => {
        try {
            const { data } = await axios.get(`/user/user?userId=${friendId}`);
            dispatch(chatSlice.actions.addOnline(data));
            
            dispatch(chatSlice.actions.removeOffline(data._id));
        } catch (err) {
           console.log(err); 
        }
    }
}

export const removeOnlineFriend = (userId) => {
    return async(dispatch) => {
        try {
            dispatch(chatSlice.actions.removeOnline(userId));
            
            const { data:user } = await axios.get('/user/user?userId=' + userId);
            dispatch(chatSlice.actions.addOffline(user));
        } catch (err) {
           console.log(err); 
        }
    }    
}

export const sendNewMessage = (socket, msg) => {
    return async(dispatch) => {
        try {
            socket.emit('sendNewMessage', msg);
            dispatch(chatSlice.actions.addNewMessage(msg));
        } catch (err) {
            console.log(err);
        }
    }
}

export const recieveNewMessage = (msg) => {
    return async(dispatch) => {
        try {
            dispatch(chatSlice.actions.addNewMessage(msg));
        } catch (err) {
            console.log(err);
        }
    }
}

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;

