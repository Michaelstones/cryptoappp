import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import axios from "axios";

const headersApi = {
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  "X-RapidAPI-Key": "798fa0f23fmsh4fb4dfd1b5fb975p1b1925jsn7d1329878a16",
};
const baseUrl = "https://coinranking1.p.rapidapi.com";

const createApiRequest = (url) => ({ url, headers: headersApi });
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createApiRequest(`/coins?limit=${count}`),
    }),
    getDetails: builder.query({
      query: (coinId) => createApiRequest(`/coin/${coinId}`),
    }),
    getHistory: builder.query({
      query: ({ coinId, times }) =>
        createApiRequest(`coin/${coinId}/history?timeperiod=${times}`),
    }),
    getExchanges: builder.query({
      query: () => createApiRequest("/exchanges"),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetDetailsQuery,
  useGetHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
