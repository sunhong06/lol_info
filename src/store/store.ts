import { createStore } from "redux";
import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

// 전역 상태 관리는 대규모 애플리케이션 개발에서 필수적인 기술이며, 코드의 복잡성을 줄이고 유지보수성을 향상시키는 데 매우 유용함.

const summonerData = createSlice({
  name: "summonerDataReducer",
  initialState: {
    LeagueDataArray: [],
    recordArray: [],
    rankDataArray: [],
    ChampArray: [],
    summonerDataArray: [],
    communitySearchArray: [],
    rankSearchArray: "",
    startingNum: 0,
    userObjArray: [],
    summonerNull: "",
  },
  reducers: {
    CountingNum: (state: any, action) => {
      state.startingNum = action.payload;
    },
    RankSearch: (state, action) => {
      state.rankSearchArray = action.payload;
    },
    RankReset: (state: any) => {
      state.rankDataArray = [];
    },
    RankDatas: (state: any, action) => {
      state.rankDataArray.push(action.payload);
    },
    CommunityClearSearched: (state) => {
      state.communitySearchArray = [];
    },
    CommunitySearched: (state: any, action) => {
      state.communitySearchArray.push(action.payload);
    },
    summoner: (state: any, action) => {
      state.summonerDataArray.push(action.payload);
    },
    summonerInfoNull: (state: any, action) => {
      state.summonerNull = action.payload;
    },
    MatchInfo: (state: any, action) => {
      state.recordArray.push(action.payload);
    },
    MatchData: (state: any, action) => {
      state.recordArray.push(action.payload);
    },
    LeagueData: (state: any, action) => {
      state.LeagueDataArray.push(action.payload);
    },
    ChampionData: (state: any, action) => {
      state.ChampArray.push(action.payload);
    },
    ChampionsRemove: (state: any, action) => {
      state.ChampArray.shift(action.payload);
    },
    ResetComponent: (state: any) => {
      state.LeagueDataArray = [];
      state.summonerDataArray = [];
      state.recordArray = [];
    },
  },
});

// thunk 쓰는이유 : 비동기 로직이 UI(react component) useEffect안에 많이 포함되어 있으면 UI layer와 관심사가 다른 역할을 한다.고 나와 있다.
// 그래서 비동기 로직을 action creator로 옮기면서 생기는 장점은 테스트의 용이점과 component 재사용성을 높인다는 이유로 사용한다고 함

const store = configureStore({
  reducer: {
    summonerData: summonerData.reducer,
  },
});

export const {
  CountingNum,
  RankSearch,
  MatchInfo,
  MatchData,
  RankDatas,
  ChampionData,
  ChampionsRemove,
  summoner,
  LeagueData,
  CommunitySearched,
} = summonerData.actions;

export default store;
