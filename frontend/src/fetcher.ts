import axios from "axios";

export const fetchData = <TData, TVariables>(
  query: string,
  variables?: TVariables
): (() => Promise<TData>) => {
  return async () => {
    const res = await axios.post(
      `http://${process.env.BACKEND_HOST}/backend/graphql`,
      JSON.stringify({ query, variables }),
      {
        withCredentials: true,
      }
    );

    if (res.data.errors) {
      const { message } = res.data.errors[0] || "Error..";
      throw new Error(message);
    }

    return res.data.data;
  };
};
