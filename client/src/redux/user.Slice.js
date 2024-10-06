import { createSlice } from "@reduxjs/toolkit";
const initialState =
{
    user:null,
    userMessage:'',
}
export const userSlice=createSlice(
    {
       name:'userdetail' ,
       initialState,
       reducers:
       {
           setUser: function(state, action)
           {

               state.user=action.payload.r
               
               state.userMessage=action.payload.message
           }
       }
    }
)
export const{setUser}=userSlice.actions;
export default userSlice.reducer