import { useState, useContext, useEffect } from "react";
import { TextField, Grid, Button, Typography } from "@mui/material";

import AnimateButton from "ui-component/extended/AnimateButton";
import { saveUser } from "utils/user";
import { DappifyContext } from "react-dappify";
import SubCard from "ui-component/cards/SubCard";
import ProfileAvatar from "views/profile/admin/user/ProfileAvatar";

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
		console.log(currLinks);
		currLinks[index]["image"] = r.ipfs();
		const newProfile = {
			...profile
		};
		newProfile.links = currLinks;
		console.log(newProfile);
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

	const sanitizeLinks = () => {
		let outputLinks;
		if (!Array.isArray(profile?.links)) {
			outputLinks = [];
		} else {
			outputLinks = profile?.links;
		}
		return outputLinks;
	};

	const editableLinks = () => {
		const items = [];
		const links = sanitizeLinks(profile?.links);
		links?.forEach((link, index) => {
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
										<ProfileAvatar
											description="Upload/Change Link Image"
											buttonLabel="Upload Image"
											isUser={false}
											imageSrc={profile?.links}
											imageKey={"image"}
											index={index}
											isLink
										/>
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

	return (
		<SubCard title="Shareable Links">
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Button
						variant="contained"
						onClick={async () => {
							try {
								const orgProfile = { ...profile };
								const links = sanitizeLinks(orgProfile?.links);
								links.push({
									title: "",
									url: "",
									image: ""
								});
								orgProfile.links = links;
								setProfile(orgProfile);
								user.set("profile", orgProfile);
								console.log(orgProfile);
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
