import { createStore } from "redux";
import { configureStore, createSlice } from '@reduxjs/toolkit';



const summonerData = createSlice({
  name: "summonerDataReducer",
  initialState:{
    data:[],
    record:[],
    gameCreate:[]
  },
  reducers:{
    LgInfo: (state:any,action) => {
      state.data.push({smrData:action.payload})
    },
    MatchInfo:(state:any,action) =>{
      state.record.push({matchs:action.payload})
    },
    Create:(state:any,action)=>{
      state.gameCreate.push(action.payload)
    }
  }
})



const store = configureStore({reducer:summonerData.reducer})

export const { LgInfo,MatchInfo,Create } = summonerData.actions;

export default store;