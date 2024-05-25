import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authActions } from "./auth";

const initialState = {
    profileUser: null,
    isFollowed: 'notFollowed',
    posts: null,
    videos: null,
    stories: null,
    favorites: null,
    followers: null,
    followings: null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setProfileUser: (state, action) => {
            state.profileUser = action.payload;
        },
        followUser: (state) => {
            state.followStatus = 'followed';
        },
        followPendingUser: (state) => {
            state.followStatus = 'pending';
        },
        unfollowUser: (state) => {
            state.followStatus = 'unFollowed';
        },
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(p => p._id !== action.payload._id);
        },
        setVideos: (state, action) => {
            state.videos = action.payload
        },
        setStories: (state, action) => {
            state.stories = action.payload
        },
        setFavorites: (state, action) => {
            state.favorites = action.payload
        },
        setFollowers: (state, action) => {
            state.followers = action.payload
        },
        addFollower: (state, action) => {
            if (state.followers) state.followers.push(action.payload);
            else state.followers = [action.payload];
        },
        setFollowings: (state, action) => {
            state.followings = action.payload
        },
        resetProfile: (state) => {
            state.profileUser = null;
            state.followStatus = 'unFollowed';
            state.posts = null;
            state.videos = null;
            state.stories = null;
            state.followers = null;
            state.followings = null;
        },
    }
})

export const fetchProfileUser = (user, username) => {
    return async (dispatch) => {
        try {
            const { data: profileUser } = await axios.get('/user/user?username=' + username);
            dispatch(profileSlice.actions.setProfileUser(profileUser));
            // const alreadyFollowed = profileUser.followers.find(f => f === user._id);
            const { data } = await axios.get(`/user/followStatus/${user._id}/${profileUser._id}`);
            if (data.followStatus === 'followed') dispatch(profileSlice.actions.followUser());
            else if (data.followStatus === 'pending') dispatch(profileSlice.actions.followPendingUser());
        } catch (err) {
            console.log(err); 
        }
    }
}

export const followProfileUser = (socket, user, profileUser) => {
    return async (dispatch) => {
        try {
            await axios.put(`/user/${profileUser._id}/follow`, { userId: user._id });
            if (profileUser.accountType === 'public') dispatch(profileSlice.actions.followUser());
            else {
                dispatch(profileSlice.actions.followPendingUser());
                socket.emit('myFollowRequest', { friendId: profileUser._id, user });
            }
        } catch (err) {
            console.log(err); 
        }
    }
}

export const unfollowProfileUser = (user, profileUser) => {
    return async (dispatch) => {
        try {
            await axios.put(`/user/${profileUser._id}/unfollow`, { userId: user._id });
            dispatch(profileSlice.actions.unfollowUser());
        } catch (err) {
            console.log(err); 
        }
    }
}

export const cancelPendingRequest = (user, profileUser) => {
    return async (dispatch) => {
        try {
            await axios.put(`/user/${profileUser._id}/cancelPendingRequest`, { userId: user._id });
            dispatch(profileSlice.actions.unfollowUser());
        } catch (err) {
            console.log(err); 
        }
    }
}

// Profile content fetching logic
export const fetchProfilePosts = (profileUser) => {
    return async (dispatch) => {
        try {
            if (profileUser){
                const { data } = await axios.get('/user/posts/' + profileUser._id);
                dispatch(profileSlice.actions.setPosts(data));
            }
        } catch (err) {
            console.log(err); 
        }
    }
}

// Profile favorite posts
export const fetchFavoritePosts = (profileUser) => {
    return async (dispatch) => {
        try {
            if (profileUser){
                const { data } = await axios.get('/user/favorites/' + profileUser._id);
                dispatch(profileSlice.actions.setFavorites(data));
            }
        } catch (err) {
            console.log(err); 
        }
    }
}

export const fetchProfileVideos = (profileUser) => {
    return async (dispatch) => {
        try {
            if (profileUser){
                const { data } = await axios.get('/user/videos/' + profileUser._id);
                dispatch(profileSlice.actions.setVideos(data));
            }
        } catch (err) {
            console.log(err); 
        }
    }
}

export const fetchProfileStories = (profileUser) => {
    return async (dispatch) => {
        try {
            if (profileUser){
                const { data } = await axios.get('/user/stories/' + profileUser._id);
                dispatch(profileSlice.actions.setStories(data));
            }
        } catch (err) {
            console.log(err); 
        }
    }
}

export const fetchProfileFollowers = (profileUser) => {
    return async (dispatch) => {
        try {
            if (profileUser){
                const { data } = await axios.get('/user/followers/' + profileUser._id);
                dispatch(profileSlice.actions.setFollowers(data));
            }
        } catch (err) {
            console.log(err); 
        }
    }
}

export const fetchProfileFollowings = (profileUser) => {
    return async (dispatch) => {
        try {
            if (profileUser){
                const { data } = await axios.get('/user/followings/' + profileUser._id);
                dispatch(profileSlice.actions.setFollowings(data));
            }
        } catch (err) {
            console.log(err); 
        }
    }
}

export const deleteUser = (profileUser) => {
    return async (dispatch) => {
        try{
            if (profileUser){
                await axios.delete('/user/user/' + profileUser._id);
            } 
        } catch (err) {
            console.log(err); 
        }
    } 
}

export const deletePost = (post) => {
    return async (dispatch) => {
        try {
            if (post){
                await axios.delete('/post/post/' + post._id);
                dispatch(profileSlice.actions.removePost(post));
            } 
        } catch (err) {
            console.log(err);
        }
    } 
}

export const confirmFriendRequest = (socket, userId, friendId) => {
    return async(dispatch) => {
        try{
            await axios.put('/user/acceptFollowRequest', { friendId, userId });
            const { data } = await axios.get('/user/user?userId=' + friendId);
            socket.emit('yourFollowRequestAccepted', { friendId, userId });
            dispatch(profileSlice.actions.addFollower(data));
            dispatch(authActions.removePendingRequest(friendId));
        } catch (err) {
            console.log(err);
        }
    }
}

export const deleteFriendRequest = (userId, friendId) => {
    return async(dispatch) => {
        try{
            await axios.put('/user/deleteFollowRequest', { friendId, userId });
            dispatch(authActions.removePendingRequest(friendId));
        } catch (err) {
            console.log(err);
        }
    }
}


export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
