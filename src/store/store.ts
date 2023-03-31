import { createStore } from "redux";
import { configureStore, createSlice } from '@reduxjs/toolkit';



const summonerData = createSlice({
  name: "summonerDataReducer",
  initialState:{
    data:[],
    record:[],
    gameCreate:[],
    Champ:[]

  },
  reducers:{
    LgInfo: (state:any,action) => {
      state.data.push(action.payload)
    },
    MatchInfo:(state:any,action) =>{
      state.record.push(action.payload)
    },
    Create:(state:any,action)=>{
      state.gameCreate.push(action.payload)
    },
    Champions:(state:any,action)=>{
      state.Champ.push(action.payload)
    },
    ChampionsRemove:(state:any,action)=>{
      state.Champ.shift(action.payload)
    }
  }
})



const store = configureStore({reducer:summonerData.reducer})

export const { LgInfo,MatchInfo,Create,Champions,ChampionsRemove } = summonerData.actions;

export default store;