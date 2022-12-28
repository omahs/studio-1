import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { UPDATE_APP } from "store/actions";
import moment from "moment";
import { getUrl } from "utils/url";
import axios from "axios";

const ProjectCard = ({ project = {} }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [selected, setSelected] = useState();
	const [cid, setCid] = useState();
	// console.log(project);
	// const projectConfig = project?.get('config');
	const selectProject = (appConfig) => {
		dispatch({ type: UPDATE_APP, configuration: project });
		navigate(`/builder/${project?.id}`);
	};

	const loadCid = async() => {
		try{
			const response = await axios.get(`${process.env.REACT_APP_DAPPIFY_API_URL}/route/${getUrl(project.subdomain)}`,
			{
				headers: {
					"X-Api-Key": process.env.REACT_APP_DAPPIFY_API_KEY,
					"Content-Type": "application/json",
					"Accept": "application/json"
				}
			});
			setCid(response?.data?.cid);
		} catch(e) {
			console.log(e);
		}
	}

	useEffect(() => {
		loadCid();
	}, []);

	return (
		<Paper
			data-cy={`${project?.name} box`}
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
					<Typography variant="h3" sx={{ color: "#222" }}>
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
					<Grid item sx={{ height: 20, mb: 2 }} xs={12}>
						{cid && (
							<Typography variant="h6" fontSize="0.7em">
								<Button
									sx={{
										textTransform: "none",
										fontSize: "0.8em"
									}}
									href={project?.get('url')}
								>
									{`ipfs/${cid}`}
								</Button>
							</Typography>
						)}
					</Grid>
				</Grid>
				{/*<Typography fontSize="1em">
					Last updated {moment(project.get('updatedAt')).format("lll")}
								</Typography>*/}
			</Grid>
		</Paper>
	);
};

export default ProjectCard;
