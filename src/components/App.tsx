import {FC} from 'react';
import Routing from 'components/Routing';
import {ThemeProvider} from "@mui/material";
import theme from "../theme";
import "../index.css";

const App: FC = () => (
        <ThemeProvider theme={theme}>
            <Routing/>
        </ThemeProvider>
);

export default App;
