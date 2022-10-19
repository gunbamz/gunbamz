import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({ 
  name: "message",
  initialState: {
    messages: [],
    newMessage: "",
    senderCounter: 0,
    arrivalMessage: null,
    currentChat: null,
    conversations: [],
    onlineUsers: [],
  },
  reducers: {
    arrivalMessage: (state, action) => {
      state.arrivalMessage = action.payload;
    },
    receiverMessage: (state, action) => {
       state.messages = action.payload;
    },
    senderCounter: (state, action) => {
      state.senderCounter += action.payload;
   },
    senderMessage: (state, action) => {
       state.messages = action.payload;
    },
    newMessage: (state, action) => {
       state.newMessage = action.payload;
    },
    onlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    conversations: (state, action) => {
      state.conversations = action.payload;
    },
    currentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const {  currentChat, arrivalMessage, senderCounter, newMessage, receiverMessage, senderMessage, conversations, onlineUsers } = messageSlice.actions;
export default messageSlice.reducer;
