import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVideoPlaying: false,
    video: null,
    volume: 0
}

const videoSlice = createSlice({
    name: 'video',
    initialState: initialState,
    reducers: {
        setVideo: (state, action) => {
            if (state.video){
                state.video.pause();
            } 

            state.isVideoPlaying = true;
            state.video = action.payload;
            state.volume = 1;
        },
        setVideoResume: (state) => {
            state.isVideoPlaying = true;
            state.video.play();
        },
        setVideoPause: (state) => {
            state.isVideoPlaying = false;
            state.video.pause();
        },
        setVideoStop: (state) => {
            if (state.video) {
                state.video.pause();
                state.video.currentTime = 0;
            }
            state.isVideoPlaying = false;
            state.video = null; 
        },
        toggleVolume: (state) => {
            if (state.video) {
                if (state.volume > 0.4){
                    state.video.volume = 0.4;
                    state.volume = 0.4;
                } else if (state.volume > 0){
                    state.video.volume = 0;
                    state.volume = 0;
                } else {
                    state.video.volume = 1;
                    state.volume = 1;
                }
            }
        },
    }
})

export const videoActions = videoSlice.actions;

export default videoSlice.reducer;