// material-ui
import { Container, Grid, Typography, Box } from "@mui/material";
// project imports
import { gridSpacing } from "store/constant";
// assets
import { constants } from "react-dappify";

const { NETWORKS, LOGO } = constants;

// ============================|| LANDING - KEY FEATURE PAGE ||============================ //

const ToolsPage = () => {
	const displayChains = () => {
		const chains = [];
		const supportedNetworks = Object.keys(NETWORKS);
		supportedNetworks.forEach((chain) => {
			const network = NETWORKS[chain];
			const logo = LOGO[network.nativeCurrency.symbol];
			chains.push(
				<Grid item xs={6} md={2} key={network.chainName} sx={{ my: 2 }}>
					<Box>
						<Grid item xs={12}>
							<img
								src={logo}
								alt={network.chainName}
								height="96"
								style={{
									maxHeight: "96px",
									margin: "0 auto"
								}}
							/>
						</Grid>
						<Grid item xs={12} sx={{ py: 2 }}>
							<Typography variant="h5">
								{network.chainName}
							</Typography>
						</Grid>
					</Box>
				</Grid>
			);
		});
		return chains;
	};

	return (
		<Container>
			<Grid container>
				<Grid
					container
					justifyContent="center"
					spacing={gridSpacing}
					sx={{ textAlign: "center" }}
				>
					<Grid item sx={{ mb: 5 }}>
						<Grid item xs={12} sx={{ mt: 5, mb: 3 }}>
							<Typography className="landing-title">
								Dappify supports a multi-chain ecosystem of
								blockchains
							</Typography>
						</Grid>
					</Grid>
					<Grid container justifyContent="center">
						{displayChains()}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ToolsPage;
