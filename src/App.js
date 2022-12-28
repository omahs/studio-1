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
import { ProgressProvider } from "contexts/ProgressContext";

// ==============================|| APP ||============================== //
const App = () => {

	const customization = useSelector((state) => state.customization);

	return (
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
	);
};

export default App;
