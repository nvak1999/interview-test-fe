import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  post: [],
  errors: null,
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.errors = action.payload;
    },
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.post = action.payload;
    },
    postNewSuccess(state, action) {
      state.isLoading = false;
    },
  },
});

export const getPost = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/posts`);
    dispatch(slice.actions.getPostSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const postNew = (formData) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post(`/posts`, formData);
    dispatch(slice.actions.postNewSuccess(response.data));
    toast.success("Post created successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error("Failed to create post: " + error.message);
  }
};

export default slice.reducer;
