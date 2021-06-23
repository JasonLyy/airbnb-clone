import axios, { AxiosError } from "axios";
import React, { useEffect, useMemo } from "react";
import { createContext } from "react";
import Cookies from "universal-cookie";

export const reauth = () => {
  return axios
    .create({
      baseURL: "http://localhost:8001/",
      withCredentials: true,
    })
    .post("/auth");
};

interface AppContextProps {
  isLoggedIn: boolean;
}
export const AppContext = createContext<AppContextProps>({
  isLoggedIn: false,
});

export const AuthInterceptors: React.FC = ({ children }) => {
  const initInterceptors = () => {
    const interceptor = axios.interceptors.response.use(
      async (response) => {
        // GraphQL errors return 200 response so we need to check if it returns Unauthorized in array objec
        if (
          response.data.errors &&
          response.data.errors.some((e: any) => e?.message === "unauthorized")
        ) {
          axios.interceptors.response.eject(interceptor);
          const result = reauth()
            .then(() => {
              return response;
            })
            .finally(initInterceptors);
          return result;
        }

        return Promise.resolve(response);
      },
      (error: AxiosError) => {
        if (error.response?.status === 403) {
          axios.interceptors.response.eject(interceptor);
          const result = reauth()
            .then(() => {
              return error.response;
            })
            .finally(initInterceptors);
          return result;
        }

        return Promise.reject(error);
      }
    );
  };

  useMemo(() => initInterceptors(), []);

  return <>{children}</>;
};

const isLoggedIn = (): boolean => {
  const cookies = new Cookies();
  // Date.now() is ms format whereas server returns in seconds format so we multiply by 1000 to add the ms
  return (
    parseInt(cookies.get("access_token_exp") ?? 0, 10) * 1000 >= Date.now()
  );
};
export const AppContextProvider: React.FC = ({ children }) => {
  console.log("I am re-rendering");

  const loggedIn = isLoggedIn();
  useEffect(() => {
    if (!loggedIn) {
      reauth();
    }
  }, []);

  return (
    <>
      <AppContext.Provider value={{ isLoggedIn: loggedIn }}>
        {children}
      </AppContext.Provider>
    </>
  );
};

export default AuthInterceptors;
