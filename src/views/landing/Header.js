import { Link as RouterLink } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

// third party
import { motion } from "framer-motion";

// project imports
import AnimateButton from "ui-component/extended/AnimateButton";
import { gridSpacing } from "store/constant";
import astronaut from "assets/images/landing/astronaut.png";

// ==============================|| LANDING - HEADER PAGE ||============================== //

const HeaderPage = () => {
	const theme = useTheme();

	return (
		<Container>
			<motion.div
				initial={{ opacity: 0, translateY: 550 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{
					type: "spring",
					stiffness: 150,
					damping: 30,
					delay: 0.4
				}}
			>
				<Grid
					container
					alignItems="center"
					justifyContent="space-between"
					spacing={gridSpacing}
					sx={{
						mt: { xs: 5, sm: 6, md: 10 },
						mb: { xs: 2.5, md: 10 }
					}}
				>
					<Grid item xs={12} lg={6}>
						<Grid
							container
							spacing={gridSpacing}
							sx={{
								pr: 5,
								[theme.breakpoints.down("lg")]: {
									pr: 0,
									textAlign: "center"
								}
							}}
						>
							<Grid item xs={12}>
								<motion.div
									initial={{ opacity: 0, translateY: 550 }}
									animate={{ opacity: 1, translateY: 0 }}
									transition={{
										type: "spring",
										stiffness: 150,
										damping: 30
									}}
								>
									<Typography
										variant="h1"
										sx={{
											fontSize: {
												xs: "4.1rem",
												color: "#fff"
											},
											fontWeight: 900,
											lineHeight: 1
										}}
									>
										<span style={{ opacity: 1 }}>
											Let's launch that project, today!
										</span>{" "}
										<br />
									</Typography>
								</motion.div>
							</Grid>
							<Grid item xs={12}>
								<motion.div
									initial={{ opacity: 0, translateY: 550 }}
									animate={{ opacity: 1, translateY: 0 }}
									transition={{
										type: "spring",
										stiffness: 150,
										damping: 30,
										delay: 0.2
									}}
								>
									<Typography
										variant="body"
										component="h2"
										color="inherit"
										sx={{
											fontSize: "1.6em",
											fontWeight: "light",
											lineHeight: 1.4,
											color: "white"
										}}
									>
										Everything you need to design, build and
										launch your web3 apps, without code in
										1-click.
									</Typography>
								</motion.div>
							</Grid>

							<Grid item xs={12} sx={{ my: 4.25 }}>
								<Grid
									container
									spacing={2}
									sx={{
										justifyContent: {
											xs: "center",
											lg: "flex-start"
										}
									}}
								>
									<Grid item>
										<AnimateButton>
											<Button
												component={RouterLink}
												to="/profile/admin"
												variant="contained"
												size="large"
												className="join__discord"
												id="start-building-btn"
												color="primary"
												fullWidth
												sx={{
													px: 5,
													py: 2,
													fontSize: "1.5em",
													textTransform: "none"
												}}
											>
												Launch a Project{" "}
												<Typography
													fontSize="1.25em"
													sx={{ ml: 1 }}
												>
													{" "}
													🚀
												</Typography>
											</Button>
										</AnimateButton>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						xs={12}
						lg={6}
						sx={{ display: { md: "flex" }, maxWidth: "100%" }}
					>
						<Box
							sx={{ position: "relative" }}
							style={{ textAlign: "center", margin: "0 auto" }}
						>
							<img
								src={astronaut}
								alt="Astronaut"
								style={{ width: "100%" }}
							/>
						</Box>
					</Grid>
				</Grid>
			</motion.div>
		</Container>
	);
};

export default HeaderPage;
