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
import { DappifyProvider } from "react-dappify";
import { ProgressProvider } from "contexts/ProgressContext";
import mixpanel from "mixpanel-browser";

// ==============================|| APP ||============================== //
const App = () => {
	useEffect(() => {
		mixpanel.init(process.env.REACT_APP_MIXPANEL_ID, { debug: true });
	}, []);

	const customization = useSelector((state) => state.customization);

	return (
		<DappifyProvider>
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
		</DappifyProvider>
	);
};

export default App;
