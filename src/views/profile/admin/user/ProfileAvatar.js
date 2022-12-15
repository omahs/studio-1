import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import {
	Typography,
	Grid,
	Avatar,
	Button,
	IconButton,
	CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AnimateButton from "ui-component/extended/AnimateButton";
import Identicon from "react-identicons";
import isEmpty from "lodash/isEmpty";
import { useMoralis } from "react-moralis";
import { saveUser } from "utils/user";
import { SNACKBAR_OPEN } from "store/actions";
import constants from "constant";
const { IMAGE_PLACEHOLDER } = constants;

const ProfileAvatar = ({
	description = "Upload/Change Your Profile Image, Recommended 400x400",
	buttonLabel = "Upload Avatar",
	isUser = true,
	imageSrc = {},
	imageKey = "image",
	isLink,
	index
}) => {
	const { Moralis, user } = useMoralis();
	const dispatch = useDispatch();
	const [isLoading, setLoading] = useState(false);
	const [profile, setProfile] = useState({});

	const getImage = () => {
		if (isLink) {
			const links = profile?.links || [];
			return links.length > 0 ? links[index]["image"] : IMAGE_PLACEHOLDER;
		} else {
			return imageSrc[imageKey] || IMAGE_PLACEHOLDER;
		}
	};

	useEffect(() => {
		const existingProfile = user?.get("profile");
		const initProfile = !isEmpty(existingProfile) ? existingProfile : {};
		setProfile(initProfile);
	}, [user]);

	const profileImage = profile?.image ? (
		<img src={profile?.image} alt="" width="125" height="auto" />
	) : (
		<Identicon string={user.get("ethAddress")} size={96} />
	);

	const onImageUpload = async (e) => {
		setLoading(true);
		try {
			const selectedFile = e.target.files[0];
			const providerFile = new Moralis.File(
				selectedFile.name,
				selectedFile
			);
			const uploadedFile = await providerFile.saveIPFS();
			let newProfile = {};
			if (isLink) {
				// Only for Links
				profile.links[index][imageKey] = uploadedFile.ipfs();
			} else {
				// Only for user and styles
				profile[imageKey] = uploadedFile.ipfs();
			}
			newProfile = { ...profile };
			setProfile(newProfile);
			user.set("profile", newProfile);
			await saveUser(user);
			// Success
			dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: "Image uploaded",
				variant: "alert",
				anchorOrigin: { vertical: "top", horizontal: "center" },
				alertSeverity: "success"
			});
		} catch (e) {
			// Error
			dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: e.message,
				variant: "alert",
				anchorOrigin: { vertical: "top", horizontal: "center" },
				alertSeverity: "error"
			});
		} finally {
			setLoading(false);
		}
	};

	const onImageDelete = async (e) => {
		setLoading(true);
		try {
			if (isLink) {
				// Only for Links
				profile.links[index][imageKey] = null;
			} else {
				// Only for user and styles
				profile[imageKey] = null;
			}

			const newProfile = { ...profile };
			setProfile(newProfile);
			user.set("profile", newProfile);
			await saveUser(user);
			// Success
			dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: "Image removed",
				variant: "alert",
				anchorOrigin: { vertical: "top", horizontal: "center" },
				alertSeverity: "success"
			});
		} catch (e) {
			// Error
			dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: e.message,
				variant: "alert",
				anchorOrigin: { vertical: "top", horizontal: "center" },
				alertSeverity: "error"
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Avatar
					sx={{
						width: 100,
						height: 100,
						margin: "0 auto",
						background: "transparent",
						border: "1px solid rgba(0,0,0,0.1)"
					}}
				>
					{isUser ? (
						profileImage
					) : (
						<img
							src={getImage()}
							alt=""
							width="125"
							height="auto"
						/>
					)}
				</Avatar>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="subtitle2" align="center">
					{description}
				</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				justifyContent="center"
				sx={{ display: "inline-flex" }}
			>
				<AnimateButton>
					<Button
						variant="contained"
						disabled={isLoading}
						component="label"
						elevation={0}
						size="small"
					>
						{buttonLabel}
						{isLoading && (
							<CircularProgress
								color="primary"
								size={16}
								sx={{ ml: 1 }}
							/>
						)}
						<input type="file" hidden onChange={onImageUpload} />
					</Button>
				</AnimateButton>
				<AnimateButton>
					<IconButton
						aria-label="delete"
						size="small"
						sx={{ ml: 1 }}
						onClick={onImageDelete}
						disabled={isLoading}
					>
						<DeleteIcon fontSize="small" />
					</IconButton>
				</AnimateButton>
			</Grid>
		</Grid>
	);
};

export default ProfileAvatar;
