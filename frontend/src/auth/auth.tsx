import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import Cookies from "universal-cookie";

export const reauth = (): Promise<AxiosResponse<unknown>> => {
  return axios
    .create({
      baseURL: `http://${process.env.BACKEND_HOST}/backend`,
      withCredentials: true,
    })
    .post("/auth");
};

interface AppContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (l: boolean) => void;
}
export const AppContext = createContext<AppContextProps>({
  isLoggedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoggedIn: () => {},
});

export const AuthInterceptors: React.FC = ({ children }) => {
  const { setIsLoggedIn } = useContext(AppContext);

  const initInterceptors = () => {
    const interceptor = axios.interceptors.response.use(
      async (response) => {
        // GraphQL errors return 200 response so we need to check if it returns Unauthorized in array objec
        if (
          response.data.errors &&
          response.data.errors.some(
            (e: Error) => e.message && e?.message === "unauthorized"
          )
        ) {
          axios.interceptors.response.eject(interceptor);
          const result = reauth()
            .then(() => {
              setIsLoggedIn(true);
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
              setIsLoggedIn(true);
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

const hasAuthCookie = (): boolean => {
  const cookies = new Cookies();
  // Date.now() is ms format whereas server returns in seconds format so we multiply by 1000 to add the ms
  return (
    parseInt(cookies.get("access_token_exp") ?? 0, 10) * 1000 >= Date.now()
  );
};
export const AppContextProvider: React.FC = ({ children }) => {
  const [loggedIn, updateIsloggedIn] = useState<boolean>(hasAuthCookie());

  useEffect(() => {
    if (!loggedIn) {
      reauth().then(() => updateIsloggedIn(true));
    }
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          isLoggedIn: loggedIn,
          setIsLoggedIn: (l: boolean) => updateIsloggedIn(l),
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

export default AuthInterceptors;
