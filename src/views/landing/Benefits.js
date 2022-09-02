// material-ui
import { useEffect, useState } from "react";
import {
	Paper,
	Container,
	Grid,
	Typography,
	Box,
	Chip,
	Button,
	Avatar
} from "@mui/material";
import { useDispatch } from "react-redux";
// project imports
import FadeInWhenVisible from "./Animation";
import SubCard from "ui-component/cards/SubCard";
import { gridSpacing } from "store/constant";

import { useTheme } from "@mui/material/styles";

import templateNftMarketplace from "assets/images/marketplace.jpeg";

import { SNACKBAR_OPEN } from "store/actions";
// assets
import background from "assets/images/landing/bg.svg";
import { useMoralis } from "react-moralis";

import imageBooking from "assets/images/booking.jpeg";
import imageTicket from "assets/images/ticket.jpeg";
import imagePayment from "assets/images/payment.jpeg";
import imageBlog from "assets/images/blog.jpeg";
import imageLanding from "assets/images/landing.jpeg";
import imageChat from "assets/images/chat.jpeg";
import imageMembership from "assets/images/membership.jpeg";

import SpeedIcon from "@mui/icons-material/Speed";
import MonetizableIcon from "@mui/icons-material/AttachMoneyTwoTone";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import SignalCellularNodataIcon from "@mui/icons-material/SignalCellularNodata";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ShieldIcon from "@mui/icons-material/Shield";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import PeopleIcon from "@mui/icons-material/People";

import template1 from "assets/images/template1.png";

// =============================|| LANDING - FEATURE PAGE ||============================= //

const Benefits = () => {
	const theme = useTheme();
	const avatarIconSx = {
		...theme.typography.commonAvatar,
		cursor: "initial",
		width: 72,
		height: 72
	};

	return (
		<Container>
			<Grid
				container
				justifyContent="center"
				spacing={gridSpacing}
				sx={{ textAlign: "center" }}
			>
				<Grid item xs={12}>
					<Grid
						container
						justifyContent="center"
						spacing={gridSpacing}
						sx={{ textAlign: "center" }}
					>
						<Grid item xs={12}>
							<Grid item sx={{ mb: 5 }}>
								<Grid item xs={12} sx={{ mt: 5, mb: 3 }}>
									<Typography
										className="landing-title-white"
										component="h1"
										fontSize="2.5em"
									>
										Why build with Dappify?
									</Typography>
								</Grid>
							</Grid>
							<Grid
								container
								justifyContent="center"
								spacing={gridSpacing}
							>
								<Grid item lg={3} md={4} xs={12} sm={6}>
									<FadeInWhenVisible>
										<SubCard>
											<Grid
												container
												alignItems="center"
												spacing={2}
											>
												<Grid item>
													<Avatar
														variant="rounded"
														sx={{
															...avatarIconSx,
															bgcolor:
																theme.palette
																	.mode ===
																"dark"
																	? theme
																			.palette
																			.dark[800]
																	: "primary.light",
															color: theme.palette
																.primary.main
														}}
													>
														<SpeedIcon fontSize="large" />
													</Avatar>
												</Grid>
												<Grid
													item
													xs
													zeroMinWidth
													className="landing-description"
												>
													1-click deploy
												</Grid>
											</Grid>
										</SubCard>
									</FadeInWhenVisible>
								</Grid>
								<Grid item lg={3} md={4} xs={12} sm={6}>
									<FadeInWhenVisible>
										<SubCard>
											<Grid
												container
												alignItems="center"
												spacing={2}
											>
												<Grid item>
													<Avatar
														variant="rounded"
														sx={{
															...avatarIconSx,
															bgcolor:
																theme.palette
																	.mode ===
																"dark"
																	? theme
																			.palette
																			.dark[900]
																	: "secondary.light",
															color: theme.palette
																.secondary.main
														}}
													>
														<MonetizableIcon fontSize="large" />
													</Avatar>
												</Grid>
												<Grid
													item
													xs
													zeroMinWidth
													className="landing-description"
												>
													Free
												</Grid>
											</Grid>
										</SubCard>
									</FadeInWhenVisible>
								</Grid>
								<Grid item lg={3} md={4} xs={12} sm={6}>
									<FadeInWhenVisible>
										<SubCard>
											<Grid
												container
												alignItems="center"
												spacing={2}
											>
												<Grid item>
													<Avatar
														variant="rounded"
														sx={{
															...avatarIconSx,
															bgcolor:
																theme.palette
																	.mode ===
																"dark"
																	? theme
																			.palette
																			.dark[800]
																	: "primary.light",
															color: theme.palette
																.primary.main
														}}
													>
														<AspectRatioIcon fontSize="large" />
													</Avatar>
												</Grid>
												<Grid
													item
													xs
													zeroMinWidth
													className="landing-description"
												>
													Brandable
												</Grid>
											</Grid>
										</SubCard>
									</FadeInWhenVisible>
								</Grid>
								<Grid item lg={3} md={4} xs={12} sm={6}>
									<FadeInWhenVisible>
										<SubCard>
											<Grid
												container
												alignItems="center"
												spacing={2}
											>
												<Grid item>
													<Avatar
														variant="rounded"
														sx={{
															...avatarIconSx,
															bgcolor:
																theme.palette
																	.mode ===
																"dark"
																	? theme
																			.palette
																			.dark[900]
																	: "secondary.light",
															color: theme.palette
																.secondary.main
														}}
													>
														<SettingsIcon fontSize="large" />
													</Avatar>
												</Grid>
												<Grid
													item
													xs
													zeroMinWidth
													className="landing-description"
												>
													Configurable
												</Grid>
											</Grid>
										</SubCard>
									</FadeInWhenVisible>
								</Grid>
								<Grid item lg={3} md={4} xs={12} sm={6}>
									<FadeInWhenVisible>
										<SubCard>
											<Grid
												container
												alignItems="center"
												spacing={2}
											>
												<Grid item>
													<Avatar
														variant="rounded"
														sx={{
															...avatarIconSx,
															bgcolor:
																theme.palette
																	.mode ===
																"dark"
																	? theme
																			.palette
																			.dark[900]
																	: "secondary.light",
															color: theme.palette
																.secondary.main
														}}
													>
														<CodeOffIcon fontSize="large" />
													</Avatar>
												</Grid>
												<Grid
													item
													xs
													zeroMinWidth
													className="landing-description"
												>
													No-code
												</Grid>
											</Grid>
										</SubCard>
									</FadeInWhenVisible>
								</Grid>

								<Grid item lg={3} md={4} xs={12} sm={6}>
									<FadeInWhenVisible>
										<SubCard>
											<Grid
												container
												alignItems="center"
												spacing={2}
											>
												<Grid item>
													<Avatar
														variant="rounded"
														sx={{
															...avatarIconSx,
															bgcolor:
																theme.palette
																	.mode ===
																"dark"
																	? theme
																			.palette
																			.dark[800]
																	: "primary.light",
															color: theme.palette
																.primary.main
														}}
													>
														<PeopleIcon fontSize="large" />
													</Avatar>
												</Grid>
												<Grid
													item
													xs
													zeroMinWidth
													className="landing-description"
												>
													Community-driven
												</Grid>
											</Grid>
										</SubCard>
									</FadeInWhenVisible>
								</Grid>
								<Grid item lg={3} md={4} xs={12} sm={6}>
									<FadeInWhenVisible>
										<SubCard>
											<Grid
												container
												alignItems="center"
												spacing={2}
											>
												<Grid item>
													<Avatar
														variant="rounded"
														sx={{
															...avatarIconSx,
															bgcolor:
																theme.palette
																	.mode ===
																"dark"
																	? theme
																			.palette
																			.dark[900]
																	: "secondary.light",
															color: theme.palette
																.secondary.main
														}}
													>
														<DashboardCustomizeIcon fontSize="large" />
													</Avatar>
												</Grid>
												<Grid
													item
													xs
													zeroMinWidth
													className="landing-description"
												>
													Modular
												</Grid>
											</Grid>
										</SubCard>
									</FadeInWhenVisible>
								</Grid>
								<Grid item lg={3} md={4} xs={12} sm={6}>
									<FadeInWhenVisible>
										<SubCard>
											<Grid
												container
												alignItems="center"
												spacing={2}
											>
												<Grid item>
													<Avatar
														variant="rounded"
														sx={{
															...avatarIconSx,
															background:
																theme.palette
																	.mode ===
																"dark"
																	? theme
																			.palette
																			.dark[800]
																	: "primary.light",
															color: theme.palette
																.primary.main
														}}
													>
														<ShieldIcon fontSize="large" />
													</Avatar>
												</Grid>
												<Grid
													item
													xs
													zeroMinWidth
													className="landing-description"
												>
													Secure
												</Grid>
											</Grid>
										</SubCard>
									</FadeInWhenVisible>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Benefits;
