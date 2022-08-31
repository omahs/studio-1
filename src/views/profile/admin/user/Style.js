import { useEffect, useContext, useState } from "react";
import { Typography, Grid, Avatar, Button } from "@mui/material";
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import { gridSpacing } from "store/constant";
import { DappifyContext } from "react-dappify";
import { saveUser } from "utils/user";
import isEmpty from "lodash/isEmpty";
import Color from "views/profile/admin/user/Color";

const Style = () => {
	const context = useContext(DappifyContext);
	const { user, Provider } = context;

	const [profile, setProfile] = useState({});
	useEffect(() => {
		const existingProfile = user?.get("profile");
		const initProfile = !isEmpty(existingProfile) ? existingProfile : {};
		setProfile(initProfile);
	}, [user]);

	const [colors, toggleColors] = useState(false);

	const onBackgroundUpload = async (e) => {
		const f = e.target.files[0];
		const file = new Provider.File(f.name, f);
		const r = await file.saveIPFS();
		profile.background = r.ipfs();
		const newProfile = {
			...profile
		};
		setProfile(newProfile);
		user.set("profile", newProfile);
		await saveUser(user);
	};

	return (
		<Grid container spacing={gridSpacing}>
			<Grid item sx={12} md={4}>
				<SubCard
					title="Profile Background"
					contentSX={{ textAlign: "center" }}
				>
					<Grid
						container
						direction="column"
						spacing={1}
						sx={{ p: 2 }}
					>
						<Grid item>
							<Avatar
								sx={{
									bgcolor: "white",
									width: 96,
									height: 96,
									margin: "0 auto",
									border: "1px solid rgba(0,0,0,0.1)"
								}}
							>
								<img
									src={profile?.background}
									alt=""
									width="96"
									height="auto"
								/>
							</Avatar>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="subtitle2" align="center">
								Upload/Change Your Profile Background
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<AnimateButton>
								<Button
									variant="contained"
									component="label"
									elevation={0}
									size="small"
								>
									Upload Background
									<input
										type="file"
										hidden
										onChange={onBackgroundUpload}
									/>
								</Button>
							</AnimateButton>
						</Grid>
					</Grid>
				</SubCard>
			</Grid>
			<Grid item xs={12} md={8}>
				<SubCard title="Edit Profile Colors">
					<Grid container direction="row" spacing={1}>
						<Grid item xs={3} md={2}>
							{profile && (
								<Color
									profile={profile}
									defaultColor="backgroundColor"
									user={user}
									saveUser={saveUser}
								/>
							)}
						</Grid>
						<Grid item xs={9}>
							<Typography>Background Color</Typography>
						</Grid>
						<Grid item xs={3} md={2}>
							{profile && (
								<Color
									profile={profile}
									defaultColor="textColor"
									user={user}
									saveUser={saveUser}
								/>
							)}
						</Grid>
						<Grid item xs={9}>
							<Typography>Text Color</Typography>
						</Grid>
						<Grid item sx={3} md={2}>
							{profile && (
								<Color
									profile={profile}
									defaultColor="buttonColor"
									user={user}
									saveUser={saveUser}
								/>
							)}
						</Grid>
						<Grid item xs={9}>
							<Typography>Button Color</Typography>
						</Grid>
						<Grid item xs={3} md={2}>
							{profile && (
								<Color
									profile={profile}
									defaultColor="buttonColorHover"
									user={user}
									saveUser={saveUser}
								/>
							)}
						</Grid>
						<Grid item xs={9}>
							<Typography>Button Color (Hover)</Typography>
						</Grid>
					</Grid>
				</SubCard>
			</Grid>
		</Grid>
	);
};

export default Style;
