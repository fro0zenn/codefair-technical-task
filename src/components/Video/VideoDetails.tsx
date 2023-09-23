import {FC, useEffect} from 'react';
import stores from "../../stores";
import {Observer} from 'mobx-react-lite';
import {Link} from "react-router-dom";
import {Button, CircularProgress, Container, Paper, Typography} from "@mui/material";

const VideoDetails: FC<{ link: string }> = ({link}) => {
    const {videoDetailsStore} = stores;
    const {loadInitialData} = videoDetailsStore;

    useEffect(() => {
        loadInitialData(link).then(r => r);
    }, [loadInitialData, link]);

    return (
        <Container maxWidth="lg">
            <Observer>
                {() => {
                    const {data, isLoading} = videoDetailsStore;
                    return (
                        <>
                            {isLoading ? (
                                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                    <CircularProgress />
                                </div>
                            ) : data === undefined ? (
                                <div>
                                    <Typography variant="h4">NO DATA</Typography>
                                    <Link to="/videos">
                                        <Button variant="contained">Back</Button>
                                    </Link>
                                </div>
                            ) : (
                                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                                    <Typography variant="h4">{data.title}</Typography>
                                    <div dangerouslySetInnerHTML={{ __html: data.description }} />
                                    <Link to="/videos">
                                        <Button variant="contained">Back</Button>
                                    </Link>
                                </Paper>
                            )}
                        </>
                    )
                }}
            </Observer>
        </Container>
    );
};

export default VideoDetails;
