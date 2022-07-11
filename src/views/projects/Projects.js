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
	Accordion,
	Collapse
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

	const saveUser = debounce(async () => {
		await user.save();
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

	const avatarControls = (
		<Paper elevation={4} sx={{ borderRadius: 3, p: 2 }}>
			<Grid container direction="row" spacing={1}>
				<Grid item xs={12}>
					<Typography variant="h5">Profile image</Typography>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Grid container direction="column" spacing={1}>
						<Grid item>
							<Avatar
								sx={{ bgcolor: "white", width: 96, height: 96 }}
							>
								{" "}
								{profileImage}{" "}
							</Avatar>
						</Grid>
						<Grid item>
							<input
								type="file"
								onChange={async (e) => {
									const f = e.target.files[0];
									const file = new Provider.File(f.name, f);
									const r = await file.saveIPFS();
									profile.image = r.ipfs();
									const newProfile = { ...profile };
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
									delete profile.image;
									const newProfile = { ...profile };
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
							<TextField
								fullWidth
								disabled
								value={`dappify.com/${user.get("username")}`}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											Your handle 🎉
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
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											Your wallet 👛
										</InputAdornment>
									)
								}}
							/>
						</Grid>
						<Grid item>
							<Button
								variant="outlined"
								href={`/${user.get("username")}`}
								target="_blank"
							>
								View my public profile
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);

	const [colors, toggleColors] = useState(false);
	const styleControls = (
		<Paper elevation={4} sx={{ borderRadius: 3, p: 1 }}>
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
		<Paper elevation={4} sx={{ borderRadius: 3, p: 1 }}>
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
					margin: "0 auto",
					maxWidth: 800
				}}
			>
				<Grid item xs={12}>
					<Typography variant="h2">
						Edit and share your Web3 profile! 😎
					</Typography>
				</Grid>
				<Grid item xs={12}>
					{avatarControls}
				</Grid>
				<Grid item xs={12}>
					{styleControls}
				</Grid>
				<Grid item xs={12}>
					{linkControls}
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h2">
						Launch a new Web3 project! 🚀
					</Typography>
				</Grid>
				{listApps()}
				{projects.length === 0 && welcome}
			</Grid>
			{/*<ProfileDialog context={context} /> */}
		</Container>
	);
};

export default Projects;
