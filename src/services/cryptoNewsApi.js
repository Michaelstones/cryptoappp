import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  "X-RapidAPI-Key": "798fa0f23fmsh4fb4dfd1b5fb975p1b1925jsn7d1329878a16",
};
const baseUrl = "https://bing-news-search1.p.rapidapi.com";
const createApiRequest = (url) => ({ url, headers: cryptoHeaders });
export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptosNewsApi: builder.query({
      query: ({ newsCat, count }) =>
        createApiRequest(
          `/news/search?q=${newsCat}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptosNewsApiQuery } = cryptoNewsApi;
