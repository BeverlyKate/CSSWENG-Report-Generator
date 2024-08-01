import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000', // Change when deploying
    credentials: 'include', // Important for cookies
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    console.log(args) // request url, method, body
    console.log(api) // signal, dispatch, getState()
    console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions);
    console.log('Base query result 1:', result);
    // If access token has expired and server responds with 403
    if (result?.error?.status === 403) {
        // console.log('Sending refresh token');
        console.log('Unauthorized, trying to refresh token');
        
        try {
            // Attempt to refresh the token
            const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

            if (refreshResult?.data) {
                // Dispatch new access token to the store
                api.dispatch(setCredentials({ accessToken: refreshResult.data.accessToken }));
                // Retry the original request with the new token
                result = await baseQuery(args, api, extraOptions);
            } else {
                if (refreshResult?.error?.status === 403) {
                    refreshResult.error.data.message = "Your login has expired.";
                }
                return refreshResult;
            }
        } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            // Handle the error (e.g., redirect to login)
        }
    }
    console.log('Base query result:', result);

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Task'],
    endpoints: builder => ({})
});
