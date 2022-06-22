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
    setArrival: (state, action) => {
      state.arrivalMessage = action.payload;
    },
    setReceiver: (state, action) => {
       state.messages = action.payload;
    },
    setCounter: (state, action) => {
      state.senderCounter += action.payload;
   },
    setSenderMessage: (state, action) => {
       state.messages = action.payload;
    },
    setNewMessage: (state, action) => {
       state.newMessage = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const {  setCurrentChat, setArrival, setCounter, setNewMessage, setReceiver, setSenderMessage, setConversations, setOnlineUsers } = messageSlice.actions;
export default messageSlice.reducer;
