import {
   USER_LOGIN_REQUEST,
   USER_REGISTER_REQUEST,
   ADD_PHONE_REQUEST,
   VERIFY_CODE_REQUEST,
   RESEND_EMAIL_REQUEST,
   VERIFY_ACCOUNT_REQUEST,
   DELETE_USER_REQUEST,
   GET_USER_PROFILE_REQUEST,
   FORGOT_PASSWORD_REQUEST,
   RESET_PASSWORD_REQUEST,
   LOGOUT_REQUEST,
   TOGGLE_MOBILE_MENU,
   RESET_FLAGS,
} from "../reducers/AuthReducer";


export const login = payload => ({
   type: USER_LOGIN_REQUEST,
   payload
});

export const register = payload => ({
   type: USER_REGISTER_REQUEST,
   payload
});

export const addPhone = payload => ({
   type: ADD_PHONE_REQUEST,
   payload
});

export const verifyCode = payload => ({
   type: VERIFY_CODE_REQUEST,
   payload
});

export const resendEmail = payload => ({
   type: RESEND_EMAIL_REQUEST,
   payload
});

export const verifyAccount = (payload) => ({
   type: VERIFY_ACCOUNT_REQUEST,
   payload,
});

export const deleteUser = payload => ({
   type: DELETE_USER_REQUEST,
   payload
});

export const getUserProfile = () => ({
   type: GET_USER_PROFILE_REQUEST,
});

export const forgotPassword = (payload) => ({
   type: FORGOT_PASSWORD_REQUEST,
   payload,
});

export const resetPassword = (payload) => ({
   type: RESET_PASSWORD_REQUEST,
   payload,
});

export const logout = () => ({
   type: LOGOUT_REQUEST,
});

export const toggleMobileMenu = () => ({
   type: TOGGLE_MOBILE_MENU,
});

export const resetFlags = () => ({
   type: RESET_FLAGS
});

