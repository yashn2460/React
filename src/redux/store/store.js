import {configureStore} from "@reduxjs/toolkit"
import signup from "../slice/signup";
import login from "../slice/login";

const store = configureStore({
    reducer:{
        userSignup:signup,
        userLogin:login
    }
});

export default store;