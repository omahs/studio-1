import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "routes";

// defaultTheme
import themes from "themes";

// project imports
import Locales from "ui-component/Locales";
import Snackbar from "ui-component/extended/Snackbar";

// provider
import { MoralisProvider } from "react-moralis";
import { ProgressProvider } from "contexts/ProgressContext";

// ==============================|| APP ||============================== //
const App = () => {

	const customization = useSelector((state) => state.customization);

	return (
		<MoralisProvider appId={process.env.REACT_APP_MORALIS_APP_ID} serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={themes(customization)}>
					<ProgressProvider>
						<CssBaseline />
						<Locales>
							<>
								<Routes />
								<Snackbar />
							</>
						</Locales>
					</ProgressProvider>
				</ThemeProvider>
			</StyledEngineProvider>
		</MoralisProvider>
	);
};

export default App;
