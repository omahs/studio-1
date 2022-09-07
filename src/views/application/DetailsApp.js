import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Typography, Button, Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import { UPDATE_APP } from "store/actions";
import moment from "moment";
import { utils } from "react-dappify";
import { getUrl, getEditorUrl } from "utils/url";
import constants from "constant";
const { getImage } = utils.image;
const { EDITOR } = constants;

const DetailsApp = ({ project = {} }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [selected, setSelected] = useState();

	const selectProject = (appConfig) => {
		dispatch({ type: UPDATE_APP, configuration: appConfig });
		navigate(getEditorUrl(appConfig));
	};

	const fontColor =
		project.config.theme?.palette?.mode !== "dark" ? "#000" : "#fff";
	const backgroundColor =
		project.config.theme?.palette?.mode === "dark" ? "#222" : "#fff";

	const getEditor = () => {
		// Get editor from first template
		const templates = Object.keys(project.config.template);
		if (
			templates.length > 0 &&
			project.config.template[templates[0]].editor === EDITOR.BUILDER
		) {
			return (
				<Chip
					label="Drag & Drop Editor"
					variant="outlined"
					color="secondary"
					size="small"
				/>
			);
		} else {
			return (
				<Chip
					label="Legacy Editor"
					variant="outlined"
					color="secondary"
					size="small"
				/>
			);
		}
	};

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
				<Grid item xs={12} sx={{ height: 44 }}>
					{/* <QRCode size="128" value={getAppUrl(app.id)} /> */}
					<img
						src={getImage(project.config.logo)}
						alt="banner"
						style={{
							maxHeight: "44px",
							padding: "2px 0px",
							maxWidth: "50%"
						}}
					/>
				</Grid>
				<Grid item xs={12}>
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
				<Grid item xs={12} sx={{ mb: 1 }}>
					{getEditor()}
				</Grid>
				<Typography fontSize="1em">
					Last updated {moment(project.updatedAt).format("lll")}
				</Typography>
			</Grid>
		</Paper>
	);
};

export default DetailsApp;
