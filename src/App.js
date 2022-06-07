import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import Locales from 'ui-component/Locales';
import Snackbar from 'ui-component/extended/Snackbar';

// provider
import { DappifyProvider } from 'react-dappify';

// Logger.debug(`NODE_ENV ${process.env.NODE_ENV}`);
// Logger.debug(`REACT_APP_HOST_ENV ${process.env.REACT_APP_HOST_ENV}`);

// ==============================|| APP ||============================== //
const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <DappifyProvider>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <Locales>
                        <>
                            <Routes />
                            <Snackbar />
                        </>
                    </Locales>
                </ThemeProvider>
            </StyledEngineProvider>
        </DappifyProvider>
    );
};

export default App;
