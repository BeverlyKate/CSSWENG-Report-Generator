import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), //to be changeed when deployed
    tagTypes: ['Note', 'User', 'Task'],
    endpoints: builder => ({})
})