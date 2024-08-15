import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const TodoApi = createApi({
  reducerPath: 'TodoApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_ENDPOINT}` }),
  endpoints: (builder) => ({
    getSingleList: builder.query({
      query: (id) => ({
        url : `/get/${id}`,
        method : "GET",
      }),
      providesTags : ["TodoApi"]
    }),
    getAllTodo: builder.query({
      query: (page) => ({
        url : `/getall?page=${page}`,
        method : "GET",
      }),
      providesTags : ["TodoApi"]
    }),
    createTodo: builder.mutation({
        query: (user) => ({
          url : `/createTodo`,
          method : "POST",
          body : user
        }),
        invalidatesTags : ["TodoApi"]
      }),
      updateTodo: builder.mutation({
        query: ({id,title}) => ({
          url : `/updateTodo/${id}`,
          method : "PATCH",
          body : {title}
        }),
        invalidatesTags : ["TodoApi"]
      }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url : `/deleteTodo/${id}`,
        method : "DELETE"
      }),
      invalidatesTags : ["TodoApi"]
    }),
  }),
})

export const { useGetSingleListQuery,useGetAllTodoQuery,useCreateTodoMutation,useUpdateTodoMutation,useDeleteTodoMutation } = TodoApi