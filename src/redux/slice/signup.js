import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const data = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const signupUserSlice = createSlice({
  name: "signup",
  initialState: data,
  reducers: {
    signupSlice(state) {
      state.isLoading = true;
    },
    signupSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = null;
    },
    signupSliceFailure(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    signupSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const signupUserHandler = (data) => async (dispatch) => {
  try {
    dispatch(signupUserAction.signupSlice());
    const response = (await axios({
        method: "post",
        url: 'http://localhost:3000/user/register',
        data: data,
    })).data
    dispatch(signupUserAction.signupSliceSuccess(response));
  } catch (e) {
    dispatch(signupUserAction.signupSliceFailure(e?.response?.data));
  }
};
export default signupUserSlice.reducer;
export const signupUserAction = signupUserSlice.actions;
