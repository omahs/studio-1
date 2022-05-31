import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { MoralisProvider } from 'react-moralis';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import Locales from 'ui-component/Locales';
import Snackbar from 'ui-component/extended/Snackbar';

// provider
import { DappifyProvider, Logger } from 'react-dappify';

Logger.debug(`Environment ${process.env.NODE_ENV}`);

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <MoralisProvider appId={process.env.REACT_APP_MORALIS_APP_ID} serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}>
            <DappifyProvider template="studio">
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
        </MoralisProvider>
    );
};

export default App;
