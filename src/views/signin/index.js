import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, Typography, Button, Tooltip } from "@mui/material";
import Logo from "common/Logo";
import { DappifyContext, supportedWallets } from "react-dappify";
import FormDialog from "views/signin/FormDialog";
import mixpanel from "mixpanel-browser";
import constants from "constant";

const { AUTH, ERROR, PROVIDER } = constants;

const destination = "/profile/admin";

const Signin = () => {
	const navigate = useNavigate();
	const { Provider, isAuthenticated } = useContext(DappifyContext);

	useEffect(() => {
		if (isAuthenticated) {
			navigate(destination);
		}
	}, [isAuthenticated, navigate]);

	const signIn = async (wallet, walletProvider) => {
		console.log(wallet);
		try {
			const signupUser = await Provider.authenticate(wallet);
			// signupUser.set('email', email);
			// signupUser.set('contact', email);
			// signupUser.set('username', handle);
			// signupUser.set('username', handle);

			// Is a new user?
			const signedEmail = signupUser.get("email");
			mixpanel.track(signedEmail ? AUTH.SIGN_IN : AUTH.SIGN_UP, {
				provider: walletProvider
			});
			// Update provider
			signupUser.set("provider", walletProvider);
			await signupUser.save();
			// Redirect (need to fix reloading issue since auth state does not change unless refresh)
			window.location.reload(true);
		} catch (e) {
			console.log(e);
		} finally {
		}
	};

	const renderSupportedWallets = () => {
		const list = [
			<Grid item xs={6} key={"magic"}>
				<Tooltip title={PROVIDER.MAGIC_LINK}>
					<Button
						id="login-magic-btn"
						elevation={15}
						sx={{ p: 3 }}
						variant="contained"
						color="primary"
						fullWidth
						onClick={onOpenEmailForm}
					>
						<Grid container direction="column" alignItems="left">
							<Grid item>
								<img
									src="https://remotive.com/company/97407/logo-large"
									alt="Sign in with Magic"
									height={64}
								/>
							</Grid>
							<Grid item>Magic Link</Grid>
						</Grid>
					</Button>
				</Tooltip>
			</Grid>
		];
		supportedWallets.forEach((wallet) => {
			list.push(
				<Grid item xs={6} key={wallet.name}>
					<Tooltip title={wallet.description}>
						<Button
							id={`login-${wallet.id}-btn`}
							elevation={15}
							sx={{ p: 3 }}
							variant="contained"
							color="primary"
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

	const [isOpenEmailForm, setOpenEmailForm] = useState(false);

	const onSubmitEmailForm = async (emailAddress) => {
		setOpenEmailForm(false);
		// Magic Link Invoke
		console.log(emailAddress);
		await signIn(
			{
				signingMessage: "Dappify wants to connect!",
				provider: AUTH.MAGIC_LINK,
				email: emailAddress,
				apiKey: process.env.REACT_APP_MAGIC,
				network: "ropsten"
			},
			AUTH.MAGIC_LINK
		);
	};

	const onCloseEmailForm = () => setOpenEmailForm(false);

	const onOpenEmailForm = () => setOpenEmailForm(true);

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			textAlign="center"
		>
			<Grid
				container
				spacing={2}
				sx={{ maxWidth: 600, margin: "0 auto", padding: 5 }}
			>
				<FormDialog
					isOpen={isOpenEmailForm}
					onSubmit={onSubmitEmailForm}
					onClose={onCloseEmailForm}
				/>
				<Grid item xs={12} sx={{ justifyContent: "center" }}>
					<Box sx={{ justifyContent: "center" }}>
						<Logo />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h1" fontWeight="bolder">
						Let's get started! first, connect your wallet
					</Typography>
				</Grid>
				<Grid item>
					<Grid container spacing={2}>
						{renderSupportedWallets()}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Signin;
