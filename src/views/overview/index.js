import { Typography, Grid, TextField, Paper, Box, Alert } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { gridSpacing } from "store/constant";
import { UPDATE_APP } from "store/actions";
import { setField, setSocial } from "utils/config";
import info from "assets/images/studio/info.jpg";
import contact from "assets/images/studio/contact.jpg";
import DetailsPage from "views/overview/DetailsPage";

const OverviewPage = () => {
	const dispatch = useDispatch();
	const appState = useSelector((state) => state.app);

	const renderFooterColumnItems = (column) => {
		const list = [];
		appState.footer[column].items.forEach((item, index) => {
			list.push(
				<Grid
					container
					direction="row"
					spacing={2}
					sx={{ py: 1 }}
					key={index}
				>
					<Grid item xs={6}>
						<TextField
							label="Displayed label"
							value={item.title}
							onChange={(e) => {
								appState.footer[column].items[index].title =
									e.target.value;
								dispatch({
									type: UPDATE_APP,
									configuration: appState
								});
							}}
							variant="standard"
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Full URL where it links to"
							value={item.link}
							onChange={(e) => {
								appState.footer[column].items[index].link =
									e.target.value;
								dispatch({
									type: UPDATE_APP,
									configuration: appState
								});
							}}
							variant="standard"
							fullWidth
						/>
					</Grid>
				</Grid>
			);
		});
		return list;
	};

	return (
		<MainCard>
			<Grid
				container
				spacing={gridSpacing}
				sx={{ p: 3 }}
				alignContent="center"
			>
				<Grid item xs={12} md={6}>
					<Box>
						<img src={info} alt="" className="onboarding__image" />
					</Box>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant="h2">Get started here!</Typography>
					<Typography variant="body">
						Tell us more about your dApp
					</Typography>
					<Paper
						variant="outlined"
						sx={{ p: 3, mt: 2 }}
						className="paper-in"
					>
						<Grid
							data-cy="get-started-name-and-description"
							container
							spacing={gridSpacing}
						>
							<Grid item xs={12}>
								<TextField
									id="outlined-name"
									label="Name"
									value={appState.name}
									onChange={(e) =>
										setField(
											dispatch,
											appState,
											"name",
											e.target.value
										)
									}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="outlined-desc"
									data-cy="project-description-textfield"
									label="Shortly, what is it about?"
									multiline
									rows={5}
									value={appState.description}
									onChange={(e) =>
										setField(
											dispatch,
											appState,
											"description",
											e.target.value
										)
									}
									fullWidth
								/>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Alert severity="info" variant="filled">
						Remember to publish your changes using the "Publish
						Changes" button in the top right corner on the header
						everytime you are done changing anything!
					</Alert>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant="h2">
						How can your users contact you?
					</Typography>
					<Typography variant="body">
						These links are optional and are displayed in the
						footer.
					</Typography>
					<Paper
						variant="outlined"
						sx={{ p: 3, mt: 2 }}
						className="paper-in"
					>
						<Grid container spacing={gridSpacing}>
							<Grid item xs={6}>
								<TextField
									id="outlined-email"
									data-cy="email-address-textfield"
									label="Email Address"
									value={appState?.social?.email}
									onChange={(e) =>
										setSocial(
											dispatch,
											appState,
											"email",
											e.target.value
										)
									}
									fullWidth
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="outlined-facebook"
									label="Facebook Page URL"
									value={appState?.social?.facebook}
									onChange={(e) =>
										setSocial(
											dispatch,
											appState,
											"facebook",
											e.target.value
										)
									}
									fullWidth
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="outlined-instagram"
									label="Instagram URL"
									value={appState?.social?.instagram}
									onChange={(e) =>
										setSocial(
											dispatch,
											appState,
											"instagram",
											e.target.value
										)
									}
									fullWidth
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="outlined-twitter"
									label="Twitter URL"
									value={appState?.social?.twitter}
									onChange={(e) =>
										setSocial(
											dispatch,
											appState,
											"twitter",
											e.target.value
										)
									}
									fullWidth
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="outlined-telegram"
									label="Telegram URL"
									value={appState?.social?.telegram}
									onChange={(e) =>
										setSocial(
											dispatch,
											appState,
											"telegram",
											e.target.value
										)
									}
									fullWidth
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="outlined-pinterest"
									label="Pinterest URL"
									value={appState?.social?.pinterest}
									onChange={(e) =>
										setSocial(
											dispatch,
											appState,
											"pinterest",
											e.target.value
										)
									}
									fullWidth
								/>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Box>
						<img src={contact} alt="" width="100%" height="auto" />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h2">
						Time to setup the footer links!
					</Typography>
					<Typography variant="body">
						These links are also optional
					</Typography>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper
						variant="outlined"
						sx={{ p: 3, mt: 2 }}
						className="paper-in"
					>
						<TextField
							id="outlined-email"
							label="Left footer column header title"
							value={appState.footer.left.title}
							onChange={(e) => {
								appState.footer.left.title = e.target.value;
								dispatch({
									type: UPDATE_APP,
									configuration: appState
								});
							}}
							fullWidth
						/>
						{renderFooterColumnItems("left")}
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper
						variant="outlined"
						sx={{ p: 3, mt: 2 }}
						className="paper-in"
					>
						<TextField
							id="outlined-email"
							label="Center footer column header title"
							value={appState.footer.center.title}
							onChange={(e) => {
								appState.footer.center.title = e.target.value;
								dispatch({
									type: UPDATE_APP,
									configuration: appState
								});
							}}
							fullWidth
						/>
						{renderFooterColumnItems("center")}
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper
						variant="outlined"
						sx={{ p: 3, mt: 2 }}
						className="paper-in"
					>
						<TextField
							id="outlined-email"
							label="Right footer column header title"
							value={appState.footer.right.title}
							onChange={(e) => {
								appState.footer.right.title = e.target.value;
								dispatch({
									type: UPDATE_APP,
									configuration: appState
								});
							}}
							fullWidth
						/>
						{renderFooterColumnItems("right")}
					</Paper>
				</Grid>

				<Grid item xs={12}>
					<Typography variant="h2">App Operator</Typography>
					<Typography variant="body">
						Specify who the default administrator and beneficiary is
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Paper
						variant="outlined"
						sx={{ p: 3, mt: 2 }}
						className="paper-in"
					>
						<TextField
							id="outlined-email"
							label="Wallet address of the admin"
							value={appState.operator}
							onChange={(e) => {
								appState.operator = e.target.value;
								dispatch({
									type: UPDATE_APP,
									configuration: appState
								});
							}}
							fullWidth
						/>
					</Paper>
				</Grid>
			</Grid>
			<DetailsPage />
		</MainCard>
	);
};

export default OverviewPage;
