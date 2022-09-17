// material-ui
import { Container, Grid, Typography } from "@mui/material";
// project imports
import { gridSpacing } from "store/constant";

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
				<Grid item xs={12}>
					<Grid item xs={12} sx={{ mt: 5, mb: 5 }}>
						<Typography component="h1" fontSize="2.5em">
							A web3 native drag & drop website builder
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography
							className="landing-description"
							sx={{ color: "white", textAlign: "left" }}
							component="h2"
						>
							Dappify is a multi-purpose web3 builder platform
							with composable modules, similar to “legos”, that
							users drag and drop into a canvas for a WYSIWYG
							experience. These modules are composable and
							interoperable meaning they can talk to each other,
							share context and enrich data. It makes very easy
							creating rich templates for dApps, landing pages,
							NFT minting sites and marketplaces and more. Learn
							more about our{" "}
							<a
								href="https://ethglobal.com/showcase/build3r-awy06"
								target="_blank"
								rel="noreferrer"
							>
								builder
							</a>
						</Typography>
					</Grid>
				</Grid>

				<Grid item xs={12} sx={{ mt: 5 }}>
					<Grid
						container
						justifyContent="center"
						spacing={gridSpacing}
						sx={{ textAlign: "center" }}
					>
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
								<source
									src="https://video.twimg.com/ext_tw_video/1549078955239563264/pu/vid/1280x720/2V1wCcNKqtVjtQpA.mp4?tag=12"
									type="video/mp4"
								/>
								Your browser does not support HTML video.
							</video>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default FeaturePage;
