import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button, Tooltip, Paper } from "@mui/material";
import Logo from "common/Logo";
import { DappifyContext, supportedWallets } from "react-dappify";
import mixpanel from "mixpanel-browser";
import constants from "constant";

const { AUTH } = constants;
const destination = "/profile/admin";

const Signin = () => {
	const navigate = useNavigate();
	const { isAuthenticated, authenticate } = useContext(DappifyContext);

	useEffect(() => {
		if (isAuthenticated) {
			navigate(destination);
		}
	}, [isAuthenticated, navigate]);

	const signIn = async (wallet, walletProvider) => {
		try {
			console.log(wallet);
			const signupUser = await authenticate(wallet);
			// Is a new user?
			const signedEmail = signupUser.get("email");
			const targetEvent = signedEmail ? AUTH.SIGN_IN : AUTH.SIGN_UP;
			mixpanel.track(targetEvent, { provider: walletProvider });
			// Update provider
			signupUser.set("provider", walletProvider);
			await signupUser.save();
		} catch (e) {
			console.log(e);
		} finally {
		}
	};

	const renderSupportedWallets = () => {
		const list = [];
		supportedWallets.forEach((wallet) => {
			list.push(
				<Grid item xs={6} md={3} key={wallet.name}>
					<Tooltip title={wallet.description}>
						<Button
							id={`login-${wallet.id}-btn`}
							elevation={15}
							sx={{ p: 3, borderRadius: 4 }}
							variant="contained"
							color="secondary"
							fullWidth
							onClick={async () =>
								await signIn(wallet.payload, wallet.id)
							}
						>
							<Grid
								container
								direction="column"
								alignItems="left"
							>
								<Grid item>
									<img
										src={wallet.image}
										alt={`Sign in with ${wallet.name}`}
										height={64}
									/>
								</Grid>
								<Grid item>{wallet.name}</Grid>
							</Grid>
						</Button>
					</Tooltip>
				</Grid>
			);
		});
		return list;
	};

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			textAlign="center"
			sx={{
				background: " #4C27A5",
				height: "100vh"
			}}
		>
			<Paper
				elevation={15}
				sx={{
					maxWidth: 800,
					margin: "0 auto",
					padding: 5,
					borderRadius: 4
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={12} sx={{ justifyContent: "center" }}>
						<Box sx={{ justifyContent: "center" }}>
							<Logo />
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h1" fontWeight="light">
							Let's get started! first, connect your wallet
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Grid
							container
							spacing={2}
							justifyContent="center"
							alignItems="center"
						>
							{renderSupportedWallets()}
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default Signin;
