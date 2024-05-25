import React from 'react'
import Stories from "./Stories";
import CreatePost from "./CreatePost";
import cls from "./Feed.module.css";
import Post from "./Post";
import FriendRequests from './FriendRequests';
import SuggestedFriends from "./SuggestedFriends";
import { asset, backendURL } from "../../constants/constants";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import axios from 'axios';


const Feed = () => {
  const { user } = useSelector(state => state.auth); 
  const [timelinePosts, setTimelinePosts] = useState([]);

  useEffect(() => {
     const fetchPosts = async () => {
       try {
         const { data } = await axios.get('/user/timeline?userId=' + user._id );
          setTimelinePosts(data);
       } catch (err) {
          console.log(err);
       }
     }
    if (user){
     fetchPosts();
    }
  }, [user])
  

  return (
      <div className={cls["feed"]}>
        <div className={cls['centerSection']}>
            <Stories />    
            <div className={cls["postsSection"]}>
                <CreatePost />
                {timelinePosts.map(post => (
                    <Post post={post} owner={post.owner} key={post._id} /> 
                ))}
            </div>
        </div>
        <div className={cls['rightSection']}>
            <FriendRequests />
            <SuggestedFriends />
        </div>
      </div>
  )
}

export default Feed