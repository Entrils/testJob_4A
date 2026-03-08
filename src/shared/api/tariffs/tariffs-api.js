import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tariffsApi = createApi({
  reducerPath: "tariffsApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    getTariffs: builder.query({
      query: () => ({
        url: "/api/tariffs",
        method: "GET",
        cache: "no-store"
      }),
      transformResponse: (response) => {
        return Array.isArray(response) ? response : [];
      }
    })
  })
});

export const { useGetTariffsQuery } = tariffsApi;
