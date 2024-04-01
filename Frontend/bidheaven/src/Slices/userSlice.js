import {createSlice} from '@reduxjs/toolkit'

const initialState={
    isLoggedIn:false,
    username:null,
};
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUsername:(state,action)=>{
            state.username=action.payload;
        },
        loginSuccess:(state,action)=>{
            state.isLoggedIn=true;
            state.username=action.payload;
        },
        logout:(state)=>{
            state.isLoggedIn=false;
            state.username=null;
        }
    }


});
export const{setUsername,loginSuccess,logout}=userSlice.actions;
export default userSlice.reducer;