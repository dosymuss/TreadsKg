import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getPost, postTreads,getPostForYou, getPostForFollowing } from "../api/post";

export const newTread = createAsyncThunk(
  "tread/newTread",
  async (object) => {
    postTreads(object)
      .then((res) => { console.log(res) })
      .catch((error) => { console.log(error) })
  }
)
export const getTreads = createAsyncThunk(
  "tread/getTreads",
  async (_, { dispatch }) => {
    try {
      const res = await getPost();
      dispatch(getAllTreads(res.data.results))
    } catch (error) {
      console.log(error);
    }
  }
);
export const getTreadsForYou = createAsyncThunk(
  "tread/getTreadsForYou",
  async (_, { dispatch }) => {
    try {
      const res = await getPostForYou();
      console.log(res)
      dispatch(getAllTreads(res.data.results))
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTreadsForFollowing = createAsyncThunk(
  "tread/getTreadsForFollowing",
  async (_, { dispatch }) => {
    try {
      const res = await getPostForFollowing();
      console.log(res)
      dispatch(getAllTreads(res.data.results))
    } catch (error) {
      console.log(error);
    }
  }
);



const treadsSlice = createSlice({
  name: "tread",
  initialState: [],
  reducers: {
    addTreads(state, action) {
      return [...state, action.payload];
    },
    getAllTreads(state, action) {
      return action.payload;
    }
  },
});

const { reducer: treadReducer } = treadsSlice;

export const findTreads = (state, action) => {
  const { id } = action.payload;
  return state.find(item => item.id === id);
};


export const { addTreads, getAllTreads } = treadsSlice.actions
export default treadsSlice.reducer