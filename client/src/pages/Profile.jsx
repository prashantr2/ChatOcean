import React from 'react'
import cls from "./Profile.module.css";
import ProfileHeader from '../components/Profile/ProfileHeader';
import Post from '../components/Feed/Post';
import Photo from '../components/Photos/Photo';
import Video from "../components/Videos/Video";
import FriendRequests from '../components/Feed/FriendRequests';
import {asset, backendURL, dummyPost } from "./../constants/constants";
import { Outlet, useParams } from 'react-router-dom';
import StoryCard from '../components/Feed/StoryCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PersonCard from "../components/UI/PersonCard";
import axios from 'axios';
import { fetchProfileFollowers, fetchProfileFollowings, fetchProfilePosts, fetchProfileStories, fetchProfileVideos, fetchFavoritePosts } from '../store/profile';
import LockIcon from '@mui/icons-material/Lock';


export const Content = ({children}) => {
  const { profileUser, followStatus } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);

  return (
        <div className={cls["bottomSection"]}>
            <div className={cls['centerSection']}>
                { (profileUser?.accountType === 'public' || profileUser?._id === user._id || followStatus === 'followed') && children}
                { profileUser?.accountType === 'private' && profileUser?._id !== user._id && followStatus !== 'followed' && 
                      <div className={cls['private-account-msg']} >
                          <LockIcon style={{fontSize: '100%'}} /><span>Account is private. <br />Follow this user to see their content</span>
                      </div>} 
            </div>
            <div className={cls['rightSection']}>
                <FriendRequests />    
            </div>
        </div>
  ) 
}

export const PostsContent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { profileUser, posts } = useSelector(state => state.profile);
  
  useEffect(() => {
    const fetchPosts = async() => {
      try {
        dispatch(fetchProfilePosts(profileUser));
      } catch (err) {
        console.log(err); 
      }
    }
    if (posts === null || (params.username !== profileUser.username)) fetchPosts();
  }, [profileUser])

   return (
     posts && 
        <Content>
            {posts.length === 0 ? 
                  <div className={cls['no-followers']}>No posts to show</div> :
              posts.map(post => (
                <Post showContextMenu={true} post={post} owner={profileUser} key={post._id} />
              ))}
        </Content>
   ) 
}

export const VideosContent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { profileUser, videos } = useSelector(state => state.profile);
  
  useEffect(() => {
    const fetchVideos = async() => {
      try {
        dispatch(fetchProfileVideos(profileUser));
      } catch (err) {
        console.log(err); 
      }
    }
    if (videos === null || (params.username !== profileUser.username))  fetchVideos();
  }, [profileUser])

  return (
      videos && 
        <Content>
              {videos.length === 0 ?
                  <div className={cls['no-followers']}>No videos to show</div> :
                  videos.map(video => (
                    <Post post={dummyPost} owner={profileUser} key={video.src} >
                       <Video autoPlay={false} showControls={true} src={asset(video.src, 'video')} />
                    </Post>
              ))}
        </Content>
  )
}

export const StoriesContent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { profileUser, stories } = useSelector(state => state.profile);
  
  useEffect(() => {
    const fetchStories = async() => {
      try {
        dispatch(fetchProfileStories(profileUser));
      } catch (err) {
        console.log(err); 
      }
    }
   if (stories === null || (params.username !== profileUser.username))  fetchStories();
  }, [profileUser])
  
  
  return (
        stories && 
        <Content>
            {stories.length === 0 ? 
              <div className={cls['no-followers']}>No stories to show</div> :
              <div className={cls['stories']} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem'  }}>
                <StoryCard className={cls['storycard']} />
                <StoryCard className={cls['storycard']} />
                <StoryCard className={cls['storycard']} />
              </div>}
        </Content>
  )
}

export const FollowersContent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { profileUser, followers } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    const fetchFollowers = async() => {
      try {
        dispatch(fetchProfileFollowers(profileUser));
      } catch (err) {
        console.log(err); 
      }
    }
    if (followers === null || (params.username !== profileUser.username)) fetchFollowers();
  }, [profileUser])

  return (
    followers && 
    <Content>
          { followers.length === 0 ?
          <div className={cls['no-followers']}>{user._id === profileUser._id ? "No one is following you yet" : "Follow some people to show here"}</div> :
          <div className={cls['followers-container']}>
              {followers.map(person => (
                <PersonCard key={person._id} followersCount={person.followers.length} followingsCount={person.followings.length} person={person}  />
              ))}
          </div>}
    </Content>
  )
}

export const FollowingsContent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { profileUser, followings } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    const fetchFollowings = async() => {
      try {
        dispatch(fetchProfileFollowings(profileUser));
      } catch (err) {
        console.log(err); 
      }
    }
    if (followings === null || (params.username !== profileUser?.username)) fetchFollowings();
  }, [profileUser])

  return (
    followings && 
    <Content>
          { followings.length === 0 ?
          <div className={cls['no-followers']}>{user._id === profileUser._id ? "Follow some people to show here" : "This user doesn't follow anyone yet"}</div> :
          <div className={cls['followers-container']}>
              {followings.map(person => (
                <PersonCard key={person._id} followersCount={person.followers.length} followingsCount={person.followings.length} person={person}  />
              ))}
          </div>}
    </Content>
  )
}

export const FavoritesContent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { profileUser, favorites } = useSelector(state => state.profile);
  
  useEffect(() => {
    const fetchPosts = async() => {
      try {
        dispatch(fetchFavoritePosts(profileUser));
      } catch (err) {
        console.log(err); 
      }
    }
    if (favorites === null || (params.username !== profileUser.username)) fetchPosts();
  }, [profileUser])

   return (
     favorites && 
        <Content>
            {favorites.length === 0 ? 
                  <div className={cls['no-followers']}>Give posts a heart and they'll show here</div> :
              favorites.map(post => (
                <Post showContextMenu={true} post={post} owner={profileUser} key={post._id} />
              ))}
        </Content>
   ) 
}

const Profile = () => {
  return (
      <div className={cls["profile"]}>
        <ProfileHeader />
        <Outlet />
      </div>
  )
}

export default Profile