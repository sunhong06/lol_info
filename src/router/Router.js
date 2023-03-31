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
  const [login,setLogin] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(()=>{
    onAuthStateChanged(AuthService, (user) => {
      if (user) {
        setLogin(true);
        setUserObj(user);
      } else {
        setLogin(false);
      }
    })
  },[])

  return (
    <BrowserRouter  basename={process.env.PUBLIC_URL}>
      {/* {login == false && <Login />} */}
        <Routes> 
            <Route path='/' exact={true} element={<Home userObj={userObj}  />} ></Route>
            <Route path='/SummonerInfo/:summonerName' element={<SummonerInfo userObj={userObj} />}></Route>
            <Route path='/Ranking' element={<Ranking userObj={userObj} />} ></Route>
            <Route path='/Ranking/search/:search' element={<RankSearch  />}></Route>
            <Route path='/Community' element={<Community userObj={userObj} />} ></Route>
            <Route path='/ChampionInfo' element={<ChampionInfo userObj={userObj} />} ></Route>
            <Route path='/Writing' element={<Writing userObj={userObj} />}></Route>
            <Route path='/Community/:boardId'element={<BoardSeeMore userObj={userObj} />}></Route>
            <Route path='/SignUp' element={<SignUp  />}></Route>
            <Route path='/Login' element={<Login  />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default  Router;