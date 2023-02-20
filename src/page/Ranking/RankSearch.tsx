import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import RankingData from './RankingData';

function RankSearch() {
    const location = useLocation();
    const highRankingDataSort = location.state.highRankingDataSort
    const search = location.state.search
    const rankSearch =  highRankingDataSort.filter((item:any)=>{
    return item.summonerName.toLowerCase().includes(search.toLowerCase());})
    console.log(rankSearch)
    return(
        <div className="cardList">
                {rankSearch[0].summonerName}
      </div>
    )
}

export default RankSearch;
