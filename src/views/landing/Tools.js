import { useEffect, useState } from "react";
// material-ui
import { Container, Grid, Typography, Box } from "@mui/material";
// project imports
import { gridSpacing } from "store/constant";
// assets
import { constants } from "react-dappify";
import axios from "axios";

const { NETWORKS, LOGO } = constants;

// ============================|| LANDING - KEY FEATURE PAGE ||============================ //

const ToolsPage = () => {
	const [networks, setNetworks] = useState([]);

	const loadSupportedNetworks = async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_DAPPIFY_API_URL}/chain?type=mainnet`,
			{
				headers: {
					"x-api-Key": process.env.REACT_APP_DAPPIFY_API_KEY,
					accept: "application/json"
				}
			}
		);
		setNetworks(response.data);
	};

	useEffect(() => {
		loadSupportedNetworks();
	}, []);

	const displayChains = () => {
		const chains = [];

		// const supportedNetworks = Object.keys(NETWORKS);
		networks?.forEach((network) => {
			// const network = NETWORKS[chain];
			// const logo = LOGO[network.nativeCurrency.symbol];
			const name = network.name.replace("Mainnet", "");
			chains.push(
				<Grid item xs={2} key={name} sx={{ my: 2 }}>
					<Box>
						<Grid item xs={12}>
							<img
								src={network.imageUrl}
								alt={name}
								height="36"
								style={{
									maxHeight: "36px",
									margin: "0 auto",
									borderRadius: "50%"
								}}
								onError={(event) => {
									event.target.src =
										"https://chainlist.org/_next/image?url=%2Funknown-logo.png&w=64&q=75";
									event.onerror = null;
								}}
							/>
						</Grid>
						<Grid item xs={12} sx={{ py: 2 }}>
							<Typography variant="h5">{name}</Typography>
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
