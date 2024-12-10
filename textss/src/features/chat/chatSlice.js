import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    userData: null,
    chatData: null,
    messagesId: null,
    messages: [],
    chatUser: null,
    error: null,
    chatVisible: false
}

export const  chatSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        loadUserDataSuccess: (state,action) => {
            state.userData = action.payload;
        },
        loadDataFail: (state,action) => {
            state.error = action.payload;
        },
        loadChatDataSuccess: (state, action) => {
            state.chatData = action.payload;
        },
        loadMessagesId: (state, action) => {
            state.messagesId = action.payload;
        },
        loadMessages: (state, action) => {
            state.messages = action.payload;
        },
        loadChatUser: (state, action) => {
            state.chatUser = action.payload;
        },
        setChatVisible: (state, action) => {
            state.chatVisible = action.payload;
        }
    }
});




export const {loadUserDataSuccess, loadDataFail,  loadChatDataSuccess, loadChatUser, loadMessages, loadMessagesId, setChatVisible} = chatSlice.actions;

export default chatSlice.reducer;