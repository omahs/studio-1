import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Grid, Typography, Button, Tooltip, Paper, Avatar, CircularProgress } from "@mui/material";
import Logo from "common/Logo";
import { supportedWallets } from "react-dappify";
import { SNACKBAR_OPEN } from "store/actions";
import { useMoralis } from 'react-moralis';
const destination = "/profile/projects";

const Signin = () => {
	const navigate = useNavigate();
	const { isAuthenticated, authenticate, logout } = useMoralis();
	const [originUser, setOriginUser] = useState({});
	const dispatch = useDispatch();

	/**
	 * Only users redirected from main website are allowed, providing (uid, name, email and photo)
	 */
	const validateOriginParams = () => {
		if (isAuthenticated) {
			navigate(destination);
		}
		const params = new URLSearchParams(document.location.search);
		const usr = {
			uid: params.get('uid'),
			name: params.get('name'),
			email: params.get('email'),
			photo: params.get('photo')
		}
		setOriginUser(usr);
		if (!isAuthenticated && (!usr.uid || !usr.email)) {
			// Need to authenticate from website
			window.location.href = 'https://dappify.com';
		}
	}

	useEffect(() => {
		validateOriginParams();
	}, []);


	const signIn = async (wallet, walletProvider) => {
		try {
			const signupUser = await authenticate(wallet);
			const existingProfile = signupUser.get("profile") || {};
			existingProfile.image = originUser.photo;
			signupUser.set("provider", walletProvider);
			signupUser.set("email", originUser.email);
			signupUser.set("username", originUser.uid);
			signupUser.set("nickname", originUser.name);
			signupUser.set("profile", existingProfile);
			await signupUser.save();
			navigate(destination);
		} catch (e) {
			dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: e.message,
				variant: "alert",
				anchorOrigin: { vertical: "bottom", horizontal: "right" },
				alertSeverity: "error"
			});
			logout();
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
							disabled={isAuthenticated || !originUser.uid}
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
			className="signin-container"
		>
			<Paper
				elevation={15}
				sx={{
					maxWidth: 800,
					margin: "0 auto",
					padding: 5,
					borderRadius: 4
				}}
				className="glass-container"
			>
				<Grid container spacing={2}>
					<Grid item xs={12} sx={{ justifyContent: "center" }}>
						<Box sx={{ justifyContent: "center" }}>
							<Logo />
						</Box>
					</Grid>
					<Grid item xs={12} sx={{ justifyContent: "center" }}>
						<Box sx={{ justifyContent: "center", width: '250px', margin: '0 auto' }}>
							{originUser.uid && (
								<Grid container>
									<Grid item>
										<Avatar alt={originUser?.name} src={originUser?.photo} ></Avatar>
									</Grid>
									<Grid item sx={{ textAlign: 'left', ml: 1 }}>
										Welcome back,
										<Typography variant="h3" sx={{ width: '200px', overflow:'visible'}}>{originUser?.name}</Typography>
									</Grid>
								</Grid>)
							}
							{!originUser.uid && (
								<Grid container>
									<CircularProgress sx={{ margin:'0 auto'}} />
								</Grid>
							)}
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="body" fontWeight="bold">
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
