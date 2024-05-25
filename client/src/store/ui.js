import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    modalActive: false,
    modal: null,
    loginError: null,
    notificationDot: false,
    readNotifications: null,
    unreadNotifications: null
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        setModal: (state, action) => {
            state.modal = action.payload;
        },
        setModalActive: (state) => {
            state.modalActive = true;
        },
        setModalInactive: (state) => {
            state.modalActive = false;
        },
        setLoginError: (state, action) => {
            state.loginError = action.payload;
        },
        setNotificationDot: (state) => {
            state.notificationDot = true;
        },
        unsetNotificationDot: (state) => {
            state.notificationDot = false;
        },
        setReadNotifications: (state, action) => {
            state.readNotifications = action.payload;
        },
        setUnreadNotifications: (state, action) => {
            state.unreadNotifications = action.payload;            
        },
        readNotifications: (state) => {
            if (state.readNotifications){
                if (state.unreadNotifications) state.readNotifications = [...state.unreadNotifications, ...state.readNotifications];
            } 
            else state.readNotifications = state.unreadNotifications;
            state.unreadNotifications = null;
        },
        addNotification: (state, action) => {
            if (state.unreadNotifications) state.unreadNotifications = [action.payload, ...state.unreadNotifications];
            else state.unreadNotifications = [action.payload];
            state.notificationDot = true;
        }
    }
})

export const removeModal = () => {
    return async(dispatch) => { 
        dispatch(uiSlice.actions.setModal(null));
        dispatch(uiSlice.actions.setModalActive(false));
    }
}

export const displayModal = (modal) => {
    return async(dispatch) => { 
        dispatch(uiSlice.actions.setModal(modal));
        dispatch(uiSlice.actions.setModalActive(true));
    }
}

export const sendNotification = (socket, targetUserId, notification) => {
    return async(dispatch) => {
        try {
            socket.emit('sendNotification', { targetUserId, notification });
            await axios.post('/user/notification', { targetUserId, notification });
        } catch (err) {
            console.log(err);
        }
    }
}

export const fetchNotifications = (userId) => {
    return async(dispatch) => {
        try {
            const { data } = await axios.get('/user/notifications/' + userId);
            dispatch(uiSlice.actions.setReadNotifications(data.readNotifications));
            dispatch(uiSlice.actions.setUnreadNotifications(data.unreadNotifications));
            if (data.unreadNotifications.length) dispatch(uiSlice.actions.setNotificationDot());
        } catch (err) {
            console.log(err); 
        }
    }
}

export const markAsReadNotifications = (unreadNotifications) => {
    return async(dispatch) => {
        try {
            if (unreadNotifications && unreadNotifications.length) await axios.put('/user/readNotifications', { notifications: unreadNotifications });
            dispatch(uiSlice.actions.readNotifications())
            dispatch(uiSlice.actions.unsetNotificationDot());
        } catch (err) {
            console.log(err); 
        }
    }
}

export const getNotification = (notification) => {
    return async(dispatch) => {
        try {
           dispatch(uiSlice.actions.addNotification(notification));
        } catch (err) {
            console.log(err); 
        }
    }
}

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
