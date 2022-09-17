import {
	Dialog,
	Button,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText
} from "@mui/material";
import { getUrl } from "utils/url";
import { useSelector } from "react-redux";

const AddDialog = ({ template, onClose, isOpen }) => {
	const appState = useSelector((state) => state.app);
	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				<i>{template.name}</i> template added!
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Don't forget to <strong>Publish</strong> your changes to
					persist them on the top bar
				</DialogContentText>
			</DialogContent>
			<DialogActions
				sx={{ p: 3, textAlign: "center" }}
				justifyContent="center"
				alignItems="center"
			>
				<Button
					data-cy="dialog-preview-my-dapp-button"
					fullWidth
					variant="contained"
					href={getUrl(
						appState.subdomain,
						appState.type === template.id ? null : template.id
					)}
					target="_blank"
					color="info"
					sx={{ margin: "0 auto" }}
					onClick={onClose}
					autoFocus
				>
					Preview my dApp
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddDialog;
