// Need to use the React-specific entry point to import createApi
import { FullTagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Pokemon } from './types'
interface Post {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
// Define a service using a base URL and expected endpoints
export const TodoRtkApi = createApi({
  reducerPath: "TodoRTKApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["TodoRTKApi"],
  endpoints: (builder) => ({
    getTodoRtk: builder.query<any, any>({
      query: () => `/todos`,
      providesTags: ["TodoRTKApi"],
      // transformResponse: (res: any) =>
      //   res.filter((el: any) => el.completed === false),
    }),

    addTodoRtk: builder.mutation<any, any>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["TodoRTKApi"],
    }),
    deleteTodoRtk: builder.mutation<any, any>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TodoRTKApi"],
    }),
    updateTodoRtk: builder.mutation<any, any>({
      query: ({ id, newItem }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: newItem,
      }),
      invalidatesTags: ["TodoRTKApi"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTodoRtkQuery,
  useAddTodoRtkMutation,
  useDeleteTodoRtkMutation,
  useUpdateTodoRtkMutation,
} = TodoRtkApi;
