/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Grid, Typography, Tooltip, Button, Paper, Box } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Template } from "react-dappify";
import debounce from "lodash/debounce";
import constants from "constant";

const { EDITOR } = constants;

const TemplateView = ({ onTemplateSelect }) => {
	const [templates, setTemplates] = useState([]);
	const [selectedTemplate, setSelectedTemplate] = useState({});

	const projectInfo = `
    Start from ready made templates using our no code tools. From ready made template projects to custom made drag and drop editor, select the tool that fits your needs.
    `;

	useEffect(() => {
		const loadTemplates = debounce(async () => {
			const results = await Template.listTemplates({});
			setTemplates(results);
		}, 500);
		loadTemplates();
	}, []);

	useEffect(() => {
		if (selectedTemplate) {
			onTemplateSelect(selectedTemplate);
		}
	}, [selectedTemplate]);

	const blankTemplate = {
		id: EDITOR.BUILDER,
		editor: EDITOR.BUILDER
	};

	const renderTemplates = () => {
		const list = [
			<Grid item xs={12} sm={6} md={4} key={"custom"}>
				<Paper
					elevation={10}
					sx={{
						p: 2,
						background: `url(https://i.ibb.co/B3MKBxj/Screenshot-2022-09-07-at-09-55-27.png)`,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						height: "175px",
						position: "relative"
					}}
				>
					<Grid
						container
						spacing={1}
						sx={{ position: "absolute", bottom: "10px" }}
					>
						<Grid item xs={12} sx={{ px: 4 }}>
							<Button
								variant="contained"
								color={
									selectedTemplate?.id === blankTemplate.id
										? "secondary"
										: "primary"
								}
								fullWidth
								onClick={() =>
									setSelectedTemplate(blankTemplate)
								}
							>
								Blank Project
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		];

		templates.forEach((template) => {
			list.push(
				<Grid item xs={12} sm={6} md={4} key={template?.schema?.id}>
					<Paper
						elevation={10}
						sx={{
							p: 2,
							background: `url(${template?.schema?.image})`,
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
							height: "175px",
							position: "relative"
						}}
					>
						<Grid
							container
							spacing={1}
							sx={{ position: "absolute", bottom: "10px" }}
						>
							<Grid item xs={12} sx={{ px: 4 }}>
								<Button
									variant="contained"
									color={
										selectedTemplate?.id ===
										template.schema.id
											? "secondary"
											: "primary"
									}
									fullWidth
									data-cy={`${template?.schema?.name} Install Button`}
									onClick={() =>
										setSelectedTemplate(template.schema)
									}
								>
									{template?.schema?.name}
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			);
		});

		return list;
	};

	return (
		<Grid
			container
			direction="row"
			justifyContent="left"
			alignItems="left"
			spacing={2}
		>
			<Grid item xs={12}>
				<Typography variant="h1" fontWeight="regular" sx={{ mb: 5 }}>
					Pick your
					<Tooltip title={projectInfo}>
						<span className="project-keyword">
							template
							<HelpOutlineIcon />
						</span>
					</Tooltip>
				</Typography>
			</Grid>
			<Grid container spacing={1}>
				{renderTemplates()}
			</Grid>
		</Grid>
	);
};

export default TemplateView;
