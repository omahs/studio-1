import { useState } from "react";
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	Typography,
	DialogTitle
} from "@mui/material";

const FormDialog = ({ isOpen, onSubmit, onClose }) => {
	const [emailAddress, setEmailAddress] = useState();

	const onSubmitAction = () => {
		onSubmit(emailAddress);
	};

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogTitle>Sign in with email</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Email Address"
					type="email"
					onChange={(e) => setEmailAddress(e.target.value)}
					fullWidth
				/>
				<Typography
					variant="h4"
					fontWeight={100}
					sx={{ py: 1, textAlign: "center" }}
				>
					You will receive a link to complete the process from your
					email address
				</Typography>
			</DialogContent>
			<DialogActions sx={{ px: 3 }}>
				<Button
					onClick={onSubmitAction}
					variant="contained"
					fullWidth
					size="large"
				>
					Send me a link
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default FormDialog;
