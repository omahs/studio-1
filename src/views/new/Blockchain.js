/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
	Grid,
	Typography,
	Tooltip,
	FormControl,
	// InputLabel,
	// MenuItem,
	// Select,
	Box,
	Autocomplete,
	TextField,
	Switch,
	FormControlLabel,
	FormGroup
} from "@mui/material";
// import { constants } from "react-dappify";
import axios from "axios";

// const { NETWORKS, LOGO } = constants;

const Blockchain = ({ onChange }) => {
	// const [selectedChain, setSelectedChain] = useState();

	const [networks, setNetworks] = useState([]);
	const [filter, setFilter] = useState("mainnet");

	const loadSupportedNetworks = async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_DAPPIFY_API_URL}/chain?type=${filter}`,
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
	}, [filter]);

	const projectInfo = `
    Dappify supports all EVMs. Having said this, each blockchain has a specific set of traits that make it more appealing depending on your specific needs. Have a read at each of the offering descriptions for more information
    `;

	// const renderMenuItems = () => {
	// 	const list = [];
	// 	// const supportedNetworks = Object.keys(NETWORKS);
	// 	networks?.forEach((targetNetwork) => {
	// 		// const targetNetwork = NETWORKS[chainId];
	// 		const name = targetNetwork.name;
	// 		list.push(
	// 			<MenuItem value={targetNetwork.chainId} key={targetNetwork.chainId}>
	// 				<Grid container>
	// 					<Box sx={{ minWidth: 30 }}>
	// 					<img
	// 						src={targetNetwork.imageUrl}
	// 						alt={name}
	// 						height="24"
	// 						style={{
	// 							maxHeight: "24px",
	// 							margin: "0 auto",
	// 							borderRadius: '50%'
	// 						}}
	// 						onError={(event) => {
	// 							event.target.src = "https://chainlist.org/_next/image?url=%2Funknown-logo.png&w=64&q=75"
	// 							event.onerror = null
	// 						}}
	// 					/>
	// 					</Box>
	// 					<Typography
	// 						variant="h3"
	// 						fontWeight={200}
	// 						sx={{ ml: 2 }}
	// 					>
	// 						{targetNetwork.name}
	// 					</Typography>
	// 				</Grid>
	// 			</MenuItem>
	// 		);
	// 	});
	// 	return list;
	// };

	// const handleChange = (event) => {
	// 	const newChainId = event.target.value;
	// 	setSelectedChain(newChainId);
	// 	console.log(newChainId);
	// 	onChange(newChainId);
	// };

	const handleSelectNetwork = (e, value) => {
		console.log(e.target, value);
		// setSelectedChain(value.chainId);
		onChange(value.chainId);
	};

	return (
		<Grid
			container
			direction="row"
			justifyContent="left"
			alignItems="left"
			spacing={2}
		>
			<Grid item xs={12}>
				<Typography variant="h1" fontWeight="regular" sx={{ mb: 5 }}>
					What ecosystem best suits
					<br />
					your
					<Tooltip title={projectInfo}>
						<span className="project-keyword">
							use cases
							<HelpOutlineIcon />
						</span>
					</Tooltip>
				</Typography>
			</Grid>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<FormControl fullWidth>
						{/* <Select
							labelId="network-select-label"
							id="network-select"
							label="Select your ecosystem"
							value={selectedChain}
							onChange={handleChange}
						>
							{renderMenuItems()}
	</Select> */}

						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										checked={filter === "testnet"}
										onChange={() => {
											setFilter(
												filter === "testnet"
													? "mainnet"
													: "testnet"
											);
										}}
									/>
								}
								label="Testnets"
							/>
						</FormGroup>
						<Autocomplete
							id="country-select-demo"
							fullWidth
							options={networks}
							autoHighlight
							getOptionLabel={(option) => option.name}
							onChange={handleSelectNetwork}
							renderOption={(props, option) => (
								<li {...props}>
									<Grid
										container
										sx={{ px: 3, py: 1, cursor: "pointer" }}
										key={option.chainId}
									>
										<Box sx={{ minWidth: 30 }}>
											<img
												src={option.imageUrl}
												alt={option.name}
												height="24"
												style={{
													maxHeight: "24px",
													margin: "0 auto",
													borderRadius: "50%"
												}}
												onError={(event) => {
													event.target.src =
														"https://chainlist.org/_next/image?url=%2Funknown-logo.png&w=64&q=75";
													event.onerror = null;
												}}
											/>
										</Box>
										<Typography
											variant="h3"
											fontWeight={200}
											sx={{ ml: 2 }}
										>
											{option.name}
										</Typography>
									</Grid>
								</li>
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Select your ecosystem"
									inputProps={{
										...params.inputProps,
										autoComplete: "new-password" // disable autocomplete and autofill
									}}
								/>
							)}
						/>
					</FormControl>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Blockchain;
