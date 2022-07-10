import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	Box,
	Alert,
	Stack,
	Grid,
	Typography,
	IconButton,
	Button,
	Slide,
	TextField,
	InputAdornment,
	Link,
	Tooltip
} from "@mui/material";
import Logo from "common/Logo";
import { DappifyContext, supportedWallets } from "react-dappify";
import isEmpty from "lodash/isEmpty";

const Signup = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { authenticate, Provider, user, isAuthenticated, logout } =
		useContext(DappifyContext);
	const [email, setEmail] = useState();
	const [handle, setHandle] = useState(id);
	const [error, setError] = useState();
	const [emailError, setEmailError] = useState();
	const isDataSet =
		!isEmpty(email) &&
		!isEmpty(handle) &&
		isEmpty(error) &&
		isEmpty(emailError);
	// logout();

	useEffect(() => {
		const handleExistCheck = async (input) => {
			console.log(input);
			const exists = await Provider.Cloud.run("userExists", {
				handle: input
			});
			if (exists) {
				setError("Handle already registered to an account");
			}
		};

		if (id) {
			handleExistCheck(id);
		}
	}, [id]);

	useEffect(() => {
		if (isAuthenticated)
			// navigate('/profile');
			window.location.href = "/profile/admin";
	}, [isAuthenticated]);

	// const save = async() => {
	//     console.log(user);
	//     if (isDataSet) {
	//     user.set('email', email);
	//     user.user('contact', email);
	//     user.set('username', handle);
	//     user.set('username', handle);
	//     await user.save();
	//     navigate('/profile');
	//     }
	// }
	// useEffect(() => {
	//     save();
	// }, [user, isAuthenticated])

	const renderSupportedWallets = () => {
		const list = [
			<Grid item xs={6} sm={3} key={"magic"}>
				<Tooltip
					title={
						"Magic is the #1 user authentication and private key management solution for Web3 and Web2. Secure, seamless, scalable, and future-proof."
					}
				>
					<Button
						id={`login-magic-btn`}
						elevation={1}
						sx={{ p: 0, opacity: isDataSet ? 1 : 0.5 }}
						fullWidth
						disabled={!isDataSet}
						onClick={async () => {
							const provider = "magicLink";
							const props = {
								signingMessage: "Dappify wants to connect!",
								provider: provider,
								email: email,
								apiKey: process.env.REACT_APP_MAGIC,
								network: "ropsten"
							};
							const u = await Provider.authenticate(props);
							u.set("email", email);
							u.set("contact", email);
							u.set("username", handle);
							u.set("nickname", handle);
							u.set("provider", provider);
							await u.save();
							// navigate('/profile');
						}}
					>
						<Grid container direction="column" alignItems="left">
							<Grid item>
								<img
									src={
										"https://remotive.com/company/97407/logo-large"
									}
									alt={`Sign in with Magic`}
									height={64}
								/>
							</Grid>
							<Grid item>Magic</Grid>
						</Grid>
					</Button>
				</Tooltip>
			</Grid>
		];
		supportedWallets.forEach((wallet) => {
			list.push(
				<Grid item xs={6} sm={3} key={wallet.name}>
					<Tooltip title={wallet.description}>
						<Button
							id={`login-${wallet.id}-btn`}
							elevation={1}
							sx={{ p: 0, opacity: isDataSet ? 1 : 0.5 }}
							fullWidth
							disabled={!isDataSet}
							onClick={async () => {
								const u = await Provider.authenticate(
									wallet.payload
								);
								u.set("email", email);
								u.set("contact", email);
								u.set("username", handle);
								u.set("nickname", handle);
								u.set("provider", wallet.id);
								await u.save();
								// navigate('/profile');
							}}
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

	const validateHandle = async (e) => {
		const input = e.target.value;
		console.log(input);
		setError();
		if (!input || input.length < 4) {
			setError("Handle name must be at least 4 characters long");
			return;
		}
		if (input.length > 30) {
			setError("Handle name cannot be longer than 30 characters");
			return;
		}
		const regexp = /^[a-zA-Z0-9-_]+$/;
		if (input.search(regexp) === -1) {
			setError(
				"Can only contain letters, numbers, hyphens and underscores"
			);
			return;
		}
		// const sanitizedInput = input.replace(/\s/g, "").toLowerCase();
		// const found = await Project.exists(prefix);
		// setError(found ? 'Project subdomain taken, please select a different subdomain' : null);
		const exists = await Provider.Cloud.run("userExists", {
			handle: input
		});
		if (exists) {
			setError("Handle already registered to an account");
			return;
		}
		setHandle(input);
	};

	const validateEmail = async (e) => {
		const input = e.target.value;
		console.log(input);
		setEmailError();
		const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!input.match(mailformat)) {
			setEmailError("Invalid email format");
			return;
		}
		// const sanitizedInput = input.replace(/\s/g, "").toLowerCase();
		// const found = await Project.exists(prefix);
		// setError(found ? 'Project subdomain taken, please select a different subdomain' : null);
		const exists = await Provider.Cloud.run("userExists", { email: input });
		if (exists) {
			setEmailError("Email already registered to an account");
			return;
		}
		setEmail(input);
	};

	return (
		<Slide
			direction="left"
			in={true}
			mountOnEnter
			unmountOnExit
			className="new-project-container"
		>
			<Grid
				container
				direction="column"
				justifyContent="center"
				textAlign="center"
				sx={{ ml: "-18px" }}
			>
				<Grid
					container
					spacing={2}
					sx={{ maxWidth: 600, margin: "0 auto", padding: 5 }}
				>
					<Grid item xs={12}>
						<Box sx={{ margin: "0 auto" }}>
							<Logo />
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h1" fontWeight="bolder">
							Create an account for free
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="subtitle">
							Free forever. No payment needed.
						</Typography>
					</Grid>
					<Grid item xs={12} sx={{ height: 95 }}>
						<TextField
							placeholder="yourname"
							autofocus
							fullWidth
							defaultValue={id}
							onChange={validateHandle}
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
												fontSize: "1.3em",
												fontWeight: "100"
											}}
										>
											dappify.com/
										</span>
									</InputAdornment>
								)
							}}
						/>
						{error && (
							<Alert
								variant="outlined"
								severity="error"
								sx={{
									p: 0,
									fontSize: "1em",
									height: 36,
									border: 0,
									color: "#c62828"
								}}
							>
								{error}
							</Alert>
						)}
					</Grid>

					<Grid item xs={12} sx={{ height: 95 }}>
						<TextField
							placeholder="email"
							fullWidth
							onChange={validateEmail}
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
								fontSize: "2em"
							}}
						/>
						{emailError && (
							<Alert
								variant="outlined"
								severity="error"
								sx={{
									p: 0,
									fontSize: "1em",
									height: 36,
									border: 0,
									color: "#c62828"
								}}
							>
								{emailError}
							</Alert>
						)}
					</Grid>

					<Grid item xs={12}>
						<Typography variant="title">
							Connect your wallet with
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Grid container>{renderSupportedWallets()}</Grid>
					</Grid>
					<Grid item xs={12}>
						<Button component={RouterLink} to="/signin">
							Already have an account?
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Slide>
	);
};

export default Signup;
