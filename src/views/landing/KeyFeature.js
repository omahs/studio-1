// material-ui
import { Container, Grid, Typography } from "@mui/material";
// project imports
import { gridSpacing } from "store/constant";
// assets
import communityImage from "assets/images/landing/community.png";
import DiscordButton from "views/landing/Discord";

// ============================|| LANDING - KEY FEATURE PAGE ||============================ //

const KeyFeaturePage = () => {
	return (
		<Container sx={{ position: "relative" }}>
			<Grid
				container
				justifyContent="center"
				spacing={gridSpacing}
				sx={{ textAlign: "center" }}
			>
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
