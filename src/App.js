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
		mixpanel.init("237ebb3e3f5930e0618b6138c96bfac6", { debug: true });
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
