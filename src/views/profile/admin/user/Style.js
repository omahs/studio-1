import { useEffect, useContext, useState } from "react";
import { Typography, Grid } from "@mui/material";
import SubCard from "ui-component/cards/SubCard";
import { gridSpacing } from "store/constant";
import { useMoralis } from "react-moralis";
import { saveUser } from "utils/user";
import isEmpty from "lodash/isEmpty";
import Color from "views/profile/admin/user/Color";
import ProfileAvatar from "views/profile/admin/user/ProfileAvatar";

const Style = () => {
	const context = useMoralis();
	const { user } = context;

	const [profile, setProfile] = useState({});
	useEffect(() => {
		const existingProfile = user?.get("profile");
		const initProfile = !isEmpty(existingProfile) ? existingProfile : {};
		setProfile(initProfile);
	}, [user]);

	return (
		<Grid container spacing={gridSpacing}>
			<Grid item sx={12} md={4}>
				<SubCard
					title="Profile Background"
					contentSX={{ textAlign: "center" }}
				>
					<ProfileAvatar
						description="Upload/Change Your Profile Background, Recommended 1200x800"
						buttonLabel="Upload Background"
						isUser={false}
						imageSrc={profile}
						imageKey={"background"}
					/>
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
