import {FC, useEffect} from 'react';
import stores from "../../stores";
import {Observer} from 'mobx-react-lite';
import {Link} from "react-router-dom";
import {Box, Button, CircularProgress, Container, Typography} from "@mui/material";

const NewsDetails: FC<{ link: string }> = ({link}) => {
    const {feedDetailsStore} = stores;
    const {loadInitialData} = feedDetailsStore;

    useEffect(() => {
        loadInitialData(link).then(r => r);
    }, [loadInitialData, link]);

    return (
        <Container maxWidth="lg" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2}}>
            <Observer>
                {() => {
                    const {data, isLoading} = feedDetailsStore;
                    return (
                        <>
                            {isLoading ? <CircularProgress/> : !data ?
                                <>
                                    <Typography variant="h4">No Data</Typography>
                                    <Link to="/">
                                        <Button variant="contained" sx={{marginTop: 2}}>Back</Button>
                                    </Link>
                                </> : <>
                                    <Typography variant="h4" sx={{fontSize: '1.5rem', marginBottom: 2}}>
                                        {data?.title}
                                    </Typography>
                                    <Box
                                        sx={{textAlign: 'center', marginTop: 2}}
                                        dangerouslySetInnerHTML={{__html: data?.description}}
                                    />
                                    <Link to="/">
                                        <Button variant="contained" sx={{marginTop: 2}}>Back</Button>
                                    </Link>
                                </>
                            }
                        </>
                    )
                }}
            </Observer>
        </Container>
    );
};

export default NewsDetails;
