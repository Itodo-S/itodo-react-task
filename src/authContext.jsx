import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";

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
      window.location.href = "/admin/login";
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

export const AuthContext = React.createContext(initialState);

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, setState] = React.useState({});
  const [logout, setLogout] = useReducer(reducer, initialState);

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
        setLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
