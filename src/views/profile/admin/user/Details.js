import { useEffect, useState, useContext } from "react";
import {
	TextField,
	Typography,
	Grid,
	Box,
	InputAdornment,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Alert
} from "@mui/material";
import { DappifyContext } from "react-dappify";
import { saveUser } from "utils/user";

// project imports
import SubCard from "ui-component/cards/SubCard";
import { gridSpacing } from "store/constant";

// assets
import isEmpty from "lodash/isEmpty";

import CheckIcon from "@mui/icons-material/Check";
import ProfileAvatar from "views/profile/admin/user/ProfileAvatar";

import { constants } from "react-dappify";
import { ProgressContext } from "contexts/ProgressContext";
const { NETWORKS, LOGO } = constants;

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const Details = () => {
	const { user } = useContext(DappifyContext);
	const { setProgress } = useContext(ProgressContext);
	const [profile, setProfile] = useState({});
	const [usernameError, setUsernameError] = useState();
	const [emailError, setEmailError] = useState();

	useEffect(() => {
		verifyProgress();
	}, []);

	useEffect(() => {
		const existingProfile = user?.get("profile");
		const initProfile = !isEmpty(existingProfile) ? existingProfile : {};
		setProfile(initProfile);
		verifyProgress();
	}, [user]);

	const isEmailValid = (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const isUsernameValid = (username) => {
		return /^[a-zA-Z0-9-_]+$/.test(username);
	};

	const verifyProgress = () => {
		const bio = user.get("bio");
		const email = user.get("email");
		const username = user.get("username");
		const address = user.get("ethAddress");
		const calculateProgress = () => {
			let currentProgress = 0;
			if (!isEmpty(address)) currentProgress += 25;
			if (!isEmpty(username)) currentProgress += 25;
			if (!isEmpty(email)) currentProgress += 25;
			if (!isEmpty(bio)) currentProgress += 25;
			setProgress(currentProgress);
		};
		calculateProgress();
	};

	const renderMenuItems = () => {
		const list = [];
		// Add nil option
		list.push(
			<MenuItem value={0} key="default">
				<Grid container>
					<Box sx={{ minWidth: 30 }}>
						<img
							src="http://cdn.onlinewebfonts.com/svg/img_363058.png"
							alt="No NFTs"
							height="20px"
						/>
					</Box>
					<Typography variant="h5" fontWeight={200} sx={{ ml: 2 }}>
						Don't display my NFTs
					</Typography>
				</Grid>
			</MenuItem>
		);
		// Add dynamic options
		const supportedNetworks = Object.keys(NETWORKS);
		supportedNetworks.forEach((chainId) => {
			const targetNetwork = NETWORKS[chainId];
			const item = (
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
							variant="h5"
							fontWeight={200}
							sx={{ ml: 2 }}
						>
							{targetNetwork.chainName}
						</Typography>
					</Grid>
				</MenuItem>
			);
			list.push(item);
		});
		return list;
	};

	const nftNetworkDropdown = profile && (
		<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">
				Showcase your NFTs from network
			</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				label="Showcase your NFTs from network"
				onChange={async (e) => {
					profile.chainId =
						e.target.value === 0 ? null : e.target.value;
					const newProfile = { ...profile };
					setProfile(newProfile);
					user.set("profile", newProfile);
					await saveUser(user);
					verifyProgress();
				}}
			>
				{renderMenuItems()}
			</Select>
		</FormControl>
	);

	const usernameField = (
		<Grid item>
			<TextField
				fullWidth
				autoFocus
				defaultValue={`${user.get("username")}`}
				label="Username"
				onChange={async (e) => {
					setUsernameError();
					const targetUsername = e.target.value;
					if (isUsernameValid(targetUsername)) {
						user.set("username", targetUsername);
						user.set("nickname", targetUsername);
						await saveUser(user, setUsernameError);
					} else {
						setUsernameError("Invalid username format");
					}
					verifyProgress();
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							https://dappify.com/
						</InputAdornment>
					),
					endAdornment: usernameError ? (
						<InputAdornment position="end">
							<Alert
								severity="error"
								variant="filled"
								sx={{
									lineHeight: "1em",
									borderRadius: "8px",
									padding: "0px 16px"
								}}
							>
								{usernameError}
							</Alert>
						</InputAdornment>
					) : user.get("nickname") ? (
						<InputAdornment position="end">
							<CheckIcon color="success" />
						</InputAdornment>
					) : (
						<InputAdornment position="end">
							<Alert
								severity="warning"
								variant="filled"
								sx={{
									lineHeight: "1em",
									borderRadius: "8px",
									padding: "0px 16px"
								}}
							>
								Customize your username
							</Alert>
						</InputAdornment>
					)
				}}
			/>
		</Grid>
	);

	const emailField = (
		<TextField
			fullWidth
			defaultValue={user.get("email") || ""}
			label="Email Address"
			onChange={async (e) => {
				setEmailError();
				const targetEmail = e.target.value;
				if (isEmailValid(targetEmail)) {
					user.set("email", targetEmail);
					await saveUser(user, setEmailError);
				} else {
					setEmailError("Invalid email format");
				}
				verifyProgress();
			}}
			InputProps={{
				endAdornment: emailError ? (
					<InputAdornment position="end">
						<Alert
							severity="error"
							variant="filled"
							sx={{
								lineHeight: "1em",
								borderRadius: "8px",
								padding: "0px 16px"
							}}
						>
							{emailError}
						</Alert>
					</InputAdornment>
				) : user.get("email") ? (
					<InputAdornment position="end">
						<CheckIcon color="success" />
					</InputAdornment>
				) : (
					<InputAdornment position="end">
						<Alert
							severity="warning"
							variant="filled"
							sx={{
								lineHeight: "1em",
								borderRadius: "8px",
								padding: "0px 16px"
							}}
						>
							Please add your email
						</Alert>
					</InputAdornment>
				)
			}}
		/>
	);

	const bioField = (
		<TextField
			label="About Yourself"
			multiline
			fullWidth
			rows={2}
			defaultValue={user.get("bio") || ""}
			onChange={async (e) => {
				const bio = e.target.value;
				user.set("bio", bio);
				await saveUser(user);
				verifyProgress();
			}}
		/>
	);

	return (
		<Grid container spacing={gridSpacing}>
			<Grid item sm={6} md={4}>
				<SubCard
					title="Profile Picture"
					contentSX={{ textAlign: "center" }}
				>
					<ProfileAvatar isUser />
				</SubCard>
			</Grid>
			<Grid item sm={6} md={8}>
				<SubCard title="Edit Profile Details">
					<Grid container spacing={gridSpacing}>
						<Grid item xs={12}>
							{usernameField}
						</Grid>
						<Grid item xs={12}>
							{emailField}
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								disabled
								value={user.get("ethAddress")}
								label="Wallet"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<CheckIcon color="success" />
										</InputAdornment>
									)
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							{bioField}
						</Grid>
						<Grid item xs={12}>
							{nftNetworkDropdown}
						</Grid>
					</Grid>
				</SubCard>
			</Grid>
		</Grid>
	);
};

export default Details;
