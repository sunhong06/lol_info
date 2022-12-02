import axios from "axios";

export const lolAxios = axios.create({
  baseURL: "https://kr.api.riotgames.com/lol/",
  params:{
    api_key: "RGAPI-297bf12e-0f20-4d93-a74e-a0f44dc8d002"
  }
});

export const asiaLolAxios = axios.create({
  baseURL: "https://asia.api.riotgames.com/lol/",
  params:{
    api_key: "RGAPI-297bf12e-0f20-4d93-a74e-a0f44dc8d002"
  }
});







