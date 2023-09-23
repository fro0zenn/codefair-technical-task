import VideoDetails from "components/Video/VideoDetails";
import {useParams} from 'react-router-dom';
import { Navigate } from "react-router-dom";

const Videos = () => {
    // const [filteredData, setFilteredData] = useState<string[]>(Data);
    const {link} = useParams();
    return (
        <div className="News">
            {
                !link ? <Navigate to="/" replace={true}/> : <VideoDetails link={link}/>
            }
        </div>
    );
};

export default Videos;
