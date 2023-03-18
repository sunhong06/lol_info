import { useEffect,useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ChampionInfo from '../page/Champion/ChampionInfo';
import BoardSeeMore from '../page/Community/BoardSeeMore';
import Community from '../page/Community/Community';
import Writing from '../page/Community/Writing';
import Home from '../page/Home/Home';
import SummonerInfo from '../page/Home/SummonerInfo';
import Ranking from '../page/Ranking/Ranking';
import RankSearch from '../page/Ranking/RankSearch';
import { AuthService } from "../fbase";
import { onAuthStateChanged } from "firebase/auth";
import '../scss/common.scss'

function Router() {
  const [userObj,setUserObj] = useState({});
  useEffect(()=>{
    onAuthStateChanged(AuthService, (user) => {
      if (user) {
        setUserObj(user);
      }
    })
  },[])
  return (
    <BrowserRouter  basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path='/' exact={true} element={<Home  />} ></Route>
            <Route path='/SummonerInfo/:summonerName' element={<SummonerInfo  />}></Route>
            <Route path='/Ranking' element={<Ranking  />} ></Route>
            <Route path='/Ranking/search/:search' element={<RankSearch  />}></Route>
            <Route path='/Community' element={<Community  />} ></Route>
            <Route path='/ChampionInfo' element={<ChampionInfo  />} ></Route>
            <Route path='/Writing' element={<Writing  />}></Route>
            <Route path='/BoardSeeMore'element={<BoardSeeMore  />}></Route>
            <Route path='/SignUp' element={<SignUp  />}></Route>
            <Route path='/Login' element={<Login  />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default  Router;