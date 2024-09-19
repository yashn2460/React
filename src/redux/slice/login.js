import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const data = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const loginUserSlice = createSlice({
  name: "login",
  initialState: data,
  reducers: {
    loginSlice(state) {
      state.isLoading = true;
    },
    loginSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = null;
    },
    loginSliceFailure(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    loginSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const loginUserHandler = (data) => async (dispatch) => {
  try {
    dispatch(loginUserAction.loginSlice());
    const response = (await axios({
        method: "post",
        url: 'http://localhost:3000/user/login',
        data: data,
    })).data
    dispatch(loginUserAction.loginSliceSuccess(response));
  } catch (e) {
    dispatch(loginUserAction.loginSliceFailure(e?.response?.data));
  }
};
export default loginUserSlice.reducer;
export const loginUserAction = loginUserSlice.actions;
