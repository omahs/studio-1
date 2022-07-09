import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	CircularProgress,
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
import debounce from "lodash/debounce";
import LoginIcon from "@mui/icons-material/Login";

const Signin = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { authenticate, Provider, user, isAuthenticated, logout } =
		useContext(DappifyContext);
	const [email, setEmail] = useState();
	const [handle, setHandle] = useState(id);
	const [userInput, setUserInput] = useState();
	const [error, setError] = useState();
	const [emailError, setEmailError] = useState();
	const [profile, setProfile] = useState();
	const isDataSet =
		!isEmpty(email) &&
		!isEmpty(handle) &&
		isEmpty(error) &&
		isEmpty(emailError);
	// logout();

	useEffect(() => {
		if (isAuthenticated) window.location.href = "/profile/admin";
		// navigate('/profile');
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

	const validateUser = (u) => {
		if (u.get("email") === email && u.get("username") === handle) {
			window.location.href = "/profile/admin";
		} else if (!isEmpty(u.get("email"))) {
			// This user has a different account already registered
		} else {
			// Is a new account and need to sign in
		}
	};

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
						sx={{ p: 0 }}
						fullWidth
						onClick={async () => {
							const provider = "magicLink";
							const props = {
								signingMessage: "Dappify wants to connect!",
								provider: provider,
								email: email,
								apiKey: "pk_live_09E96B175A890AA5",
								network: "ropsten"
							};
							const u = await Provider.authenticate(props);
							await validateUser(u);
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
							sx={{ p: 0 }}
							fullWidth
							onClick={async () => {
								const u = await Provider.authenticate(
									wallet.payload
								);
								await validateUser(u);
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

	const validateHandle = debounce(async (e) => {
		const input = e.target.value;
		setUserInput(input);
		setError();
		const userProfile = await Provider.Cloud.run("getProfileByHandle", {
			handle: input
		});
		if (!userProfile) {
			setError("Handle does not exist");
			return;
		}
		console.log(userProfile);
		setEmail(userProfile.email);
		setHandle(input);
		setProfile(userProfile);
	}, 300);

	// const validateEmail = async (e) => {
	//     const input = e.target.value;
	//     console.log(input);
	//     setEmailError();
	//     const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	//     if (!input.match(mailformat)) {
	//         setEmailError('Invalid email format');
	//         return;
	//     }
	//     // const sanitizedInput = input.replace(/\s/g, "").toLowerCase();
	//     // const found = await Project.exists(prefix);
	//     // setError(found ? 'Project subdomain taken, please select a different subdomain' : null);
	// 	const exists = await Provider.Cloud.run("userExists", { email: input });
	//     if (exists) {
	//         setEmailError('Email already registered to an account');
	//         return;
	//     }
	//     setEmail(input);
	// };

	const [isSigning, setSigning] = useState(false);
	const signIn = async () => {
		setSigning(true);
		const provider = profile?.provider || "metamask";
		let u;
		if (provider === "magicLink") {
			u = await Provider.authenticate({
				signingMessage: "Dappify wants to connect!",
				provider: provider,
				email: email,
				apiKey: process.env.REACT_APP_MAGIC,
				network: "ropsten"
			});
			console.log(u);
		} else {
			const targetProps = supportedWallets.find(
				(wallet) => wallet.id === provider
			);
			u = await Provider.authenticate(targetProps);
			console.log(u);
		}
		// User has data?
		// setSigning(false);
		console.log(u);
		console.log(u.get("username"));
		console.log(handle);
		if (u.get("username") === handle) {
			window.location.href = "/profile/admin";
		} else {
			navigate(`/signup/${handle}`);
		}
	};

	const signInEnabled = !isEmpty(handle) && isEmpty(error) && !isSigning;

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
					<Grid item xs={12} sx={{ justifyContent: "center" }}>
						<Box sx={{ justifyContent: "center" }}>
							<Logo />
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h1" fontWeight="bolder">
							Log in to your Dappify
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
								),
								endAdornment: (
									<InputAdornment
										position="start"
										sx={{ mr: 0 }}
									>
										{!isSigning && (
											<IconButton
												aria-label="login"
												variant="contained"
												onClick={signIn}
												disabled={!signInEnabled}
											>
												<LoginIcon
													color={
														signInEnabled
															? "primary"
															: "gray"
													}
												/>
											</IconButton>
										)}
										{isSigning && (
											<CircularProgress
												color="inherit"
												size={24}
											/>
										)}
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

					{/*}
                        <Grid item xs={12} sx={{height:95}}>
                        <TextField
                            placeholder="email"
                            fullWidth
                            value={email}
                            sx={{
                                borderRadius: '8px',
                                overflow: 'hidden',
                                input: { 
                                    "&::placeholder": {
                                        fontSize: '1.2em',
                                        color : 'rgba(0,0,0,0.5)'
                                    } 
                                }
                            }} 
                            inputProps={{
                                style: {
                                    fontSize: '1.3em'
                                }
                            }} // font size of input text
                            InputProps={{
                        
                                fontSize: '2em'
                            }}
                            />
                            {emailError && (<Alert variant="outlined" severity="error" sx={{ p:0, fontSize: "1em", height: 36, border: 0, color: '#c62828' }}>{emailError}</Alert>)}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="title">Connect your wallet with</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                {renderSupportedWallets()}
                            </Grid>
                        </Grid>*/}
					<Grid item xs={12}>
						Don't have a Dappify account?
						<Button
							component={RouterLink}
							to={userInput ? `/signup/${userInput}` : `/signup`}
						>
							Create One
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Slide>
	);
};

export default Signin;
