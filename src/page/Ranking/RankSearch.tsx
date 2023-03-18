import React from 'react'
import { FaSearch } from 'react-icons/fa';

function RankSearch({search,setSearch}:any) {
    

      const onHandleSearchClick = (e:any) =>{
        e.preventDefault();
      
      };
    return(
    <div className='rank_input'>
        <input type="search"  placeholder='소환사 명' value={search} onChange={(e)=>setSearch(e.target.value)} className='rank_search' title='검색' />
        <button type='submit' onClick={onHandleSearchClick}><FaSearch /></button>
    </div>
    )
}

export default RankSearch;
