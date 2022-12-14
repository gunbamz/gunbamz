import { apiSlice } from "../../redux/apiSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        sendMessage: builder.mutation({
            query: msg => ({
                url: '/messages',
                method: 'POST',
                body: { ...msg }
            })
        }),
        createConversation: builder.mutation({
            query: data => ({
                url: '/conversations',
                method: 'POST',
                body: data,
            })
        }),
        getConversations: builder.mutation({
            query: id => ({
                url: `/conversations/${id}`,
                method: 'GET',
            })
        }),
        getTwoConversation: builder.mutation({
            query: param => ({
                url: `/conversations/find/${param}`,
                method: 'GET',
            })
        }),
        getMessages: builder.mutation({
            query: param => ({
                url: `/messages/${param}`,
                method: 'GET',
            })
        }),
    })
})

export const {
    useSendMessageMutation,
    useCreateConversationMutation,
    useGetConversationsMutation,
    useGetTwoConversationMutation,
    useGetMessagesMutation
} = messageApiSlice;