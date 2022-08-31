// import { useEffect, useContext, useState } from "react";
// import {
// 	TextField,
// 	Typography,
// 	Grid,
// 	Container,
// 	Box,
// 	Paper,
// 	Avatar,
// 	Button,
// 	InputAdornment,
// 	FormControl,
// 	Collapse,
// 	InputLabel,
// 	Select,
// 	MenuItem,
// 	Alert
// } from "@mui/material";
// import { gridSpacing } from "store/constant";
// import DetailsApp from "views/application/DetailsApp";
// import { useTheme } from "@mui/material/styles";
// import AddIcon from "@mui/icons-material/Add";
// import { useNavigate } from "react-router-dom";
// import { DappifyContext, Project } from "react-dappify";
// import emptyList from "assets/images/emptylist.png";
// import ProfileDialog from "common/ProfileDialog";
// import debounce from "lodash/debounce";
// import Identicon from "react-identicons";
// import { TwitterPicker } from "react-color";
// import isEmpty from "lodash/isEmpty";
// import { TwitterIcon, TwitterShareButton } from "react-share";
// import { getUrl } from "utils/url";
// import CheckIcon from '@mui/icons-material/Check';
// import { constants } from "react-dappify";
// import Style from 'views/profile/admin/user/Style';
// import Details from 'views/profile/admin/user/Details';
// import { saveUser } from 'utils/user';
// import MainCard from 'ui-component/cards/MainCard';

// const { NETWORKS, LOGO, MAINNETS, CONTRACTS } = constants;

// const Projects = () => {
// 	const context = useContext(DappifyContext);
// 	const { isAuthenticated, user, Provider } = context;
// 	const navigate = useNavigate();
// 	const theme = useTheme();
// 	const [projects, setProjects] = useState([]);
// 	const [selected, setSelected] = useState();

// 	const loadApps = async () => {
// 		if (isAuthenticated) {
// 			const list = await Project.listAll(user);
// 			setProjects(list);
// 		} else {
// 			setProjects([]);
// 		}
// 	};

// 	useEffect(() => {
// 		loadApps();
// 	}, [isAuthenticated]);

// 	const [profile, setProfile] = useState({});
// 	useEffect(() => {
// 		const existingProfile = user?.get("profile");
// 		const initProfile = !isEmpty(existingProfile) ? existingProfile : {};
// 		setProfile(initProfile);
// 	}, [user]);

// 	const profileImage = profile?.image ? (
// 		<img src={profile?.image} alt="" width="96" height="auto" />
// 	) : (
// 		<Identicon string={user.get("username")} size={96} />
// 	);

// 	const editableLinks = () => {
// 		const items = [];
// 		const links = profile?.links || [];
// 		links.forEach((link, index) => {
// 			items.push(
// 				<Grid item xs={12}>
// 					<Paper elevation={4} sx={{ p: 2 }}>
// 						<Grid container spacing={1}>
// 							<Grid item>
// 								<Grid container direction="column" spacing={1}>
// 									<Grid item>
// 										<Avatar
// 											sx={{
// 												bgcolor: "white",
// 												width: 48,
// 												height: 48,
// 												border: "1px solid rgba(0,0,0,0.1)"
// 											}}
// 										>
// 											<img
// 												src={link.image}
// 												alt=""
// 												width="48"
// 												height="auto"
// 											/>
// 										</Avatar>
// 									</Grid>
// 									<Grid item>
// 										<input
// 											type="file"
// 											onChange={async (e) => {
// 												const f = e.target.files[0];
// 												const file = new Provider.File(
// 													f.name,
// 													f
// 												);
// 												const r = await file.saveIPFS();
// 												const currLinks =
// 													profile?.links;
// 												currLinks[index]["image"] =
// 													r.ipfs();
// 												const newProfile = {
// 													...profile
// 												};
// 												newProfile.links = currLinks;
// 												setProfile(newProfile);
// 												user.set("profile", newProfile);
// 												await saveUser(user);
// 											}}
// 										/>
// 									</Grid>
// 									<Grid item>
// 										<Button
// 											color="error"
// 											size="small"
// 											sx={{ mt: -1 }}
// 											onClick={async () => {
// 												const newProfile = {
// 													...profile
// 												};
// 												delete newProfile.links[index][
// 													"image"
// 												];
// 												setProfile(newProfile);
// 												user.set("profile", newProfile);
// 												await saveUser(user);
// 											}}
// 										>
// 											Remove image
// 										</Button>
// 									</Grid>
// 								</Grid>
// 							</Grid>
// 							<Grid item>
// 								<TextField
// 									defaultValue={link.title}
// 									label="Label"
// 									onChange={async (e) => {
// 										const currLinks = profile?.links;
// 										currLinks[index]["title"] =
// 											e.target.value;
// 										const newProfile = { ...profile };
// 										newProfile.links = currLinks;
// 										setProfile(newProfile);
// 										user.set("profile", newProfile);
// 										await saveUser(user);
// 									}}
// 								/>
// 							</Grid>
// 							<Grid item>
// 								<TextField
// 									defaultValue={link.url}
// 									label="URL"
// 									onChange={async (e) => {
// 										const currLinks = profile?.links;
// 										currLinks[index]["url"] =
// 											e.target.value;
// 										const newProfile = { ...profile };
// 										newProfile.links = currLinks;
// 										setProfile(newProfile);
// 										user.set("profile", newProfile);
// 										await saveUser(user);
// 									}}
// 								/>
// 							</Grid>
// 							<Grid item>
// 								<Button
// 									onClick={async () => {
// 										const currLinks = profile?.links;
// 										currLinks.splice(index, 1);
// 										const newProfile = { ...profile };
// 										newProfile.links = currLinks;
// 										setProfile(newProfile);
// 										user.set("profile", newProfile);
// 										await saveUser(user);
// 									}}
// 								>
// 									Delete
// 								</Button>
// 							</Grid>
// 						</Grid>
// 					</Paper>
// 				</Grid>
// 			);
// 		});
// 		return items;
// 	};

// 	const [selectedItem, setSelectedItem] = useState();
// 	const renderMenuItems = () => {
// 		const list = [];
// 		const supportedNetworks = Object.keys(NETWORKS);
// 		supportedNetworks.forEach((chainId) => {
// 			const targetNetwork = NETWORKS[chainId];
// 			const item = (
// 				<MenuItem value={chainId} key={chainId}>
// 					<Grid container>
// 						<Box sx={{ minWidth: 30 }}>
// 							<img
// 								src={LOGO[targetNetwork.nativeCurrency.symbol]}
// 								alt="Ava"
// 								height="20px"
// 							/>
// 						</Box>
// 						<Typography
// 							variant="h3"
// 							fontWeight={200}
// 							sx={{ ml: 2 }}
// 						>
// 							{targetNetwork.chainName}
// 						</Typography>
// 					</Grid>
// 				</MenuItem>
// 			);
// 			list.push(item);
// 		});
// 		return list;
// 	};

// 	const isEmailValid  = (email) => {
// 		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// 	}

// 	const isUsernameValid  = (username) => {
// 		return /^[a-zA-Z0-9-_]+$/.test(username);
// 	}

// 	const [emailError, setEmailError] = useState();
// 	const [usernameError, setUsernameError] = useState();

// 	const avatarControls = (
// 		<Paper className="main-card">
// 			<Grid container direction="row" spacing={1}>
// 				<Grid item xs={12}>
// 					<Typography variant="h2" fontWeight={300}>
// 						Edit and share your Web3 profile! 😎
// 					</Typography>
// 				</Grid>
// 				<Grid item xs={12} sx={{ mt: 1, mb: 3 }}>
// 					<Typography variant="body" fontWeight={100}>
// 						Your Dappify profile is a customizable space to showcase your Web3 journey as a builder. Make it your own by
// 						customizing it to your liking. Share your projects, NFTs and achievements with other builders.
// 					</Typography>
// 					<Typography variant="body" fontWeight={800}>
// 						Complete your profile to access the rest of Dappify Tools.
// 					</Typography>
// 				</Grid>
// 				<Grid item>
// 					<Grid container direction="column" spacing={1} alignItems="center" justifyContent="center" sx={{ px: 4 }}>
// 						<Grid item>
// 							<Avatar
// 								sx={{ bgcolor: "white", width: 96, height: 96, border: '1px solid rgba(0, 0, 0, 0.25)' }}
// 							>
// 								{" "}
// 								{profileImage}{" "}
// 							</Avatar>
// 						</Grid>
// 						<Grid item>
// 							<Button variant="outlined"
// 									component="label"
// 									elevation={0}
// 									size="small">
// 								Upload image
// 								<input
// 									type="file"
// 									hidden
// 									onChange={async (e) => {
// 										const f = e.target.files[0];
// 										const file = new Provider.File(f.name, f);
// 										const r = await file.saveIPFS();
// 										profile.image = r.ipfs();
// 										const newProfile = { ...profile };
// 										setProfile(newProfile);
// 										user.set("profile", newProfile);
// 										await saveUser(user);
// 									}}
// 								/>
// 							</Button>
// 						</Grid>
// 						<Grid item>
// 							{profile.image && (
// 								<Button
// 									color="error"
// 									size="small"
// 									sx={{ mt: -1 }}
// 									onClick={async () => {
// 										delete profile.image;
// 										const newProfile = { ...profile };
// 										setProfile(newProfile);
// 										user.set("profile", newProfile);
// 										await saveUser(user);
// 									}}
// 								>
// 									Remove
// 								</Button>
// 							)}
// 						</Grid>
// 					</Grid>
// 				</Grid>
// 				<Grid item xs={12} sm={8}>
// 					<Grid container direction="column" spacing={2}>
// 						<Grid item>
// 							<TextField
// 								fullWidth
// 								autoFocus
// 								defaultValue={`${user.get("username")}`}
// 								label="Your Dappify username 🎉"
// 								onChange={async (e) => {
// 									setUsernameError();
// 									console.log(profile);
// 									const targetUsername = e.target.value;
// 									if (isUsernameValid(targetUsername)) {
// 										user.set("username", targetUsername);
// 										user.set("nickname", targetUsername);
// 										await saveUser(user, setUsernameError);
// 									} else {
// 										setUsernameError('Invalid username format');
// 									}
// 								}}
// 								InputProps={{
// 									startAdornment: (
// 										<InputAdornment position="start">
// 											https://dappify.com/
// 										</InputAdornment>
// 									),
// 									endAdornment: (
// 										usernameError ? (
// 											<InputAdornment position="end">
// 											<Alert severity="error"
// 													variant="filled"
// 													sx={{
// 														lineHeight: '1em',
// 														borderRadius: '8px',
// 														padding: '0px 16px',
// 													}}>{usernameError}</Alert>
// 											</InputAdornment>
// 										): user.get("nickname") ? (
// 											<InputAdornment position="end">
// 												<CheckIcon color="success"/>
// 											</InputAdornment>
// 										): (
// 											<InputAdornment position="end">
// 												<Alert severity="warning"
// 														variant="filled"
// 														sx={{
// 															lineHeight: '1em',
// 															borderRadius: '8px',
// 															padding: '0px 16px',
// 														}}>Customize your username</Alert>
// 											</InputAdornment>
// 										)
// 									)
// 								}}
// 							/>
// 						</Grid>
// 						<Grid item>
// 							<TextField
// 								fullWidth
// 								defaultValue={`${user.get("email")}`}
// 								label="Your email address 📧"
// 								onChange={async (e) => {
// 									setEmailError();
// 									console.log(profile);
// 									const targetEmail = e.target.value;
// 									if (isEmailValid(targetEmail)) {
// 										user.set("email", targetEmail);
// 										await saveUser(user, setEmailError);
// 									} else {
// 										setEmailError('Invalid email format');
// 									}
// 								}}
// 								InputProps={{
// 									endAdornment: (
// 										emailError ? (
// 											<InputAdornment position="end">
// 											<Alert severity="error"
// 													variant="filled"
// 													sx={{
// 														lineHeight: '1em',
// 														borderRadius: '8px',
// 														padding: '0px 16px',
// 													}}>{emailError}</Alert>
// 											</InputAdornment>
// 										): user.get("email") ? (
// 											<InputAdornment position="end">
// 												<CheckIcon color="success"/>
// 											</InputAdornment>
// 										): (
// 											<InputAdornment position="end">
// 												<Alert severity="warning"
// 														variant="filled"
// 														sx={{
// 															lineHeight: '1em',
// 															borderRadius: '8px',
// 															padding: '0px 16px',
// 														}}>Please add your email</Alert>
// 											</InputAdornment>
// 										)
// 									)
// 								}}
// 							/>
// 						</Grid>
// 						<Grid item>
// 							<TextField
// 								fullWidth
// 								disabled
// 								value={user.get("ethAddress")}
// 								label="Your beneficiary wallet 🏦"
// 							/>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<FormControl fullWidth>
// 								<InputLabel id="demo-simple-select-label">
// 									Showcase your NFTs from network
// 								</InputLabel>
// 								<Select
// 									labelId="demo-simple-select-label"
// 									id="demo-simple-select"
// 									label="Showcase your NFTs from network"
// 									onChange={async (e) => {
// 										console.log(profile);
// 										profile.chainId = e.target.value;
// 										const newProfile = { ...profile };
// 										setProfile(newProfile);
// 										user.set("profile", newProfile);
// 										await saveUser(user);
// 										console.log(newProfile);
// 									}}
// 								>
// 									{renderMenuItems()}
// 								</Select>
// 							</FormControl>
// 						</Grid>
// 						<Grid item xs={6}>
// 							<Button
// 								variant="outlined"
// 								href={`/${user.get("username")}`}
// 								target="_blank"
// 							>
// 								View my public profile
// 							</Button>
// 						</Grid>
// 						<Grid item xs={6}>
// 							<TwitterShareButton
// 								title={
// 									"Check out my new @DappifyWeb3 profile 🤩"
// 								}
// 								url={`${getUrl()}/${user.get("username")}`}
// 								hashtags={["crypto", "blockchain"]}
// 							>
// 								<Grid container direction="row" spacing={1}>
// 									<Grid item>
// 										<TwitterIcon size={32} round />
// 									</Grid>
// 									<Grid item>
// 										<Box sx={{ height: 32, pt: "8px" }}>
// 											Share on Twitter
// 										</Box>
// 									</Grid>
// 								</Grid>
// 							</TwitterShareButton>
// 						</Grid>
// 					</Grid>
// 				</Grid>
// 			</Grid>
// 		</Paper>
// 	);

// 	const [linkPanel, toggleLinks] = useState(false);
// 	const linkControls = (
// 		<Paper className="main-card">
// 			<Grid container direction="row" spacing={1} sx={{ pt: 1 }}>
// 				<Grid item xs={12}>
// 					<Button fullWidth onClick={() => toggleLinks(!linkPanel)}>
// 						Add links to share
// 					</Button>
// 				</Grid>
// 				<Grid item xs={12}>
// 					<Collapse
// 						in={linkPanel}
// 						timeout="auto"
// 						unmountOnExit
// 						sx={{ width: "100%" }}
// 					>
// 						<Grid container spacing={1}>
// 							<Grid item xs={12}>
// 								<Button
// 									variant="contained"
// 									onClick={async () => {
// 										console.log(profile);
// 										const orgProfile = { ...profile };
// 										orgProfile.links = orgProfile.links
// 											? orgProfile.links
// 											: [];
// 										orgProfile.links.push({
// 											title: "",
// 											url: "",
// 											image: ""
// 										});
// 										setProfile(orgProfile);
// 										user.set("profile", orgProfile);
// 										await saveUser(user);
// 									}}
// 								>
// 									Add Link
// 								</Button>
// 							</Grid>
// 							<Grid item xs={12}>
// 								<Grid container spacing={1}>
// 									{editableLinks()}
// 								</Grid>
// 							</Grid>
// 						</Grid>
// 					</Collapse>
// 				</Grid>
// 			</Grid>
// 		</Paper>
// 	);

// 	return (
// 		<Container className="main-view-container" sx={{
// 			'& .MuiContainer-root': {
// 				paddingLeft: 0
// 			}
// 		}}>
// 			<Grid
// 				data-cy="created-dapps-overview"
// 				container
// 				spacing={gridSpacing}
// 				justifyContent="center"
// 				alignItems="center"
// 			>
// 				<Grid item xs={12}>
// 					{/* avatarControls */}
// 					<MainCard title="Account">
// 						<Details />
// 					</MainCard>
// 				</Grid>
// 				<Grid item xs={12}>
// 					<Style />
// 				</Grid>
// 				<Grid item xs={12}>
// 					{linkControls}
// 				</Grid>
// 				{/*<Grid item xs={12}>
// 					<Typography variant="h2">
// 						Launch a new Web3 project! 🚀
// 					</Typography>
// 				</Grid>
// 			{listApps()}
// 				{projects.length === 0 && welcome} */}
// 			</Grid>
// 			{/*<ProfileDialog context={context} /> */}
// 		</Container>
// 	);
// };

// export default Projects;

import { useEffect, useState, useContext } from "react";
import {
	TextField,
	Typography,
	Grid,
	Container,
	Box,
	Paper,
	Avatar,
	Button,
	InputAdornment,
	FormControl,
	FormControlLabel,
	InputLabel,
	Select,
	MenuItem,
	Alert,
	Switch
} from "@mui/material";

import { DappifyContext, Project } from "react-dappify";
import { saveUser } from "utils/user";

// project imports
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import { gridSpacing } from "store/constant";

// assets
import Identicon from "react-identicons";
import isEmpty from "lodash/isEmpty";

import CheckIcon from "@mui/icons-material/Check";

import { constants } from "react-dappify";
const { NETWORKS, LOGO, MAINNETS, CONTRACTS } = constants;

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const Details = () => {
	const { Provider, user } = useContext(DappifyContext);

	const [profile, setProfile] = useState({});
	const [usernameError, setUsernameError] = useState();
	const [emailError, setEmailError] = useState();
	const [selectedItem, setSelectedItem] = useState();

	useEffect(() => {
		const existingProfile = user?.get("profile");
		const initProfile = !isEmpty(existingProfile) ? existingProfile : {};
		setProfile(initProfile);
	}, [user]);

	const profileImage = profile?.image ? (
		<img src={profile?.image} alt="" width="96" height="auto" />
	) : (
		<Identicon string={user.get("username")} size={96} />
	);

	const isEmailValid = (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const isUsernameValid = (username) => {
		return /^[a-zA-Z0-9-_]+$/.test(username);
	};

	const onAvatarUpload = async (e) => {
		const f = e.target.files[0];
		const file = new Provider.File(f.name, f);
		const r = await file.saveIPFS();
		profile.image = r.ipfs();
		const newProfile = { ...profile };
		setProfile(newProfile);
		user.set("profile", newProfile);
		await saveUser(user);
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
					console.log(profile);
					const targetUsername = e.target.value;
					if (isUsernameValid(targetUsername)) {
						user.set("username", targetUsername);
						user.set("nickname", targetUsername);
						await saveUser(user, setUsernameError);
					} else {
						setUsernameError("Invalid username format");
					}
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
			defaultValue={`${user.get("email")}`}
			label="Email Address"
			onChange={async (e) => {
				setEmailError();
				console.log(profile);
				const targetEmail = e.target.value;
				if (isEmailValid(targetEmail)) {
					user.set("email", targetEmail);
					await saveUser(user, setEmailError);
				} else {
					setEmailError("Invalid email format");
				}
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
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Avatar
								sx={{
									width: 100,
									height: 100,
									margin: "0 auto",
									background: "transparent",
									border: "1px solid rgba(0,0,0,0.1)"
								}}
							>
								{profileImage}
							</Avatar>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="subtitle2" align="center">
								Upload/Change Your Profile Image
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<AnimateButton>
								<Button
									variant="contained"
									component="label"
									elevation={0}
									size="small"
								>
									Upload Avatar
									<input
										type="file"
										hidden
										onChange={onAvatarUpload}
									/>
								</Button>
							</AnimateButton>
						</Grid>
					</Grid>
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
						{/*<Grid item xs={12}>
                            <Stack direction="row">
                                <AnimateButton>
                                    <Button variant="contained">Change Details</Button>
                                </AnimateButton>
                            </Stack>
                        </Grid>*/}
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
