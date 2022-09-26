import { useState } from "react";
import {
	Paper,
	Typography,
	Grid,
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { gridSpacing } from "store/constant";
import { Project } from "react-dappify";
import { SNACKBAR_OPEN, CLEAR_APP } from "store/actions";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { getUrl } from "utils/url";

const BackendPage = () => {
	const dispatch = useDispatch();
	const appState = useSelector((state) => state.app);
	const [openDelete, setOpenDelete] = useState(false);
	const appConfiguration = useSelector((state) => state.app);
	const { user } = useMoralis();
	const navigate = useNavigate();

	const dismiss = () => {
		setOpenDelete(false);
	};

	const cleanupState = () => {
		dispatch({ type: CLEAR_APP });
	};

	const deleteProject = async () => {
		try {
			await Project.destroy(appConfiguration, user);
			dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: "Project updated",
				variant: "success",
				anchorOrigin: { vertical: "top", horizontal: "center" },
				alertSeverity: "success"
			});
			cleanupState();
			navigate("/profile/admin", { replace: true });
		} catch (e) {
			dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: e.message,
				variant: "error",
				anchorOrigin: { vertical: "top", horizontal: "center" },
				alertSeverity: "error"
			});
		}
	};

	const confirmDialog = (
		<Dialog
			open={openDelete}
			onClose={dismiss}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				Delete current project?
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					If you delete this project the frontend and backend will no
					longer be available for users. Make sure to backup your
					information about smart contract address and ABI. Do you
					wish to continue?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={dismiss}>Cancel</Button>
				<Button onClick={deleteProject} autoFocus>
					Delete Forever
				</Button>
			</DialogActions>
		</Dialog>
	);

	return (
		<Grid container sx={{ p: 3 }}>
			<Grid item xs={12}>
				{confirmDialog}
				<Typography variant="h2">
					Review your dApp configuration
				</Typography>
				<Typography variant="body">
					Select how to store your data
				</Typography>
				<Paper
					variant="outlined"
					sx={{ p: 3, mt: 2 }}
					className="paper-in"
				>
					<Grid container spacing={gridSpacing} sx={{ p: 3 }}>
						<Grid item xs={12}>
							<TextField
								id="outlined-id"
								disabled
								label="App Id"
								value={appState.appId}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="outlined-id"
								disabled
								label="Provided Subdomain"
								value={getUrl(appState.subdomain)}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="outlined-id"
								disabled
								label="Custom Domain"
								value={
									appState.domain
										? appState.domain
										: "Contact hello@dappify to request one"
								}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sx={{ p: 0, m: 0 }}>
							<Button
								color="error"
								variant="contained"
								size="small"
								sx={{ mx: 1 }}
								onClick={() => setOpenDelete(true)}
							>
								Delete this Project
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default BackendPage;
