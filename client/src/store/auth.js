import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendURL } from "../constants/constants";
import { profileActions } from "./profile";
import { uiActions } from "./ui";

const userInLocalStorage = JSON.parse(localStorage.getItem('CO_user'));

const initialState = {
    isLoggedIn: userInLocalStorage ? true : false,
    user: userInLocalStorage,
    logoutRef: null,
    avatar: null,
    pendingRequests: null,
    suggestedFriends: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = undefined;
            state.pendingRequests = null;
            state.avatar = null;
        },
        setLogoutRef: (state, action) => {
            state.logoutRef = action.payload
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload
        },
        setPendingRequests: (state, action) => {
            state.pendingRequests = action.payload
        },
        addPendingRequest: (state, action) => {
            if (state.pendingRequests) state.pendingRequests.push(action.payload);
            else state.pendingRequests = [action.payload];
        },
        removePendingRequest: (state, action) => {
            state.pendingRequests = state.pendingRequests.filter(r => r._id !== action.payload);
        },
        setSuggestedFriends: (state, action) => {
            state.suggestedFriends = action.payload
        },
    }
})

// // For OAuth
// export const tryLogin = () => {
//    return async (dispatch) => {
//         const fetchUser = async () => {
//             const { data } = await axios.get('http://localhost:8000/auth/checkAuthentication');
//             console.log(data);
//             if (data.authenticated){
//                 dispatch(authSlice.actions.login());
//             }
//         }
//         console.log("HERE");
//         fetchUser();
//    } 

// }
// 


export const loginUser = (userData) => {
    return async (dispatch) => {
        const saveUser = async() => {
            try {
                const { data: user } = await axios.post('/login', userData);

                dispatch(authSlice.actions.login(user));
                
                const { data: pendingRequests } = await axios.get('/user/followRequests/' + user._id);
                if (pendingRequests) dispatch(authSlice.actions.setPendingRequests(pendingRequests));

                localStorage.setItem('CO_user', JSON.stringify(user));
            } catch (err) {
                dispatch(uiActions.setLoginError(err.response.data.err));
                console.log(err);
            }
        }
        await saveUser();
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        localStorage.setItem('CO_user', null);
        dispatch(authSlice.actions.logout());
    }
}


export const authActions = authSlice.actions;

export default authSlice.reducer;