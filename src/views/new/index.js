import { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	Box,
	Stack,
	Grid,
	Typography,
	IconButton,
	Button,
	Slide
} from "@mui/material";
import NameField from "views/new/NameField";
import Blockchain from "views/new/Blockchain";
import TermsAndConditions from "views/new/TermsAndConditions";
import Loader from "views/new/Loader";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { UPDATE_APP } from "store/actions";
import { DappifyContext, defaultConfiguration, Project } from "react-dappify";

const NewPage = () => {
	const { user, Provider } = useContext(DappifyContext);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const appState = useSelector((state) => state.app);

	const handleStepOne = (canNextStep, appName, subddomain) => {
		setCantContinue(!canNextStep || !appName || !subddomain);
		appState.name = appName;
		appState.subdomain = subddomain;
		appState.operator = user.get("ethAddress");
	};

	const handleStepTwo = (chainId) => {
		setCantContinue(!chainId);
		appState.chainId = chainId;
	};

	const handleStepThree = (checked) => {
		setCantContinue(!checked);
	};

	const handleStepFour = (isReady) => {
		setCantContinue(!isReady);
	};

	const stepOne = !appState.step && <NameField onChange={handleStepOne} />;
	const stepTwo = appState.step === 1 && (
		<Blockchain onChange={handleStepTwo} />
	); //<UseCase onChange={handleStepTwo}/>;
	const stepThree = appState.step === 2 && (
		<TermsAndConditions onChange={handleStepThree} />
	);
	const loader = appState.step === 3 && <Loader onChange={handleStepFour} />;
	const [cantContinue, setCantContinue] = useState(true);

	const createProject = async (appConfiguration, userPointer) => {
		const Project = Provider.Object.extend("Project");
		const project = new Project();
		project.set("config", appConfiguration);
		project.set("owner", userPointer);
		project.set("subdomain", appConfiguration.subdomain);
		const createdProject = await project.save();
		appConfiguration.appId = createdProject.id;
		createdProject.set("config", appConfiguration);
		const savedProject = await createdProject.save();
		return savedProject;
	};

	const handleNextStep = async () => {
		appState.step = appState.step ? appState.step + 1 : 1;
		setCantContinue(true);
		dispatch({ type: UPDATE_APP, configuration: appState });
		if (appState.step === 4) {
			console.log(user);
			const savedProject = await createProject(appState, user);
			dispatch({
				type: UPDATE_APP,
				configuration: savedProject.get("config")
			});
			navigate(`/studio/templates`);
		}
	};

	const canGoBack = appState.step < 3 || !appState.step;

	return (
		<Slide
			direction="left"
			in={true}
			mountOnEnter
			unmountOnExit
			className="new-project-container"
		>
			<Grid container>
				<Grid item xs={12} sm={6}>
					<Box
						sx={{ px: 16, py: 8 }}
						component={Stack}
						direction="column"
						justifyContent="left"
						textAlign="left"
					>
						<Box className="project-new-container">
							<Box className="project-new-image"></Box>
						</Box>
						{canGoBack && (
							<Grid container direction="row" sx={{ ml: -8 }}>
								<Grid item>
									<IconButton
										aria-label="Back"
										onClick={() => {
											defaultConfiguration.step = 0;
											dispatch({
												type: UPDATE_APP,
												configuration:
													defaultConfiguration
											});
											navigate("/profile/admin");
										}}
									>
										<CloseIcon />
									</IconButton>
								</Grid>
								<Grid item sx={{ py: 1.25, px: 2 }}>
									<Typography
										variant="body"
										fontSize="1.5em"
										fontWeight="400"
									>
										Create a project (Step{" "}
										{appState.step ? appState.step + 1 : 1}{" "}
										of 3)
									</Typography>
								</Grid>
							</Grid>
						)}
						<Box sx={{ mt: 12 }}>
							{stepOne}
							{stepTwo}
							{stepThree}
							{loader}
						</Box>
						<Grid container sx={{ mt: 8 }} justifyContent="center">
							{appState.step > 0 && appState.step < 3 && (
								<Button
									color="primary"
									size="large"
									sx={{ px: 8 }}
									onClick={() => {
										appState.step = appState.step - 1;
										dispatch({
											type: UPDATE_APP,
											configuration: appState
										});
									}}
								>
									Previous
								</Button>
							)}
							{appState.step > 0 && appState.step < 3 && (
								<Box sx={{ flexGrow: 1 }} />
							)}
							<Button
								id="create-project-btn"
								variant="contained"
								size="large"
								sx={{ px: 8 }}
								disabled={cantContinue}
								onClick={handleNextStep}
							>
								{appState.step === 2
									? "Create project"
									: "Continue"}
							</Button>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Slide>
	);
};

export default NewPage;
