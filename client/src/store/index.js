import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth";
import chatReducer from "./chat";
import profileReducer from "./profile";
import videoReducer from "./video";
import uiReducer from "./ui";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        chat: chatReducer,
        video: videoReducer,
        ui: uiReducer
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck: false
        })
    )
})

export default store;