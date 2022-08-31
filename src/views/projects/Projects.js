import { useEffect, useContext, useState } from "react";
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
	Collapse,
	InputLabel,
	Select,
	MenuItem,
	Alert
} from "@mui/material";
import { gridSpacing } from "store/constant";
import DetailsApp from "views/application/DetailsApp";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { DappifyContext, Project } from "react-dappify";
import emptyList from "assets/images/emptylist.png";
import ProfileDialog from "common/ProfileDialog";
import debounce from "lodash/debounce";
import Identicon from "react-identicons";
import { TwitterPicker } from "react-color";
import isEmpty from "lodash/isEmpty";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { getUrl } from "utils/url";
import CheckIcon from "@mui/icons-material/Check";
import { constants } from "react-dappify";

const { NETWORKS, LOGO, MAINNETS, CONTRACTS } = constants;

const Projects = () => {
	const context = useContext(DappifyContext);
	const { isAuthenticated, user, Provider } = context;
	const navigate = useNavigate();
	const theme = useTheme();
	const [projects, setProjects] = useState([]);
	const [selected, setSelected] = useState();

	const loadApps = async () => {
		if (isAuthenticated) {
			const list = await Project.listAll(user);
			setProjects(list);
		} else {
			setProjects([]);
		}
	};

	const saveUser = debounce(async (setterFn) => {
		try {
			await user.save();
		} catch (e) {
			// console.log(e.message);
			setterFn(e.message);
		}
	}, 300);

	useEffect(() => {
		loadApps();
	}, [isAuthenticated]);

	const [profile, setProfile] = useState({});
	useEffect(() => {
		const existingProfile = user?.get("profile");
		const initProfile = !isEmpty(existingProfile) ? existingProfile : {};
		setProfile(initProfile);
	}, [user]);

	const createNew = isAuthenticated && (
		<Grid item xs={12} sm={6} key={0}>
			<Box>
				<Paper
					sx={{
						borderRadius: 4,
						py: 8,
						position: "relative",
						color: theme.palette.primary.dark,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						cursor: "pointer",
						height: "207px"
					}}
					id="add-project-btn"
					onClick={() => navigate("/new")}
					onMouseOver={() => setSelected("create")}
					onMouseOut={() => setSelected()}
					elevation={selected === "create" ? 20 : 5}
				>
					<Grid container spacing={0.3} direction="column">
						<Grid item xs={12} sx={{ textAlign: "center" }}>
							<AddIcon sx={{ fontSize: "3em" }} />
						</Grid>
						<Grid item xs={12} sx={{ textAlign: "center" }}>
							<Typography
								variant="body"
								fontWeight="600"
								sx={{ color: theme.palette.primary.dark }}
							>
								Add Project
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</Grid>
	);

	const listApps = () => {
		const list = [createNew];
		projects.forEach((app) => {
			list.push(
				<Grid item xs={12} sm={6} key={app.id}>
					<Box>
						<DetailsApp project={app} />
					</Box>
				</Grid>
			);
		});
		return list;
	};

	const welcome = (
		<Grid item xs={12}>
			<Box>
				<img
					src={emptyList}
					alt=""
					style={{
						top: "400px",
						left: "33%",
						height: "auto",
						width: "33%",
						position: "absolute",
						zIndex: -1
					}}
				/>
			</Box>
		</Grid>
	);

	const profileImage = profile?.image ? (
		<img src={profile?.image} alt="" width="96" height="auto" />
	) : (
		<Identicon string={user.get("username")} size={96} />
	);

	const editableLinks = () => {
		const items = [];
		const links = profile?.links || [];
		links.forEach((link, index) => {
			items.push(
				<Grid item xs={12}>
					<Paper elevation={4} sx={{ p: 2 }}>
						<Grid container spacing={1}>
							<Grid item>
								<Grid container direction="column" spacing={1}>
									<Grid item>
										<Avatar
											sx={{
												bgcolor: "white",
												width: 48,
												height: 48,
												border: "1px solid rgba(0,0,0,0.1)"
											}}
										>
											<img
												src={link.image}
												alt=""
												width="48"
												height="auto"
											/>
										</Avatar>
									</Grid>
									<Grid item>
										<input
											type="file"
											onChange={async (e) => {
												const f = e.target.files[0];
												const file = new Provider.File(
													f.name,
													f
												);
												const r = await file.saveIPFS();
												const currLinks =
													profile?.links;
												currLinks[index]["image"] =
													r.ipfs();
												const newProfile = {
													...profile
												};
												newProfile.links = currLinks;
												setProfile(newProfile);
												user.set("profile", newProfile);
												await saveUser();
											}}
										/>
									</Grid>
									<Grid item>
										<Button
											color="error"
											size="small"
											sx={{ mt: -1 }}
											onClick={async () => {
												const newProfile = {
													...profile
												};
												delete newProfile.links[index][
													"image"
												];
												setProfile(newProfile);
												user.set("profile", newProfile);
												await saveUser();
											}}
										>
											Remove image
										</Button>
									</Grid>
								</Grid>
							</Grid>
							<Grid item>
								<TextField
									defaultValue={link.title}
									label="Label"
									onChange={async (e) => {
										const currLinks = profile?.links;
										currLinks[index]["title"] =
											e.target.value;
										const newProfile = { ...profile };
										newProfile.links = currLinks;
										setProfile(newProfile);
										user.set("profile", newProfile);
										await saveUser();
									}}
								/>
							</Grid>
							<Grid item>
								<TextField
									defaultValue={link.url}
									label="URL"
									onChange={async (e) => {
										const currLinks = profile?.links;
										currLinks[index]["url"] =
											e.target.value;
										const newProfile = { ...profile };
										newProfile.links = currLinks;
										setProfile(newProfile);
										user.set("profile", newProfile);
										await saveUser();
									}}
								/>
							</Grid>
							<Grid item>
								<Button
									onClick={async () => {
										const currLinks = profile?.links;
										currLinks.splice(index, 1);
										const newProfile = { ...profile };
										newProfile.links = currLinks;
										setProfile(newProfile);
										user.set("profile", newProfile);
										await saveUser();
									}}
								>
									Delete
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			);
		});
		return items;
	};

	const [selectedItem, setSelectedItem] = useState();
	const renderMenuItems = () => {
		const list = [];
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
							variant="h3"
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

	const isEmailValid = (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const isUsernameValid = (username) => {
		return /^[a-zA-Z0-9-_]+$/.test(username);
	};

	const [emailError, setEmailError] = useState();
	const [usernameError, setUsernameError] = useState();

	const avatarControls = (
		<Paper className="main-card">
			<Grid container direction="row" spacing={1}>
				<Grid item xs={12}>
					<Typography variant="h2" fontWeight={300}>
						Edit and share your Web3 profile! 😎
					</Typography>
				</Grid>
				<Grid item xs={12} sx={{ mt: 1, mb: 3 }}>
					<Typography variant="body" fontWeight={100}>
						Your Dappify profile is a customizable space to showcase
						your Web3 journey as a builder. Make it your own by
						customizing it to your liking. Share your projects, NFTs
						and achievements with other builders.
					</Typography>
					<Typography variant="body" fontWeight={800}>
						Complete your profile to access the rest of Dappify
						Tools.
					</Typography>
				</Grid>
				<Grid item>
					<Grid
						container
						direction="column"
						spacing={1}
						alignItems="center"
						justifyContent="center"
						sx={{ px: 4 }}
					>
						<Grid item>
							<Avatar
								sx={{
									bgcolor: "white",
									width: 96,
									height: 96,
									border: "1px solid rgba(0, 0, 0, 0.25)"
								}}
							>
								{" "}
								{profileImage}{" "}
							</Avatar>
						</Grid>
						<Grid item>
							<Button
								variant="outlined"
								component="label"
								elevation={0}
								size="small"
							>
								Upload image
								<input
									type="file"
									hidden
									onChange={async (e) => {
										const f = e.target.files[0];
										const file = new Provider.File(
											f.name,
											f
										);
										const r = await file.saveIPFS();
										profile.image = r.ipfs();
										const newProfile = { ...profile };
										setProfile(newProfile);
										user.set("profile", newProfile);
										await saveUser();
									}}
								/>
							</Button>
						</Grid>
						<Grid item>
							{profile.image && (
								<Button
									color="error"
									size="small"
									sx={{ mt: -1 }}
									onClick={async () => {
										delete profile.image;
										const newProfile = { ...profile };
										setProfile(newProfile);
										user.set("profile", newProfile);
										await saveUser();
									}}
								>
									Remove
								</Button>
							)}
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={8}>
					<Grid container direction="column" spacing={2}>
						<Grid item>
							<TextField
								fullWidth
								autoFocus
								defaultValue={`${user.get("username")}`}
								label="Your Dappify username 🎉"
								onChange={async (e) => {
									setUsernameError();
									console.log(profile);
									const targetUsername = e.target.value;
									if (isUsernameValid(targetUsername)) {
										user.set("username", targetUsername);
										user.set("nickname", targetUsername);
										await saveUser(setUsernameError);
									} else {
										setUsernameError(
											"Invalid username format"
										);
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
						<Grid item>
							<TextField
								fullWidth
								defaultValue={`${user.get("email")}`}
								label="Your email address 📧"
								onChange={async (e) => {
									setEmailError();
									console.log(profile);
									const targetEmail = e.target.value;
									if (isEmailValid(targetEmail)) {
										user.set("email", targetEmail);
										await saveUser(setEmailError);
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
						</Grid>
						<Grid item>
							<TextField
								fullWidth
								disabled
								value={user.get("ethAddress")}
								label="Your beneficiary wallet 🏦"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">
									Showcase your NFTs from network
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									label="Showcase your NFTs from network"
									onChange={async (e) => {
										console.log(profile);
										profile.chainId = e.target.value;
										const newProfile = { ...profile };
										setProfile(newProfile);
										user.set("profile", newProfile);
										await saveUser();
										console.log(newProfile);
									}}
								>
									{renderMenuItems()}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="outlined"
								href={`/${user.get("username")}`}
								target="_blank"
							>
								View my public profile
							</Button>
						</Grid>
						<Grid item xs={6}>
							<TwitterShareButton
								title={
									"Check out my new @DappifyWeb3 profile 🤩"
								}
								url={`${getUrl()}/${user.get("username")}`}
								hashtags={["crypto", "blockchain"]}
							>
								<Grid container direction="row" spacing={1}>
									<Grid item>
										<TwitterIcon size={32} round />
									</Grid>
									<Grid item>
										<Box sx={{ height: 32, pt: "8px" }}>
											Share on Twitter
										</Box>
									</Grid>
								</Grid>
							</TwitterShareButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);

	const [colors, toggleColors] = useState(false);
	const styleControls = (
		<Paper className="main-card">
			<Grid container direction="row" spacing={1} sx={{ pt: 1 }}>
				<Grid item xs={12}>
					<Button fullWidth onClick={() => toggleColors(!colors)}>
						Background and colors
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Collapse
						in={colors}
						timeout="auto"
						unmountOnExit
						sx={{ width: "100%" }}
					>
						<Grid container>
							<Grid item xs={12} sm={4}>
								<Grid
									container
									direction="column"
									spacing={1}
									sx={{ p: 2 }}
								>
									<Grid item>
										<Avatar
											sx={{
												bgcolor: "white",
												width: 96,
												height: 96,
												border: "1px solid rgba(0,0,0,0.1)"
											}}
										>
											<img
												src={profile?.background}
												alt=""
												width="96"
												height="auto"
											/>
										</Avatar>
									</Grid>
									<Grid item>
										<input
											type="file"
											onChange={async (e) => {
												const f = e.target.files[0];
												const file = new Provider.File(
													f.name,
													f
												);
												const r = await file.saveIPFS();
												profile.background = r.ipfs();
												const newProfile = {
													...profile
												};
												setProfile(newProfile);
												user.set("profile", newProfile);
												await saveUser();
											}}
										/>
									</Grid>
									<Grid item>
										<Button
											color="error"
											size="small"
											sx={{ mt: -1 }}
											onClick={async () => {
												delete profile.background;
												const newProfile = {
													...profile
												};
												setProfile(newProfile);
												user.set("profile", newProfile);
												await saveUser();
											}}
										>
											Delete
										</Button>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={8}>
								<Grid container direction="column" spacing={1}>
									<Grid item>
										<Grid item sx={{ mb: 2 }}>
											<Typography>
												Background Color
											</Typography>
										</Grid>
										<TwitterPicker
											sx={{ mt: 2 }}
											color={profile?.backgroundColor}
											onChangeComplete={async (e) => {
												console.log(e.hex);
												profile.backgroundColor = e.hex;
												const newProfile = {
													...profile
												};
												setProfile(newProfile);
												user.set("profile", newProfile);
												await saveUser();
											}}
										/>
									</Grid>
									<Grid item>
										<Grid item sx={{ mb: 2 }}>
											<Typography>Text Color</Typography>
										</Grid>
										<TwitterPicker
											color={profile?.textColor}
											onChangeComplete={async (e) => {
												console.log(e.hex);
												profile.textColor = e.hex;
												const newProfile = {
													...profile
												};
												setProfile(newProfile);
												user.set("profile", newProfile);
												await saveUser();
											}}
										/>
									</Grid>
									<Grid item>
										<Grid item sx={{ mb: 2 }}>
											<Typography>
												Button Color
											</Typography>
										</Grid>
										<TwitterPicker
											color={profile?.buttonColor}
											onChangeComplete={async (e) => {
												console.log(e.hex);
												profile.buttonColor = e.hex;
												const newProfile = {
													...profile
												};
												setProfile(newProfile);
												user.set("profile", newProfile);
												await saveUser();
											}}
										/>
									</Grid>
									<Grid item>
										<Grid item sx={{ mb: 2 }}>
											<Typography>
												Button Color (Hover)
											</Typography>
										</Grid>
										<TwitterPicker
											color={profile?.buttonColorHover}
											onChangeComplete={async (e) => {
												console.log(e.hex);
												profile.buttonColorHover =
													e.hex;
												const newProfile = {
													...profile
												};
												setProfile(newProfile);
												user.set("profile", newProfile);
												await saveUser();
											}}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Collapse>
				</Grid>
			</Grid>
		</Paper>
	);

	const [linkPanel, toggleLinks] = useState(false);
	const linkControls = (
		<Paper className="main-card">
			<Grid container direction="row" spacing={1} sx={{ pt: 1 }}>
				<Grid item xs={12}>
					<Button fullWidth onClick={() => toggleLinks(!linkPanel)}>
						Add links to share
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Collapse
						in={linkPanel}
						timeout="auto"
						unmountOnExit
						sx={{ width: "100%" }}
					>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<Button
									variant="contained"
									onClick={async () => {
										console.log(profile);
										const orgProfile = { ...profile };
										orgProfile.links = orgProfile.links
											? orgProfile.links
											: [];
										orgProfile.links.push({
											title: "",
											url: "",
											image: ""
										});
										setProfile(orgProfile);
										user.set("profile", orgProfile);
										await saveUser();
									}}
								>
									Add Link
								</Button>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={1}>
									{editableLinks()}
								</Grid>
							</Grid>
						</Grid>
					</Collapse>
				</Grid>
			</Grid>
		</Paper>
	);

	return (
		<Container sx={{ pb: 5 }}>
			<Grid
				data-cy="created-dapps-overview"
				container
				spacing={gridSpacing}
				justifyContent="center"
				alignItems="center"
				sx={{
					margin: "0 auto"
				}}
			>
				<Grid item xs={12}>
					{avatarControls}
				</Grid>
				<Grid item xs={12}>
					{styleControls}
				</Grid>
				<Grid item xs={12}>
					{linkControls}
				</Grid>
				{/*<Grid item xs={12}>
					<Typography variant="h2">
						Launch a new Web3 project! 🚀
					</Typography>
				</Grid>
			{listApps()} 
				{projects.length === 0 && welcome} */}
			</Grid>
			{/*<ProfileDialog context={context} /> */}
		</Container>
	);
};

export default Projects;
