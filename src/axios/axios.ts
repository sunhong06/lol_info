import axios from "axios";

export const lolAxios = axios.create({
  baseURL: "https://kr.api.riotgames.com/lol/",
  params: {
    api_key: process.env.REACT_APP_RIOT_LOL_API_KEY,
  },
});

export const asiaLolAxios = axios.create({
  baseURL: "https://asia.api.riotgames.com/lol/",

  params: {
    api_key: process.env.REACT_APP_RIOT_LOL_API_KEY,
  },
});
