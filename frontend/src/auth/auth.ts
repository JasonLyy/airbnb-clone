import axios, { AxiosError } from "axios";

export const initInterceptors = () => {
  const interceptor = axios.interceptors.response.use(
    async (response) => {
      // GraphQL errors return 200 response so we need to check if it returns Unauthorized in array objec
      if (
        response.data.errors &&
        response.data.errors.some((e: any) => e?.message === "unauthorized")
      ) {
        axios.interceptors.response.eject(interceptor);
        console.log("ATTEMPT REATUH");
        const result = axios
          .post(
            "http://localhost:8001/auth",
            {},
            {
              withCredentials: true,
            }
          )
          .then((v) => {
            return axios(response);
          })
          .catch((e) => {
            // Unauthorized so re-route to login page.
            return Promise.reject(e);
          })
          .finally(initInterceptors);
        return result;
      }

      return Promise.resolve(response);
    },
    (error: AxiosError) => {
      if (error.response?.status === 403) {
        axios.interceptors.response.eject(interceptor);
        const result = axios
          .post(
            "http://localhost:8001/auth",
            {},
            {
              withCredentials: true,
            }
          )
          .then((v) => {
            return axios(v);
          })
          .catch((e) => {
            console.log("REACHED HERE");
            return Promise.reject(e);
          })
          .finally(initInterceptors);
        return result;
      }

      return Promise.reject(error);
    }
  );
};
