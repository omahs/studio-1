import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { UPDATE_APP } from "store/actions";
import moment from "moment";
import { utils } from "react-dappify";
import { getUrl } from "utils/url";

const { getImage } = utils.image;

const DetailsApp = ({ project = {} }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [selected, setSelected] = useState();

	const selectProject = (appConfig) => {
		dispatch({ type: UPDATE_APP, configuration: appConfig });
		navigate(`/studio/overview`);
	};

	const fontColor =
		project.config.theme?.palette?.mode !== "dark" ? "#000" : "#fff";
	const backgroundColor =
		project.config.theme?.palette?.mode === "dark" ? "#222" : "#fff";

	return (
		<Paper
			data-cy={`${project.config.name} box`}
			className="bordered"
			sx={{
				borderRadius: 2,
				p: 3,
				position: "relative",
				background: backgroundColor,
				color: fontColor,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				cursor: "pointer"
			}}
			onClick={() => selectProject(project.config)}
			onMouseOver={() => setSelected(project.config.subdomain)}
			onMouseOut={() => setSelected()}
			elevation={selected === project.config.subdomain ? 5 : 0}
		>
			<Grid container spacing={0.3}>
				<Grid item xs={12} sx={{ height: 54 }}>
					{/* <QRCode size="128" value={getAppUrl(app.id)} /> */}
					<img
						src={getImage(project.config.logo)}
						alt="banner"
						style={{
							maxHeight: "54px",
							padding: "2px 0px",
							maxWidth: "50%"
						}}
					/>
				</Grid>
				<Grid item sx={{ mb: 3 }} xs={12}>
					<Typography variant="h3" sx={{ color: fontColor }}>
						{project.config.name}
					</Typography>
					<Typography variant="h6" fontSize="1em">
						<Button
							sx={{ textTransform: "none" }}
							href={getUrl(project.config.subdomain)}
						>
							{getUrl(project.config.subdomain)}
						</Button>
					</Typography>
				</Grid>
				<Typography fontSize="1em">
					Last updated {moment(project.updatedAt).format("lll")}
				</Typography>
			</Grid>
		</Paper>
	);
};

export default DetailsApp;
