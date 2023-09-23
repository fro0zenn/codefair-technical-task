import {FC, lazy, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Navigate, Route} from 'react-router-dom';
import Layout from "./Layout";

const Home = lazy(() => import('pages/Home'));
const News = lazy(() => import('pages/News'));
const Videos = lazy(() => import('pages/Videos'));

const Routing: FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Suspense fallback={<>Loading...</>}><Layout/></Suspense>}>
                    <Route index element={<Home/>}/>
                    <Route path="/news/:link" element={<Suspense fallback={<>Loading...</>}><News/></Suspense>}/>
                    <Route path="/videos/:link" element={<Suspense fallback={<>Loading...</>}><Videos/></Suspense>}/>
                    <Route path="*" element={<Navigate to="/" replace={true}/>}/>
                </Route>
            </Routes>
        </Router>
    );
};

export default Routing;
