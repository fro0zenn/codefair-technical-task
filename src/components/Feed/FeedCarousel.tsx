import { FC, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Observer } from 'mobx-react-lite';
import {Box, CircularProgress, Container, Grid, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import stores from "../../stores";
import {IFeedItem} from "../../services/feed/types";

const styles = {
    carouselWrapper: {
        mb:5
    },
};

const FeedCarousel: FC = () => {
    const { feedCarouselStore } = stores;
    const { loadInitialList } = feedCarouselStore;

    useEffect(() => {
        loadInitialList().then(r => r);
    }, [loadInitialList]);

    return (
        <Observer>
            {() => {
                const { list, isLoading } = feedCarouselStore;
                return (
                    <Container maxWidth="lg">
                        {isLoading ? (
                            <Grid container justifyContent="center">
                                <CircularProgress />
                            </Grid>
                        ) : (
                            <Box sx={styles.carouselWrapper}>
                                {!!list.length ? (
                                    <Carousel showThumbs={false} showIndicators={false}>
                                        {list.map((item: IFeedItem, index: number) => (
                                            <Link key={index} to={`news/${index}`}>
                                                <div style={{minHeight: 250}}>
                                                    <img src={item.imgSrc} alt={item.title} />
                                                    <Typography variant="subtitle1" component="p">
                                                        {item.title}
                                                    </Typography>
                                                </div>
                                            </Link>
                                        ))}
                                    </Carousel>
                                ) : (
                                    <Typography variant="h4" component="div" align="center">
                                        No feed data!
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </Container>
                );
            }}
        </Observer>
    );
};

export default FeedCarousel;
