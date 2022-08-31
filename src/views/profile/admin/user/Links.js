import { useState, useContext, useEffect } from "react";
import { TextField, Grid, Avatar, Button, Typography } from "@mui/material";

import AnimateButton from "ui-component/extended/AnimateButton";
import { saveUser } from "utils/user";
import { DappifyContext } from "react-dappify";
import SubCard from "ui-component/cards/SubCard";

const Links = () => {
	const { Provider, user } = useContext(DappifyContext);
	const [profile, setProfile] = useState(user.get("profile"));

	useEffect(() => {
		setProfile(user.get("profile"));
	}, [user]);

	const onLinkImageUploaded = async (e, index) => {
		const f = e.target.files[0];
		const file = new Provider.File(f.name, f);
		const r = await file.saveIPFS();
		const currLinks = profile?.links;
		currLinks[index]["image"] = r.ipfs();
		const newProfile = {
			...profile
		};
		newProfile.links = currLinks;
		setProfile(newProfile);
		user.set("profile", newProfile);
		await saveUser(user);
		console.log(newProfile);
	};

	const onLinkUpdated = async (e, index, label) => {
		const currLinks = profile?.links;
		currLinks[index][label] = e.target.value;
		const newProfile = { ...profile };
		newProfile.links = currLinks;
		setProfile(newProfile);
		user.set("profile", newProfile);
		await saveUser(user);
	};

	const removeLinkFromProfile = async (index) => {
		console.log(index);
		const currLinks = profile?.links;
		currLinks.splice(index, 1);
		const newProfile = { ...profile };
		newProfile.links = currLinks;
		setProfile(newProfile);
		user.set("profile", newProfile);
		await saveUser(user);
	};

	const editableLinks = () => {
		const items = [];
		const links = profile?.links || [];
		links.forEach((link, index) => {
			items.push(
				<Grid item xs={12} key={index}>
					<Grid container spacing={1}>
						<SubCard
							contentSX={{ textAlign: "center", width: "100%" }}
						>
							<Grid container direction="row">
								<Grid item>
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
													src={link?.image}
													alt=""
													width="96"
													height="auto"
												/>
											</Avatar>
										</Grid>
										<Grid item xs={12}>
											<Typography
												variant="subtitle2"
												align="center"
											>
												Upload/Change Link Image
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
														onChange={async (e) =>
															await onLinkImageUploaded(
																e,
																index
															)
														}
													/>
												</Button>
											</AnimateButton>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									<Grid
										container
										direction="column"
										spacing={2}
										sx={{ minWidth: "400px" }}
									>
										<Grid item xs={12}>
											<TextField
												fullWidth
												defaultValue={link.title}
												label="Display Label"
												onChange={async (e) =>
													await onLinkUpdated(
														e,
														index,
														"title"
													)
												}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												fullWidth
												defaultValue={link.url}
												label="Link URL"
												onChange={async (e) =>
													await onLinkUpdated(
														e,
														index,
														"url"
													)
												}
											/>
										</Grid>
										<Grid item>
											<Button
												color="error"
												onClick={async () =>
													removeLinkFromProfile(index)
												}
											>
												Remove link from profile
											</Button>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</SubCard>
					</Grid>
				</Grid>
			);
		});
		return items;
	};

	const [linkPanel, toggleLinks] = useState(false);

	return (
		<SubCard title="Shareable Links">
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Button
						variant="contained"
						onClick={async () => {
							try {
								const orgProfile = { ...profile };
								orgProfile.links = orgProfile.links
									? orgProfile.links
									: [];
								orgProfile.links.push({
									title: "",
									url: "",
									image: ""
								});
								setProfile(orgProfile);
								user.set("profile", orgProfile);
								await saveUser(user);
							} catch (e) {
								console.log(e);
							}
						}}
					>
						Add Link
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={2} sx={{ p: 1 }}>
						{editableLinks()}
					</Grid>
				</Grid>
			</Grid>
		</SubCard>
	);
};

export default Links;
