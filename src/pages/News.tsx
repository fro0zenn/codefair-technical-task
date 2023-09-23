import NewsDetails from "components/Feed/NewsDetails";
import {useParams} from 'react-router-dom';
import { Navigate } from "react-router-dom";

const News = () => {
    // const [filteredData, setFilteredData] = useState<string[]>(Data);
    const {link} = useParams();
    return (
        <div className="News">
            {
                !link ? <Navigate to="/" replace={true}/> : <NewsDetails link={link}/>
            }
        </div>
    );
};

export default News;
