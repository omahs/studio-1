import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { UPDATE_APP } from "store/actions";
import { getUrl } from "utils/url";

const ProjectCard = ({ project = {} }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [selected, setSelected] = useState();

	const selectProject = (appConfig) => {
		dispatch({ type: UPDATE_APP, configuration: project });
		navigate(`/builder/${project?.id}`);
	};

	return (
		<Paper
			data-cy={`${project?.name} box`}
			className="bordered"
			sx={{
				borderRadius: 2,
				p: 3,
				position: "relative",
				background: "#27293D",
				color: "#1E1E2F",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				cursor: "pointer",
				height: 210
			}}
			onClick={() => selectProject(project)}
			onMouseOver={() => setSelected(project.subdomain)}
			onMouseOut={() => setSelected()}
			elevation={selected === project.subdomain ? 5 : 0}
		>
			<Grid container spacing={0.3}>
				{/*<Grid item xs={12} sx={{ height: 54 }}>
					<img
						src={projectConfig.logo}
						alt="banner"
						style={{
							maxHeight: "54px",
							padding: "2px 0px",
							maxWidth: "50%"
						}}
					/>
					</Grid>*/}
				<Grid item sx={{ mb: 0 }} xs={12}>
					<Typography variant="h3" sx={{ color: "#aaa" }}>
						{project.name}
					</Typography>
					<Typography variant="h6" fontSize="1em">
						<Button
							sx={{ textTransform: "none" }}
							href={getUrl(project.subdomain)}
						>
							{getUrl(project.subdomain)}
						</Button>
					</Typography>
				</Grid>
				{/*<Typography fontSize="1em">
					Last updated {moment(project.get('updatedAt')).format("lll")}
								</Typography>*/}
			</Grid>
		</Paper>
	);
};

export default ProjectCard;
