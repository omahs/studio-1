import { useEffect, useState } from "react";
import { Typography, Grid, Box, Paper, Container } from "@mui/material";
import ProjectCard from "ui-component/ProjectCard";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { LOADER } from "store/actions";
import { Magic } from 'magic-sdk';
const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

const Projects = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const [projects, setProjects] = useState([]);
	const [selected, setSelected] = useState();
	const [principal, setPrincipal] = useState();

	const loadPrincipal = async () => {
		dispatch({ type: LOADER, show: true });
		const idToken = await m.user.getIdToken();
		setPrincipal(idToken);
		dispatch({ type: LOADER, show: false });
	};

	const listAll = async () => {

		try {
			dispatch({ type: LOADER, show: true });
			const response = await axios.get(`${process.env.REACT_APP_DAPPIFY_API_URL}/project`,
				{
					headers: {
						"AuthorizeToken": `Bearer ${principal}`,
						"Content-Type": "application/json",
						"Accept": "application/json"
					}
				}
			)

			const list = response?.data;
			setProjects(list);
		} finally {
			dispatch({ type: LOADER, show: false });
		}
	};

	useEffect(() => {
		loadPrincipal();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (principal) {
			listAll();
		} else {
			setProjects([]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [principal]);

	const createNew = /* isAuthenticated && */ (
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
						<ProjectCard project={app} onReload={listAll} principal={principal} />
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
