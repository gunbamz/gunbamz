import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
        token: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { refreshToken, ...others } = action.payload;
            let resObj = {...others};
            const { accessToken, ...another } = resObj;
            state.currentUser = {...another};
            state.token = accessToken; 
            localStorage.setItem("currentUser", JSON.stringify({...another}));
          },
        logOut: (state, action) => {
            state.currentUser = null;
            state.token = null; 
            localStorage.removeItem("currentUser");
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer