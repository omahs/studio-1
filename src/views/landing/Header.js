import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
	Box,
	Button,
	Container,
	Grid,
	Typography,
	SvgIcon,
	Icon,
	TextField,
	InputAdornment
} from "@mui/material";

// third party
import { motion } from "framer-motion";

// project imports
import AnimateButton from "ui-component/extended/AnimateButton";
import { gridSpacing } from "store/constant";
import mockup from "assets/images/landing/banner.svg";
import DiscordButton from "views/landing/Discord";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

// ==============================|| LANDING - HEADER PAGE ||============================== //

const HeaderPage = () => {
	const theme = useTheme();
	const [claim, setClaim] = useState();

	const styles = {
		container: {
			display: "flex",
			flexWrap: "wrap"
		},
		textField: {
			width: 300,
			margin: 100
		},
		//style for font size
		resize: {
			fontSize: 50
		}
	};

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
												xs: "2.25rem",
												sm: "2.5rem",
												md: "3.5rem",
												color: "#fff"
											},
											fontWeight: 900,
											lineHeight: 1
										}}
									>
										<span style={{ opacity: 0.85 }}>
											The simplest way
											<br />
											to build
										</span>{" "}
										<span>
											<i>Web3 Apps</i>
										</span>
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
										Launch your MVP in minutes, for free,
										without writing any code. Powered by
										1-click install smart templates
										maintained by the community.
									</Typography>
								</motion.div>
							</Grid>

							<Grid item xs={12} sx={{ my: 3.25 }}>
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
									<Grid item xs={12} sm={6}>
										<AnimateButton>
											<TextField
												placeholder="yourname"
												fullWidth
												onChange={(e) =>
													setClaim(e.target.value)
												}
												sx={{
													borderRadius: "8px",
													overflow: "hidden",
													input: {
														"&::placeholder": {
															fontSize: "1.2em",
															color: "rgba(0,0,0,0.5)"
														}
													}
												}}
												inputProps={{
													style: {
														fontSize: "1.3em"
													}
												}} // font size of input text
												InputProps={{
													fontSize: "2em",
													startAdornment: (
														<InputAdornment
															position="start"
															sx={{ mr: 0 }}
														>
															<span
																style={{
																	fontSize:
																		"1.3em",
																	fontWeight:
																		"100"
																}}
															>
																dappify.com/
															</span>
														</InputAdornment>
													)
												}}
											/>
										</AnimateButton>
									</Grid>

									<Grid item xs={12} sm={6}>
										<AnimateButton>
											<Button
												component={RouterLink}
												to={
													claim
														? `/signup/${claim}`
														: "signup"
												}
												variant="contained"
												size="large"
												className="join__discord"
												id="start-building-btn"
												color="primary"
												fullWidth
												sx={{
													py: 1.5,
													fontSize: "1.3em",
													borderRadius: 30
												}}
											>
												Claim your Dappify 🏆
											</Button>
										</AnimateButton>
									</Grid>
								</Grid>
							</Grid>

							{/* <Grid item xs={12} sx={{ my: 3.25 }}>
                                <Grid container spacing={2} sx={{ justifyContent: { xs: 'center', lg: 'flex-start' } }}>
                                    <Grid item xs={12} md={6}>
                                        <AnimateButton>
                                            <DiscordButton />

                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                    <AnimateButton>

                                        <Button
                                            component={RouterLink}
                                            to="/projects" 
                                            variant="contained"
                                            size="large"
                                            className="join__discord"
                                            id="start-building-btn"
                                            color="primary"
                                            fullWidth
                                            sx={{ px: 5, py: 2 }}
                                            endIcon={
                                                <AutoFixHighIcon />
                                            }
                                        >
                                            Start Building
                                        </Button>

                                    </AnimateButton>
                                </Grid>

                                </Grid>
                                        </Grid>*/}
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
								src={mockup}
								alt="Dappify"
								style={{ width: "115%" }}
							/>
						</Box>
					</Grid>
				</Grid>
			</motion.div>
		</Container>
	);
};

export default HeaderPage;
