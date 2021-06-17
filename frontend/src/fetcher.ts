import axios from "axios";

export const fetchData = <TData, TVariables>(
  query: string,
  variables?: TVariables
): (() => Promise<TData>) => {
  return async () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const res = await axios
      .post(
        "http://localhost:8001/graphql",
        JSON.stringify({ query, variables }),
        {
          withCredentials: true,
        }
      )
      .catch((e) => {
        throw new Error(e);
      });

    return res.data.data;
  };
};
