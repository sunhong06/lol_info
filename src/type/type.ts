import { queries } from '@testing-library/react'

export interface summoner{
    id:string,
    name:string,
    profileIconId:number,
    summonerLevel:number
    accountId:string,
    revisionDate:number, 
    puuid: string
  }

export interface propsType {
  search: string
}

export interface summonerLeague{
  leagueId:string,
  queueType:string,
  tier:string,
  rank:string,
  summonerId:string,
  summonerName:string,
  leaguePoints:number,
  wins:number,
  losses:number,
  veteran:boolean,
  inactive:boolean,
  freshBlood:boolean,
  hotStreak:boolean
}

export interface championLevel {
  championId: number,
  championLevel: number,
  championPoints: number,
  lastPlayTime: number,
  championPointsSinceLastLevel: number,
  championPointsUntilNextLevel: number,
  chestGranted: boolean,
  tokensEarned: number,
  summonerId: string
}

export interface champion{
  name: string;
}

export interface match{
  gameDuration: number,
  win: boolean,
  lose: boolean;
  name: string,
  championName:string,
  champLevel:number,
  summonerName:string,
  spell1Casts:number,
  deaths:number,
  kills:number,
  assists:number,
  item0:number,
  item1:number,
  item2:number,
  item3:number,
  item4:number,
  item5:number,
  item6:number,
  doubleKills:number,
  tripleKills:number,
  quadraKills:number,
  pentaKills:number,
  gameId:number,
  wardsPlaced:number,
  teamId:number,
  totalMinionsKilled:number,
  info:any,
}

export interface Iprops{
  setMacthInfo: any;
  macthInfo: any
}

export interface store{
  search:string
  id:number
}
