import { ReactNode } from "react";

export interface match {
  info: {
    teams: Array<Team>;
    participants: Array<Participants>;
    gameCreation: number;
    gameDuration: number;
    queueId: number;
  };
}
export interface Team {
  teamId: number;
  objectives: {
    champion: {
      kills: number;
    };
  };
  teamsId: number;
}

export interface Participants {
  sightWardsBoughtInGame: ReactNode;
  totalMinionsKilled: ReactNode;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  goldEarned: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  pentaKills: number;
  quadraKills: number;
  tripleKills: number;
  damageDealtToTurrets: number;
  doubleKills: number;
  summonerName: string;
  puuid: string;
  win: boolean;
  champLevel: number;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  teamId: number;
}

export interface League {
  0: [
    {
      queueType: string;
      leagueId: string;
      tier: string;
      rank: string;
      wins: number;
      losses: number;
      leaguePoints: number;
    }
  ];
  1: [
    {
      queueType: string;
      leagueId: string;
      tier: string;
      rank: string;
      wins: number;
      losses: number;
      leaguePoints: number;
    }
  ];
}

export interface summoner {
  id: number;
  profileIconId: number;
  name: string;
  summonerLevel: number;
}

export interface rank {
  rank: string;
  summonerName: string;
  wins: number;
  losses: number;
  leaguePoints: number;
  entries: Array<rank>;
}

export interface comments {
  comment: string;
  createId: string;
  id: number;
}

export interface boards {
  option: string;
  id: number;
  user: string;
  up: number;
  title: string;
  detail: string;
}
export interface ChampionInfoType {
  0: string;
  1: {
    key: number;
    name: string;
    title: string;
    blurb: string;
  };
}

export interface RootState {
  summonerData: {
    [x: string]: any;
    rankSearchArray: string;
    startingNum: number;
  };
}

export interface mySummonerDataType {
  0: [
    {
      accountId: string;
      id: string;
      name: string;
      profileIconId: number;
      puuid: string;
      revisionDate: number;
      summonerLevel: number;
    }
  ];
}
