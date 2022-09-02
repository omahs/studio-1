// material-ui
import { useTheme } from "@mui/material/styles";
import {
	Avatar,
	Button,
	Container,
	Grid,
	Box,
	Typography
} from "@mui/material";

// project imports
import FadeInWhenVisible from "./Animation";
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import { gridSpacing } from "store/constant";

// assets
import SpeedIcon from "@mui/icons-material/Speed";
import MonetizableIcon from "@mui/icons-material/AttachMoneyTwoTone";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import SignalCellularNodataIcon from "@mui/icons-material/SignalCellularNodata";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ShieldIcon from "@mui/icons-material/Shield";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import landingVideo from "assets/videos/Build.mp4";
import communityImage from "assets/images/landing/community.png";

import DiscordButton from "views/landing/Discord";

// ============================|| LANDING - KEY FEATURE PAGE ||============================ //

const KeyFeaturePage = () => {
	const theme = useTheme();
	const avatarIconSx = {
		...theme.typography.commonAvatar,
		cursor: "initial",
		width: 72,
		height: 72
	};

	return (
		<Container sx={{ position: "relative" }}>
			<Grid
				container
				justifyContent="center"
				spacing={gridSpacing}
				sx={{ textAlign: "center" }}
			>
				{/*}
				<Grid item xs={12}>
					<Grid item xs={12} sx={{ mt: 0, mb: 3 }}>
						<Typography className="landing-title" component="h1">
							Simple yet Flexible, Free yet Priceless
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography
							className="landing-description"
							component="h2"
						>
							Craft and launch web3 projects, from templates,
							without having to write a single line of code.
							Dappify lowers the entry barrier for builders into
							web3 by abstracting them on the complexities of
							blockchain & UX with pre-built templates they can
							adapt for their own needs that offer an ultra
							friendly end experience for their users.
						</Typography>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<video
						loop
						autoPlay="autoplay"
						muted
						style={{
							borderRadius: 6,
							width: "100%",
							height: "auto",
							maxWidth: 800,
							border: "1px solid rgba(0,0,0,0.15)"
						}}
					>
						<source src={landingVideo} type="video/mp4" />
						Your browser does not support HTML video.
					</video>
					</Grid>*/}

				<Grid item xs={12}>
					<Grid container>
						<Grid item xs={12} md={6}>
							<img
								src={communityImage}
								alt="Astronaut"
								style={{ width: "100%" }}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<Grid item xs={12} sx={{ mt: 5, mb: 3 }}>
								<Typography
									component="h1"
									fontSize="3em"
									fontWeight="bold"
								>
									Join the most helpful web3 community of
									builders
								</Typography>
							</Grid>
							<Grid item xs={12} sx={{ textAlign: "left" }}>
								<Typography
									className="landing-description"
									component="h2"
								>
									We are a community of builders first. From
									enthusiasts and hackathonists to
									professional product and technical founders,
									we love to share and help you ship your
									project!
									<br />
									<br />- Learn web3 by doing
									<br />- Get direction on your project or MVP
									<br />- Learn to use our tools to iterate
									faster
									<br />- Get feedback on new features or
									ideas
									<br />- Get some early users and testers
								</Typography>
							</Grid>
							<Grid item sx={{ mt: 6 }}>
								<DiscordButton />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default KeyFeaturePage;
