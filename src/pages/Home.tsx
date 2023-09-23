import FeedCarousel from "components/Feed/FeedCarousel";
import VideoList from "../components/Video/VideoList";
import PollingComponent from "../components/PollingComponent";
import stores from "../stores";
const Home = () => {
  // const [filteredData, setFilteredData] = useState<string[]>(Data);
  const {feedCarouselStore, videoListStore} = stores;

  return (
    <div className="Home">
        <PollingComponent loadFunc={feedCarouselStore.reloadData} refreshInterval={300000}><FeedCarousel/></PollingComponent>
        <PollingComponent loadFunc={videoListStore.reloadData}><VideoList/></PollingComponent>
    </div>
  );
};

export default Home;
