import { useEffect, useState } from "react";
import { Typography, Grid, Container, Box, Paper } from "@mui/material";
import ProjectCard from "ui-component/ProjectCard";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";

const Projects = () => {
	const { isAuthenticated, user, Moralis } = useMoralis();
	const navigate = useNavigate();
	const theme = useTheme();
	const [projects, setProjects] = useState([]);
	const [selected, setSelected] = useState();

	const listAll = async () => {
		const query = new Moralis.Query("Project");
		query.equalTo("owner", user);
		query.descending("updatedAt");
		const list = await query.find();
		setProjects(list);
	};

	const loadApps = async () => {
		if (isAuthenticated) {
			listAll();
		} else {
			setProjects([]);
		}
	};

	useEffect(() => {
		loadApps();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

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
						<ProjectCard project={app} />
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
