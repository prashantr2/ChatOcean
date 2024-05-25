import React from 'react'
import cls from "./CreatePost.module.css";
import CreateIcon from '@mui/icons-material/Create';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { MoreHoriz } from '@mui/icons-material';
import { asset, addToFilesList, validateFileSizes, PHOTO_SIZE_LIMIT, VIDEO_SIZE_LIMIT, validateFileExtensions,
        backendURL, PHOTO_ACCEPTABLE_EXTENSIONS, VIDEO_ACCEPTABLE_EXTENSIONS } from "../../constants/constants";
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import PostCarousel from './PostCarousel';
import Photo from '../Photos/Photo';
import Video from '../Videos/Video';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import { CircularProgress } from '@mui/material';

const CreatePost = () => {
   const { user } = useSelector(state => state.auth); 
    const [photosCount, setPhotosCount] = useState(0);
    const [videosCount, setVideosCount] = useState(0);
    const [quotesCount, setQuotesCount] = useState(0);
    const [error, setError] = useState('');
    const [files, setFiles] = useState([]);
    const [sendingPost, setSendingPost] = useState(false);
    
    const photoRef = useRef();
    const videoRef = useRef();
    const quoteRef = useRef();
    const descRef = useRef();
    

    const photoFilePickerHandler = () => {
        const [newCounts, allFiles] = addToFilesList(files, photoRef.current.files, 'photo');
        if (!validateFileExtensions(photoRef.current.files, 'photo')){
            return setError("Invalid File Extension! Only " + PHOTO_ACCEPTABLE_EXTENSIONS + " are accepted");
        }
        if (!validateFileSizes(photoRef.current.files, 'photo')){
            return setError("Maximum photo size is " + PHOTO_SIZE_LIMIT + "MB")
        }
        setError('');
        setFiles(allFiles);
        setPhotosCount((oldCount) => oldCount + newCounts);
        photoRef.current.value = "";
    }

    const videoFilePickerHandler = () => {
        const [newCounts, allFiles] = addToFilesList(files, videoRef.current.files, 'video');
        if (!validateFileExtensions(videoRef.current.files, 'video')){
            return setError("Invalid File Extension! Only " + VIDEO_ACCEPTABLE_EXTENSIONS + " are accepted");
        }
        if (!validateFileSizes(videoRef.current.files, 'video')){
            return setError("Maximum video size is " + VIDEO_SIZE_LIMIT + "MB")
        }
        setError('');
        setFiles(allFiles);
        setVideosCount((oldCount) => oldCount + newCounts);
        videoRef.current.value = "";
    }
    
    const createPostHandler = async() => {
        if (files.length === 0 || sendingPost) return;
        setSendingPost(true); 

        let formData = new FormData();
        for (let i = 0; i < files.length; i++){
            formData.append('post_upload', files[i].file); 
        }
        formData.append('type', JSON.stringify(files.map(f => f.type)));
        formData.append('desc', descRef.current.value);
        formData.append('userId', user._id);

        try {
            await axios.post('/post/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPhotosCount(0);
            setVideosCount(0);
            setFiles([]);
            window.open('/', '_self');
        } catch (err) {
            console.log(err); 
        } finally {
            setSendingPost(false);
        }
    }
    
    const deletePostItemHandler = (idx) => {
        if (files[idx].type === 'photo') setPhotosCount((prevCount) => prevCount - 1);
        else if (files[idx].type === 'video') setVideosCount((prevCount) => prevCount - 1);
        setFiles((oldFiles) => oldFiles.filter((f, i) => i !== idx));
    }

  return (
      <div className={cls["create-post"] + " card-shadow"}>
        <div className={cls["create-post-title"]} >
            <div className={cls["create-post-icon"]} >
                <CreateIcon sx={{ fontSize: "25px" }} />
            </div>
            <span className={cls["create-post-title-text"]} >Create Post</span>
            <button onClick={createPostHandler} className={cls["submit-btn"] + ' ' + ((files.length === 0) && cls['disabled-submit-btn'])}>
                {sendingPost ? <CircularProgress color='inherit' size={"2rem"} /> : "Create"}                 
                {/* Create */}
            </button>
        </div>
        <div className={cls['create-post-descbox']}>
            <textarea ref={descRef} placeholder={`What's on your mind ${user.username}?`} className={cls['create-post-input']} />
            <img src={asset(user.avatar, 'profile')} className={cls['create-post-user-img']} />
        </div>
        <div className={cls['create-post-options']}>
            <label htmlFor="photo" className={cls['option'] + ' ' + (photosCount && cls['photo-active'])}>
               <InsertPhotoIcon sx={{fontSize: "25px", color: "green"}} /> 
                <span className={cls['option-text']}>Photo</span>
                {photosCount > 0 && <span className={cls['option-count']}>{photosCount}</span>}
                <input ref={photoRef} type="file" accept=".jpg,.jpeg,.png,.gif" onChange={photoFilePickerHandler} multiple style={{display: 'none'}} id="photo" />
            </label>
            <label htmlFor="video" className={cls['option'] + ' ' + (videosCount && cls['video-active'])}>
               <VideoCameraBackIcon sx={{fontSize: "25px", color: "red"}} /> 
                <span className={cls['option-text']}>Video</span>
                {videosCount > 0 && <span className={cls['option-count']}>{videosCount}</span>}
                <input ref={videoRef} type="file" accept=".mp4,.flv,.wmv" multiple onChange={videoFilePickerHandler} style={{display: 'none'}} id="video" />
            </label>
            <label htmlFor="quote" className={cls['option'] + ' ' + (quotesCount && cls['quote-active'])}>
               <FormatQuoteIcon sx={{fontSize: "25px", color: "orange"}} /> 
                <span className={cls['option-text']}>Quote</span>
            </label>
            <div className={cls['more-option']}>
                <MoreHoriz sx={{fontSize: "25px"}} />
            </div>
        </div>
        {error && <span className={cls['upload-error']}>{error}</span>}
        {files !== [] && <PostCarousel className={cls['preview-post']} >
            {files.map((item, idx) => (
              <div className={cls['preview-item']}>
                {(item.type === 'photo') && <Photo key={item.file.name} src={URL.createObjectURL(item.file)}  />} 
                {(item.type === 'video') && <Video key={item.file.name} muteOnClick={true} autoPlay={true} src={URL.createObjectURL(item.file)}  />} 
                <span onClick={() => deletePostItemHandler(idx)} className={cls["post-cancel-btn"]}><CancelIcon style={{fontSize: '100%'}} /></span>
              </div>
            ))}
            </PostCarousel>}
      </div>
  )
}

export default CreatePost