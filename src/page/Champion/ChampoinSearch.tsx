import React from 'react'
import '../../scss/ChampionSearch.scss'

function ChampoinSearch({setSearch,search}:any) {


  return (
    <div className='search_box'>
            <input type="search" value={search} onChange={(e)=> setSearch(e.target.value)} placeholder='챔피언 명' />
    </div>
  )
}

export default ChampoinSearch;
