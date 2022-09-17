// material-ui
import { Paper, Container, Grid, Typography } from "@mui/material";
// project imports
import { gridSpacing } from "store/constant";
// assets
import template1 from "assets/images/template1.png";
import landingVideo from "assets/videos/Build.mp4";

// =============================|| LANDING - FEATURE PAGE ||============================= //

const FeaturePage = () => {
	return (
		<Container>
			<Grid
				container
				justifyContent="center"
				spacing={gridSpacing}
				sx={{ textAlign: "center" }}
			>
				<Grid item sx={{ mb: 5 }}></Grid>
				<Grid item xs={12}>
					<Grid
						container
						justifyContent="center"
						spacing={gridSpacing}
						sx={{ textAlign: "center" }}
					>
						<Grid item xs={12} md={6}>
							<Grid item xs={12} sx={{ mt: 5, mb: 3 }}>
								<Typography
									className="landing-title"
									component="h1"
								>
									Start from templates!
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography
									className="landing-description"
									sx={{ color: "#222", textAlign: "left" }}
									component="h2"
								>
									Don't start from scratch!. Launch Landing
									Pages, NFT Marketplaces, NFT Minters,
									Payments solutions, DAOs and more from ready
									made templates.
									<br />
									<br />
									Templates offer pre-launched smart contracts
									so you don't have to pay for the deployment
									yourself but you are always free to launch
									your own version.
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs={12} md={6}>
							<Paper
								sx={{
									p: 0,
									width: "85%",
									height: 375,
									background: `url(${template1})`,
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									borderRadius: 6,
									overflow: "hidden",
									margin: "0 auto"
								}}
								elevation={20}
							/>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} sx={{ mt: 20 }}>
					<Grid
						container
						justifyContent="center"
						spacing={gridSpacing}
						sx={{ textAlign: "center" }}
					>
						<Grid item xs={6}>
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
						</Grid>

						<Grid item xs={12} md={6}>
							<Grid item xs={12} sx={{ mt: 5, mb: 3 }}>
								<Typography
									className="landing-title"
									component="h1"
								>
									Launch with 1-click
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography
									className="landing-description"
									sx={{ color: "#222", textAlign: "left" }}
									component="h2"
								>
									Craft and launch web3 projects, from
									templates, without having to write a single
									line of code. Dappify lowers the entry
									barrier for builders into web3 by
									abstracting them on the complexities of
									blockchain & UX with pre-built templates
									they can adapt for their own needs that
									offer an ultra friendly end experience for
									their users.
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default FeaturePage;
