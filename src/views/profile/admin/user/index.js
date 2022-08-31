import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

// material-ui
import { Box, Tab, Tabs } from "@mui/material";

// project imports
import Profile from "views/profile/admin/user/Details";
import Links from "views/profile/admin/user/Links";
import Style from "views/profile/admin/user/Style";
import MainCard from "ui-component/cards/MainCard";

// tabs
function TabPanel({ children, value, index, ...other }) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 0 }}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`
	};
}

// ==============================|| PROFILE 3 ||============================== //

const UserProfile = () => {
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<MainCard title="Builder Profile">
			<div>
				<Tabs
					value={value}
					indicatorColor="primary"
					onChange={handleChange}
					sx={{
						mb: 3,
						minHeight: "auto",
						"& button": {
							minWidth: 100
						},
						"& a": {
							minHeight: "auto",
							minWidth: 10,
							py: 1.5,
							px: 1,
							mr: 2.25,
							color: "grey.600"
						},
						"& a.Mui-selected": {
							color: "primary.main"
						}
					}}
					aria-label="Profile options"
					variant="scrollable"
				>
					<Tab
						component={Link}
						to="#"
						label="Profile"
						{...a11yProps(0)}
					/>
					<Tab
						component={Link}
						to="#"
						label="Style"
						{...a11yProps(1)}
					/>
					<Tab
						component={Link}
						to="#"
						label="Links"
						{...a11yProps(2)}
					/>
				</Tabs>
				<TabPanel value={value} index={0}>
					<Profile />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Style />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Links />
				</TabPanel>
			</div>
		</MainCard>
	);
};

export default UserProfile;
