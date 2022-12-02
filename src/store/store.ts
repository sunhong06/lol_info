import { createStore } from "redux";
import { configureStore, createSlice } from '@reduxjs/toolkit';



const summonerData = createSlice({
  name: "summonerDataReducer",
  initialState:{
    data:[],
    record:[]
  },
  reducers:{
    LgInfo: (state:any,action) => {
      state.data.push({smrData:action.payload})
    },
    MatchInfo:(state:any,action) =>{
      state.record.push({matchs:action.payload})
    }
  }
})



const store = configureStore({reducer:summonerData.reducer})

export const { LgInfo,MatchInfo } = summonerData.actions;

export default store;