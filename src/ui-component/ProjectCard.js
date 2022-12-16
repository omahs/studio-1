import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { UPDATE_APP } from "store/actions";
import moment from "moment";
import { getUrl } from "utils/url";


const ProjectCard = ({ project = {} }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [selected, setSelected] = useState();

	const projectConfig = project?.get('config');
	const selectProject = (appConfig) => {
		dispatch({ type: UPDATE_APP, configuration: appConfig });
		navigate(`/builder/${appConfig?.appId}`);
	};

	return (
		<Paper
			data-cy={`${projectConfig?.name} box`}
			className="bordered"
			sx={{
				borderRadius: 2,
				p: 3,
				position: "relative",
				background: "#fff",
				color: "#222",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				cursor: "pointer",
				height: 210
			}}
			onClick={() => selectProject(projectConfig)}
			onMouseOver={() => setSelected(projectConfig.subdomain)}
			onMouseOut={() => setSelected()}
			elevation={selected === projectConfig.subdomain ? 5 : 0}
		>
			<Grid container spacing={0.3}>
				<Grid item xs={12} sx={{ height: 54 }}>
					<img
						src={projectConfig.logo}
						alt="banner"
						style={{
							maxHeight: "54px",
							padding: "2px 0px",
							maxWidth: "50%"
						}}
					/>
				</Grid>
				<Grid item sx={{ mb: 0 }} xs={12}>
					<Typography variant="h3" sx={{ color: "#222" }}>
						{projectConfig.name}
					</Typography>
					<Typography variant="h6" fontSize="1em">
						<Button
							sx={{ textTransform: "none" }}
							href={getUrl(projectConfig.subdomain)}
						>
							{getUrl(projectConfig.subdomain)}
						</Button>
					</Typography>
					<Grid item sx={{ height: 20, mb: 2 }} xs={12}>
						{project?.hash && (
							<Typography variant="h6" fontSize="0.7em">
								<Button
									sx={{
										textTransform: "none",
										fontSize: "1em"
									}}
									href={project?.url}
								>
									{`ipfs/${project.get('hash')}`}
								</Button>
							</Typography>
						)}
					</Grid>
				</Grid>
				<Typography fontSize="1em">
					Last updated {moment(project.get('updatedAt')).format("lll")}
				</Typography>
			</Grid>
		</Paper>
	);
};

export default ProjectCard;
