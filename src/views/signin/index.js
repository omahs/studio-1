import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Grid, Typography, Paper, Avatar, CircularProgress } from "@mui/material";
import Logo from "common/Logo";
import { SNACKBAR_OPEN } from "store/actions";
import { useMoralis } from 'react-moralis';
const destination = "/profile/projects";

const Signin = () => {
	const navigate = useNavigate();
	const { isAuthenticated, authenticate } = useMoralis();
	const [originUser, setOriginUser] = useState({});
	const dispatch = useDispatch();

	/**
	 * Only users redirected from main website are allowed, providing (uid, name, email and photo)
	 */
	const runAuth = () => {
		if (isAuthenticated) {
			navigate(destination);
			return;
		}
		// Did we receive ref data?	we need it for auto sign in	
		const params = new URLSearchParams(document.location.search);
		const refUser = {
			uid: params.get('uid'),
			name: params.get('name'),
			email: params.get('email'),
			photo: params.get('photo')
		}
		setOriginUser(refUser);
		const isRefUserSet = refUser.uid && refUser.email;
		if (isRefUserSet) {
			// Not authed, ref provided, try auto login
			signIn(refUser);
		} else {
			// Not authenticated not ref. Prolly opened this directly in browser
			window.location.href = 'https://dappify.com';
		}
	}

	useEffect(() => {
		runAuth();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	const signIn = async (refUser) => {
		try {
			const signupUser = await authenticate({
				provider: "magicLink",
				email: refUser.email,
				apiKey: process.env.REACT_APP_MAGIC_API_KEY,
				network: "mainnet"
			});
			if (!signupUser) return;
			signupUser.set("profile", {
				image: refUser.photo,
				name: refUser.name,
				email: refUser.email,
				uid: refUser.uid
			});
			await signupUser.save();
			navigate(destination);
		} catch (e) {
			console.log(e);
			dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: e.message,
				variant: "alert",
				anchorOrigin: { vertical: "bottom", horizontal: "right" },
				alertSeverity: "error"
			});
		} finally {

		}
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
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="body" fontWeight="bold">
							Let's get started! first, connect your wallet
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Grid container>
							<CircularProgress sx={{ margin:'0 auto'}} />
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default Signin;
