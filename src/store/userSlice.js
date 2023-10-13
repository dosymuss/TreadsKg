import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getMyProfile, getFollowers } from "../api/profile"
import ava from "../img/profile/initialAva.svg"

export const profInfo = createAsyncThunk(
    "user/profInfo",
    async (_, { dispatch }) => {
        try {
            const res = await getMyProfile();
            dispatch(setUser(res.data));
            localStorage.setItem("pk", res.data.pk)
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

export const showFollow = createAsyncThunk(
    "user/showFollow",
    async (id, { dispatch }) => {
        try {
            const res = await getFollowers(localStorage.getItem("pk"))
            if (res) {
                dispatch(showFollowers(res.data.count))
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)




// export const profUpdate = createAsyncThunk(
//     "user/profUpdate",
//     async ()=>{

//     }
// )


const userSlice = createSlice({
    name: "user",
    initialState: {
        photo: ava,
        username: "",
        private: false,
        bio: "",
        link: ""
    },
    reducers: {
        setUser(state, action) {
            return { ...state, ...action.payload }
        },
        addPhoto(state, action) {
            return { ...state, photo: action.payload }
        },
        showFollowers(state, action) {
            return { ...state, follow: action.payload }
        }

    }
    ,
    extraReducers: {

    }
})

export const { setUser, showFollowers } = userSlice.actions
export default userSlice.reducer