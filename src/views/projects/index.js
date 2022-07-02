// material-ui
import { styled } from "@mui/material/styles";

// project imports
import Footer from "views/landing/Footer";
import Projects from "views/projects/Projects";
import AppBar from "common/AppBar";
import { Box } from "@mui/material";

const HeaderWrapper = styled("div")(({ theme }) => ({
	paddingTop: 30,
	overflowX: "hidden",
	overflowY: "clip",
	[theme.breakpoints.down("md")]: {
		paddingTop: 42,
	},
}));

const SecondWrapper = styled("div")(({ theme }) => ({
	paddingTop: 160,
	minHeight: 700,
	[theme.breakpoints.down("md")]: {
		paddingTop: 60,
	},
}));

// =============================|| LANDING MAIN ||============================= //

const ProjectsPage = () => (
	<>
		<HeaderWrapper>
			<Box className="project-bg image-bg" />
			<AppBar />
		</HeaderWrapper>
		<SecondWrapper>
			<Projects />
		</SecondWrapper>
		<Footer />
	</>
);

export default ProjectsPage;
