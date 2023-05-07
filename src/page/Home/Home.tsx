import '../../scss/Home/Home.scss';
import HomeSearch from './HomeSearch';

function Home() {
  return (
    <>
    <main className='home_main'>
      <h1 className='home_title'><img src={process.env.PUBLIC_URL + '/imgs/lol_logo.png'} />LOL.info</h1>
        <HomeSearch />
    </main>
    </>
  )
}

export default Home;

