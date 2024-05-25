import React from 'react'
import { useParams } from 'react-router-dom';
import Post from '../components/Feed/Post'
import cls from "./PostPage.module.css";
import Photo from '../components/Photos/Photo';
import Video from '../components/Videos/Video';
import { asset } from "./../constants/constants";
import { useSelector } from "react-redux";
import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';

const postReducer = (state, action) => {
     if (action.type === 'SAVE_POST'){
          return {
               post: action.payload.post,
               owner: action.payload.owner
          }
     }
     return state;
}

const PostPage = () => {
     const params = useParams();
     const [postState, dispatch] = useReducer(postReducer, { post: null, owner: null });
     
     useEffect(() => {
          const fetchPost = async () => {
               const { data: postData } = await axios.get('/post/post?postId=' + params.postId);
               const { data: ownerData }  = await axios.get('/user/user?userId=' + postData.userId);
               dispatch({ type: 'SAVE_POST', payload: { post: postData, owner: ownerData }})
          }
          fetchPost();
     }, []);

  return (
       postState.post && 
       <div className={cls["post-page"]}>
          <Post post={postState.post} postId={postState.post?._id} owner={postState.owner} />
       </div> 
  )
}

export default PostPage