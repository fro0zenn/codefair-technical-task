import {FC, useEffect} from 'react';
import stores from "../../stores";
import {Observer} from 'mobx-react-lite';
import {IFeedItem} from "../../services/feed/types";
import {Link} from "react-router-dom";
import {Button, Card, CardContent, CardMedia, CircularProgress, Container, Grid, Typography} from "@mui/material";

const VideoList: FC = () => {
    const {videoListStore} = stores;
    const {loadInitialList, loadMore} = videoListStore;

    useEffect(() => {
        loadInitialList().then(r => r);
    }, [loadInitialList]);

    return (
        <Observer>
            {() => {
                const {list, isLoading, isLoadingMore} = videoListStore;
                return (
                    <Container maxWidth="lg">
                        {isLoading ? (
                            <div style={{textAlign: 'center', marginTop: '20px'}}>
                                <CircularProgress/>
                            </div>
                        ) : !!list.length ? (
                            <>
                                <Grid container spacing={3}>
                                    {list.map((item: IFeedItem, index: number) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                            <Card>
                                                <CardMedia
                                                    component="img"
                                                    alt={item.title}
                                                    height="140"
                                                    image={item.imgSrc}
                                                />
                                                <CardContent>
                                                    <Typography variant="h6">{item.title}</Typography>
                                                    <Link to={`/videos/${index}`}>
                                                        <Button variant="outlined">Read More</Button>
                                                    </Link>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                                <div style={{textAlign: 'center', marginTop: '20px'}}>
                                    <Button variant="contained" onClick={() => {
                                        !isLoading && loadMore()
                                    }} disabled={isLoading}>Load More</Button>
                                </div>
                            </>
                        ) : <h1>No video data!</h1>}
                        {isLoadingMore && (
                            <div style={{textAlign: 'center', marginTop: '20px'}}>
                                <CircularProgress/>
                            </div>
                        )}
                    </Container>
                )
            }}
        </Observer>
    );
};

export default VideoList;
