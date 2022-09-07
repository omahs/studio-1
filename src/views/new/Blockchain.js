/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
	Grid,
	Typography,
	Tooltip,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Box
} from "@mui/material";
import { constants } from "react-dappify";

const { NETWORKS, LOGO } = constants;

const Blockchain = ({ onChange }) => {
	const [selectedChain, setSelectedChain] = useState();

	const projectInfo = `
    Dappify supports all EVMs. Having said this, each blockchain has a specific set of traits that make it more appealing depending on your specific needs. Have a read at each of the offering descriptions for more information
    `;

	const renderMenuItems = () => {
		const list = [];
		const supportedNetworks = Object.keys(NETWORKS);
		supportedNetworks.forEach((chainId) => {
			const targetNetwork = NETWORKS[chainId];
			list.push(
				<MenuItem value={chainId} key={chainId}>
					<Grid container>
						<Box sx={{ minWidth: 30 }}>
							<img
								src={LOGO[targetNetwork.nativeCurrency.symbol]}
								alt="Ava"
								height="20px"
							/>
						</Box>
						<Typography
							variant="h3"
							fontWeight={200}
							sx={{ ml: 2 }}
						>
							{targetNetwork.chainName}
						</Typography>
					</Grid>
				</MenuItem>
			);
		});
		return list;
	};

	const handleChange = (event) => {
		const newChainId = event.target.value;
		setSelectedChain(newChainId);
		onChange(newChainId);
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
						<InputLabel id="network-select-label">
							Select your ecosystem
						</InputLabel>
						<Select
							labelId="network-select-label"
							id="network-select"
							label="Select your ecosystem"
							value={selectedChain}
							onChange={handleChange}
						>
							{renderMenuItems()}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Blockchain;
