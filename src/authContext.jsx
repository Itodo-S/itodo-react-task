import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";
// import "jwt-decode";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      return {
        user: action.payload,
        ...action.payload,
        ...state,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, setState] = React.useState({});
  const login = (action) => {
    setState({
      user: action.payload,
      ...action.payload,
      ...state,
    });
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    // console.log(role);
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = new Date().getTime() / 1000;
      if (decodedToken.exp > currentTime) {
        login({
          payload: {
            user: decodedToken,
            token: token,
            role,
            isAuthenticated: true,
          },
        });
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
