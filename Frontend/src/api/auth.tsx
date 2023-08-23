import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface AuthSignup {
    username: string;
    email: string;
    password: string;
    confirmPassword: string
}
interface AuthSignin {
    email: string;
    password: string;
}
interface ApiResponse {
  message: string;
  accessToken: string;
  user: any; // Bạn có thể định nghĩa kiểu cho đối tượng user tại đây
}

const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:8080',
    }),
    endpoints: (builder) => ({
        signup: builder.mutation<ApiResponse, AuthSignup>({
            query: (credentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        signin: builder.mutation<ApiResponse, AuthSignin>({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credentials,
            }),
        }),
        getAllUser: builder.query<ApiResponse, void>({
            query: () => '/auth/users', // Modify the URL pattern for getting all users
        }),
        getUser: builder.query<ApiResponse, number>({
            query: (id) => `/auth/users/${id}`, // Modify the URL pattern as needed
        }),
        removeUser: builder.mutation<ApiResponse, number>({
            query: (id) => ({
                url: `/auth/users/${id}`,
                method: 'DELETE',
            }),
        }),
        
    }),
});
export const { useSignupMutation, 
               useSigninMutation,
               useGetAllUserQuery,
               useGetUserQuery, 
               useRemoveUserMutation,  
               } = authApi;

export default authApi;