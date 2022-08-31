import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
	Avatar,
	Card,
	CardContent,
	Grid,
	LinearProgress,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	linearProgressClasses,
	Tooltip,
	Button,
	Box
} from "@mui/material";

// assets
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { constants } from "react-dappify";
import { getUrl } from "utils/url";
import { DappifyContext } from "react-dappify";

import Identicon from "react-identicons";
import Image from "views/profile/Image";

const { NETWORKS, LOGO } = constants;

// styles
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 30,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.mode === "dark" ? theme.palette.dark.light : "#fff"
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor:
			theme.palette.mode === "dark"
				? theme.palette.primary.dark
				: theme.palette.primary.main
	}
}));

const CardStyle = styled(Card)(({ theme }) => ({
	background:
		theme.palette.mode === "dark"
			? theme.palette.dark.main
			: theme.palette.primary.light,
	marginBottom: "22px",
	overflow: "hidden",
	position: "relative",
	"&:after": {
		content: '""',
		position: "absolute",
		width: "157px",
		height: "157px",
		background:
			theme.palette.mode === "dark"
				? theme.palette.dark.dark
				: theme.palette.primary[200],
		borderRadius: "50%",
		top: "-105px",
		right: "-96px"
	}
}));

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
	const theme = useTheme();

	return (
		<Tooltip title="Add a username, email and bio to complete your profile">
			<Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
				<Grid item>
					<Grid container justifyContent="space-between">
						<Grid item>
							<Typography
								variant="h4"
								sx={{
									color:
										theme.palette.mode === "dark"
											? theme.palette.dark.light
											: theme.palette.primary[800]
								}}
							>
								Profile Progress
							</Typography>
						</Grid>
						<Grid item>
							<Typography
								data-cy="configuration-progress-percentage"
								variant="h4"
								color="inherit"
							>{`${Math.round(value)}%`}</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<BorderLinearProgress
						variant="determinate"
						value={value}
						{...others}
					/>
				</Grid>
			</Grid>
		</Tooltip>
	);
}

LinearProgressWithLabel.propTypes = {
	value: PropTypes.number
};

// ==============================|| SIDEBAR MENU Card ||============================== //

const MenuCard = () => {
	const context = useContext(DappifyContext);
	const { isAuthenticated, user, Provider } = context;
	const [profile, setProfile] = useState({});

	useEffect(() => {
		const existingProfile = user?.get("profile");
		const initProfile = !isEmpty(existingProfile) ? existingProfile : {};
		setProfile(initProfile);
		calculateProgress();
	}, [user]);

	const theme = useTheme();
	const [progress, setProgress] = useState(0);
	const appState = useSelector((state) => state.app);
	const targetNetwork = NETWORKS[appState?.chainId];
	const logo = LOGO[targetNetwork?.nativeCurrency?.symbol];

	const calculateProgress = () => {
		let currentProgress = 0;
		if (!isEmpty(user.get("ethAddress"))) currentProgress += 25;
		if (!isEmpty(user.get("username"))) currentProgress += 25;
		if (!isEmpty(user.get("email"))) currentProgress += 25;
		if (!isEmpty(user.get("bio"))) currentProgress += 25;
		setProgress(currentProgress);
	};

	return (
		<CardStyle>
			<CardContent sx={{ p: 2 }}>
				{/* <List sx={{ p: 0, m: 0 }}>
                    <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
                        <ListItemAvatar sx={{ mt: 0 }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.largeAvatar,
                                    color: theme.palette.primary.main,
                                    border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
                                    borderColor: theme.palette.primary.main,
                                    background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : '#fff',
                                    marginRight: '12px',
                                    p: 3
                                }}
                            >
                                    <Image width={40} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ mt: 0 }}
                            primary={
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.primary[800] }}
                                >
                                    {user.get('username')}
                                </Typography>
                            }
                            secondary={<Typography variant="caption">{user.get('ethAddress')}</Typography>}
                        />
                    </ListItem>
                        </List> */}
				<LinearProgressWithLabel value={progress} />
				<Tooltip title="You can share your public profile with other builders and as a portfolio of your web3 work">
					<Box>
						<Button
							fullWidth
							variant="contained"
							color="secondary"
							sx={{ mt: 2 }}
							href={`/${user.get("username")}`}
							id="visit-dapp-btn"
							target="_blank"
						>
							View my Public Profile
						</Button>
					</Box>
				</Tooltip>
			</CardContent>
		</CardStyle>
	);
};

export default MenuCard;
