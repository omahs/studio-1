import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
	AppBar,
	Box,
	CssBaseline,
	Toolbar,
	useMediaQuery,
	Button
} from "@mui/material";

// project imports
import Breadcrumbs from "ui-component/extended/Breadcrumbs";
import Header from "layout/MainLayout/Header";
import Sidebar from "layout/MainLayout/Sidebar";
import SidePanel from "layout/SidePanel";
import navigation from "menu-items";
import { drawerWidth } from "store/constant";
import { SET_MENU, UPDATE_APP } from "store/actions";

import { useMoralis } from "react-moralis";

import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "common/Logo";

// assets
import { IconChevronRight } from "@tabler/icons";

// styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		...theme.typography.mainContent,
		...(!open && {
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			[theme.breakpoints.up("md")]: {
				marginLeft: -(drawerWidth - 20),
				width: `calc(100% - ${drawerWidth}px)`
			},
			[theme.breakpoints.down("md")]: {
				marginLeft: "20px",
				width: `calc(100% - ${drawerWidth}px)`,
				padding: "16px"
			},
			[theme.breakpoints.down("sm")]: {
				marginLeft: "10px",
				width: `calc(100% - ${drawerWidth}px)`,
				padding: "16px",
				marginRight: "10px"
			}
		}),
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}),
			marginLeft: 0,
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			width: `calc(100% - ${drawerWidth}px)`,
			[theme.breakpoints.down("md")]: {
				marginLeft: "20px"
			},
			[theme.breakpoints.down("sm")]: {
				marginLeft: "10px"
			}
		})
	})
);

// ==============================|| MAIN LAYOUT ||============================== //

const ProfileAdmin = () => {
	const { appId } = useParams();

	const theme = useTheme();
	const { Moralis, user, logout } = useMoralis();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));

	// Handle left drawer
	const leftDrawerOpened = useSelector((state) => state.customization.opened);
	const dispatch = useDispatch();
	const handleLeftDrawerToggle = () => {
		dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
	};

	const renderAddress = () => {
		const address = user.get("ethAddress");
		return `${address.substring(0, 4)}...${address.substring(
			address.length - 8,
			address.length
		)}`;
	};

	useEffect(() => {
		dispatch({ type: SET_MENU, opened: !matchDownMd });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchDownMd]);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			{/* header */}
			<AppBar
				enableColorOnDark
				position="fixed"
				color="inherit"
				elevation={4}
				sx={{
					bgcolor: theme.palette.background.default,
					transition: leftDrawerOpened
						? theme.transitions.create("width")
						: "none"
				}}
			>
				<Toolbar>
					<Box sx={{ width: 150 }}>
						<Logo />
					</Box>
					<Box display="flex" flexGrow={1} />
					<Button
						disableElevation
						variant="contained"
						color="primary"
						size="small"
						onClick={logout}
						startIcon={<AccountBalanceWalletTwoToneIcon />}
						endIcon={<LogoutIcon />}
					>
						{renderAddress()}
					</Button>
				</Toolbar>
			</AppBar>

			{/* drawer 
            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} /> */}

			{/* main content */}
			<Main theme={theme} open={leftDrawerOpened}>
				{/* breadcrumb */}
				<Outlet />
			</Main>
			{/* <SidePanel /> */}
		</Box>
	);
};

export default ProfileAdmin;
