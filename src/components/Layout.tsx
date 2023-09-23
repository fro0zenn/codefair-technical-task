import {Outlet, Link} from "react-router-dom";
import {AppBar, Container, Toolbar, Typography} from "@mui/material";

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Tech task
                </Typography>
                <nav>
                    <ul>
                        <li>
                            <Link to="/"><Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Home
                            </Typography>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Toolbar>
        </AppBar>
    );
};

const Footer = () => {
    return (
        <AppBar position="static" color="primary">
            <Container>
                <Toolbar>
                    <Typography variant="body1" color="inherit">
                        &copy; {new Date().getFullYear()} Tech Task. All Rights Reserved.
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const Layout = () => {
    return (
        <>
            <Header/>
            <div style={{minHeight: '100vh', marginBottom: 20}}>
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
};

export default Layout;
