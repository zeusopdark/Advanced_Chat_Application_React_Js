import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features";
import { New_Message_Alert } from "../../constants/event";

const initialState = {
notificationCount:0,
newMessageAlert:getOrSaveFromStorage({key:New_Message_Alert,get:true})||[{
  chatId:"",
  count:0
}]
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
incrementNotification:(state)=>{
    state.notificationCount=state.notificationCount+1
},
resetNotificationCount:(state)=>{
    state.notificationCount=0;
},
setNewMessagesALert:(state,action)=>{
  const index=state.newMessageAlert.findIndex(item=>item.chatId=action.payload.chatId)
  if(index===-1){
    state.newMessageAlert.push({chatId:action.payload.chatId,count:1})
  }
  else{
    state.newMessageAlert[index].count+=1;
  }
},
removeNewMessagesAlert:(state,action)=>{
  state.newMessageAlert=state.newMessageAlert.filter(item=>item.chatId!==action.payload)
}
  },
});
export const {
incrementNotification,
resetNotificationCount,
setNewMessagesALert,
removeNewMessagesAlert
} = chatSlice.actions;
export default chatSlice;
