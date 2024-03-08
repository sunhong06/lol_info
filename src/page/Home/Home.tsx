import Container from "../../components/Container/Container";
import "../../scss/Home/Home.scss";
import HomeSearch from "../../components/util/home/HomeSearch";
import HomeBanner from "../../components/util/home/HomeBanner";

function Home() {
  return (
    <Container>
      <main className="home_main">
        <HomeBanner />
        <HomeSearch />
      </main>
    </Container>
  );
}

export default Home;
