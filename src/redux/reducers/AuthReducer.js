export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_ERROR = "USER_REGISTER_ERROR";
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
export const ADD_PHONE_REQUEST = "ADD_PHONE_REQUEST";
export const ADD_PHONE_SUCCESS = "ADD_PHONE_SUCCESS";
export const ADD_PHONE_ERROR = "ADD_PHONE_ERROR";
export const VERIFY_CODE_REQUEST = "VERIFY_CODE_REQUEST";
export const VERIFY_CODE_SUCCESS = "VERIFY_CODE_SUCCESS";
export const VERIFY_CODE_ERROR = "VERIFY_CODE_ERROR";
export const RESEND_EMAIL_REQUEST = "RESEND_EMAIL_REQUEST";
export const RESEND_EMAIL_SUCCESS = "RESEND_EMAIL_SUCCESS";
export const RESEND_EMAIL_ERROR = "RESEND_EMAIL_ERROR";
export const VERIFY_ACCOUNT_REQUEST = "VERIFY_ACCOUNT_REQUEST";
export const VERIFY_ACCOUNT_SUCCESS = "VERIFY_ACCOUNT_SUCCESS";
export const VERIFY_ACCOUNT_ERROR = "VERIFY_ACCOUNT_ERROR";
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_ERROR = "DELETE_USER_ERROR";
export const GET_USER_PROFILE_REQUEST = "GET_USER_PROFILE_REQUEST";
export const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS";
export const GET_USER_PROFILE_ERROR = "GET_USER_PROFILE_ERROR";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const TOGGLE_MOBILE_MENU = "TOGGLE_MOBILE_MENU";
export const RESET_FLAGS = "RESET_FLAGS";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("BrandName_user");
  return user && JSON.parse(user);
};

const initialState = {
  user: getUserFromLocalStorage(),
  showMobileMenu: false,
  errors: {
    login: null,
    register: null,
    addPhone: null,
    verifyCode: null,
    resendEmail: null,
    verifyAccount: null,
    deleteUser: null,
    getUserProfile: null,
    forgotPassword: null,
    resetPassword: null,
    logout: null,
  },
  flags: {
    loginSuccess: false,
    registerSuccess: false,
    addPhoneSuccess: false,
    verifyCodeSuccess: false,
    resendEmailSuccess: false,
    verifyAccountSuccess: false,
    deleteUserSuccess: false,
    getUserProfileSuccess: false,
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false,
    logoutSuccess: false,
  },
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return { ...state, flags: { registerSuccess: true }, user: action.user };
    case USER_REGISTER_ERROR:
      return { ...state, errors: { register: action.error } };
    case USER_LOGIN_SUCCESS:
      return { ...state, user: action.user, flags: { loginSuccess: true } };
    case USER_LOGIN_ERROR:
      return { ...state, errors: { login: action.error } };
    case ADD_PHONE_SUCCESS:
      return {
        ...state,
        flags: { addPhoneSuccess: true },
        user: { ...state.user, phone_number: action.phone },
      };
    case ADD_PHONE_ERROR:
      return { ...state, errors: { addPhone: action.error } };
    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        flags: { verifyCodeSuccess: true, user: action.user },
      };
    case VERIFY_CODE_ERROR:
      return { ...state, errors: { verifyCode: action.error } };
    case RESEND_EMAIL_SUCCESS:
      return { ...state, flags: { resendEmailSuccess: true } };
    case RESEND_EMAIL_ERROR:
      return { ...state, errors: { resendEmail: action.error } };
    case VERIFY_ACCOUNT_SUCCESS:
      return { ...state, flags: { verifyAccountSuccess: true } };
    case VERIFY_ACCOUNT_ERROR:
      return { ...state, errors: { verifyAccount: action.error } };
    case DELETE_USER_SUCCESS:
      return { ...state, flags: { deleteUserSuccess: true } };
    case DELETE_USER_ERROR:
      return { ...state, errors: { deleteUser: action.error } };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
        flags: { getUserProfileSuccess: true },
      };
    case GET_USER_PROFILE_ERROR:
      return { ...state, errors: { getUserProfile: action.error } };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, flags: { forgotPasswordSuccess: true } };
    case FORGOT_PASSWORD_ERROR:
      return { ...state, errors: { forgotPassword: action.error } };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, flags: { resetPasswordSuccess: true } };
    case RESET_PASSWORD_ERROR:
      return { ...state, errors: { resetPassword: action.error } };
    case LOGOUT_SUCCESS:
      return { ...state, flags: { logoutSuccess: true } };
    case LOGOUT_ERROR:
      return { ...state, errors: { logout: action.error } };
    case TOGGLE_MOBILE_MENU:
      return {
        ...state,
        TOGGLE_MOBILE_MENU,
        showMobileMenu: !state.showMobileMenu,
      };
    case RESET_FLAGS:
      return {
        ...state,
        errors: initialState.errors,
        flags: initialState.flags,
      };
    default:
      return state;
  }
};
