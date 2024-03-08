import axios from "axios";
import React, { useState } from "react";
import { lolAxios } from "../../axios/axios";

function useChampion() {
  const [champs, setChamps] = useState([]);
  const [rotation, setRotation] = useState([]);
  const [detail, setDetail] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getChampLists = async () => {
    await axios
      .get(
        "https://ddragon.leagueoflegends.com/cdn/13.3.1/data/ko_KR/champion.json"
      )
      .then((res) => {
        setChamps(res.data.data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getRotations = async () => {
    await lolAxios
      .get(`platform/v3/champion-rotations`)
      .then((res) => {
        setRotation(res.data.freeChampionIds);
      })
      .catch((error) => {
        console.log(error);
      });
    getChampLists();
  };
  return {
    getRotations,
    getChampLists,
    setDetail,
    rotation,
    champs,
    detail,
    setSearch,
    search,
    isLoading,
    setIsLoading,
  };
}

export default useChampion;
