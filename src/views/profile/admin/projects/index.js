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
		<Grid item xs={12} sm={6} md={4} key={0}>
			<Box>
				<Paper
					className="bordered"
					sx={{
						borderRadius: 2,
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
					elevation={selected === "create" ? 5 : 0}
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
								Create a new dapp
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
				<Grid item xs={12} sm={6} md={4} key={app.id}>
					<Box>
						<DetailsApp project={app} />
					</Box>
				</Grid>
			);
		});
		return list;
	};

	return (
		<Container
			className="main-view-container"
			sx={{
				"& .MuiContainer-root": {
					paddingLeft: 0
				}
			}}
		>
			<Grid
				data-cy="created-dapps-overview"
				container
				spacing={2}
				justifyContent="left"
				alignItems="left"
			>
				{listApps()}
			</Grid>
		</Container>
	);
};

export default Projects;
