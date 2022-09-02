// material-ui
import { styled } from "@mui/material/styles";

// project imports
import Header from "./Header";
import Feature from "./Feature";
import KeyFeature from "./KeyFeature";
import Benefits from "./Benefits";
import Steps from "./Steps";
import Subscribe from "./Subscribe";
import Footer from "./Footer";
import Editor from "./Editor";
import Tools from "views/landing/Tools";
import AppBar from "common/AppBar";
import { Box } from "@mui/material";
import background3 from "assets/images/landing/bg4.svg";

const HeaderWrapper = styled("div")(({ theme }) => ({
	paddingTop: 30,
	overflowX: "hidden",
	overflowY: "clip",
	[theme.breakpoints.down("md")]: {
		paddingTop: 42
	},
	background: "#D23CFF"
}));

const SecondWrapper = styled("div")(({ theme }) => ({
	paddingTop: 160,
	[theme.breakpoints.down("md")]: {
		paddingTop: 60
	},
	background: "#3CAAFF",
	color: "white"
}));

const ThirdWrapper = styled("div")(({ theme }) => ({
	paddingTop: 160,
	[theme.breakpoints.down("md")]: {
		paddingTop: 60
	},
	background: "white",
	color: "#222"
}));

const FourthWrapper = styled("div")(({ theme }) => ({
	paddingTop: 160,
	[theme.breakpoints.down("md")]: {
		paddingTop: 60
	},
	background: "#111",
	color: "white"
}));

// =============================|| LANDING MAIN ||============================= //

const Landing = () => (
	<>
		<HeaderWrapper sx={{ minHeight: "1050px", pt: 12 }}>
			<AppBar />
			<Header />
		</HeaderWrapper>
		<SecondWrapper sx={{ minHeight: "1050px", py: 30 }}>
			<KeyFeature />
		</SecondWrapper>
		<ThirdWrapper sx={{ minHeight: "1050px", pt: 20, pb: 30 }}>
			<Feature />
		</ThirdWrapper>
		<FourthWrapper sx={{ minHeight: "850px", pt: 20, pb: 30 }}>
			<Editor />
		</FourthWrapper>
		<SecondWrapper sx={{ minHeight: "850px", py: 20 }}>
			<Benefits />
		</SecondWrapper>
		<ThirdWrapper sx={{ minHeight: "850px", pt: 20, pb: 10 }}>
			<Box sx={{ position: "relative" }}>
				<Box className="landing-dark">
					<img src={background3} alt="background" width="100%" />
				</Box>
			</Box>
			<Tools />
		</ThirdWrapper>
		<SecondWrapper>
			<Steps />
		</SecondWrapper>
		<SecondWrapper>
			<Subscribe />
		</SecondWrapper>
		<Footer />
	</>
);

export default Landing;
