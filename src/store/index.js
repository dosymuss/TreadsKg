import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import treadsReducer from "./treadsSlice"
import activityReducer from "./activitySlice"

export default configureStore({
    reducer:{
        user:userReducer,
        tread:treadsReducer,
        activity:activityReducer
    }
})