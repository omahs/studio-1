import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
	Card,
	CardContent,
	Grid,
	LinearProgress,
	Typography,
	linearProgressClasses,
	Tooltip,
	Button,
	Box
} from "@mui/material";

// assets
import isEmpty from "lodash/isEmpty";
import { DappifyContext } from "react-dappify";

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
	const { user } = context;

	useEffect(() => {
		console.log("use changing");
		const bio = user.get("bio");
		const email = user.get("email");
		const username = user.get("username");
		const address = user.get("ethAddress");
		const calculateProgress = () => {
			let currentProgress = 0;
			if (!isEmpty(address)) currentProgress += 25;
			if (!isEmpty(username)) currentProgress += 25;
			if (!isEmpty(email)) currentProgress += 25;
			if (!isEmpty(bio)) currentProgress += 25;
			setProgress(currentProgress);
		};
		calculateProgress();
	}, [user]);

	const [progress, setProgress] = useState(0);

	return (
		<CardStyle>
			<CardContent sx={{ p: 2 }}>
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
