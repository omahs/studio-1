import { useEffect, useContext, useState } from "react";
import { Typography, Grid, Container, Box, Paper } from "@mui/material";
import { gridSpacing } from "store/constant";
import DetailsApp from "views/application/DetailsApp";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { DappifyContext, Project } from "react-dappify";
import emptyList from "assets/images/emptylist.png";
import ProfileDialog from "common/ProfileDialog";

const Projects = () => {
	const context = useContext(DappifyContext);
	const { isAuthenticated, user } = context;
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

	useEffect(() => {
		loadApps();
	}, [isAuthenticated]);

	const createNew = isAuthenticated && (
		<Grid item xs={12} sm={6} md={4} key={0}>
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
						height: "207px",
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
				<Grid item xs={12} sm={6} md={4} key={app.id}>
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
						zIndex: -1,
					}}
				/>
			</Box>
		</Grid>
	);

	return (
		<Container sx={{ pb: 5 }}>
			<Grid
				data-cy="created-dapps-overview"
				container
				spacing={gridSpacing}
				justifyContent="center"
				alignItems="center"
			>
				{listApps()}
				{projects.length === 0 && welcome}
			</Grid>
			<ProfileDialog context={context} />
		</Container>
	);
};

export default Projects;
