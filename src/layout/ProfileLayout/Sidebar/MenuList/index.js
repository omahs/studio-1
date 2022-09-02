import { useEffect, useState } from "react";
// material-ui
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

// project imports
import NavGroup from "./NavGroup";
import menuItem from "menu-items";
import { isEmpty } from "lodash";
import {
	IconBrandCodesandbox,
	IconBrandGoogleAnalytics,
	IconFolders,
	IconBuildingStore,
	IconUserCircle,
	IconMilitaryAward
} from "@tabler/icons";

// // assets
// import {
//     IconDashboard,
//     IconDeviceAnalytics,
//     IconCurrencyBitcoin,
//     IconShoppingCart,
//     IconAd,
//     IconNotes,
//     IconSquarePlus,
//     IconList,
//     IconMessage2,
//     IconRecycle,
//     IconUserCheck,
//     IconBellRinging,
//     IconSend,
//     IconClock,
//     IconHistory,
//     IconBrandGoogleAnalytics,
//     IconChartPie,
//     IconChartBubble,
//     IconPalette,
//     IconPaint,
//     IconLayout,
//     IconEditCircle,
//     IconQrcode,
//     IconUpload,
//     IconEye
// } from '@tabler/icons';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
	const appState = useSelector((state) => state.app);
	// const [items,] = useState(menuItem.items);
	const [dynamicItems, setDynamicItems] = useState([]);
	// const [templateList] = useState(Object.keys(appState.template));

	const items = [
		{
			id: "projects",
			title: "Projects",
			type: "group",
			children: [
				// {
				//     id: 'overview',
				//     title: "Overview",
				//     type: 'item',
				//     url: 'overview',
				//     icon: IconBrandGoogleAnalytics,
				//     breadcrumbs: false
				// },
				{
					id: "dapps",
					title: "My dapps",
					type: "item",
					url: "projects",
					icon: IconFolders,
					breadcrumbs: false
				}
				// {
				//     id: 'default',
				//     title: "Template Marketplace",
				//     type: 'item',
				//     url: 'overview',
				//     icon: IconBuildingStore,
				//     breadcrumbs: false
				// }
			]
		},
		{
			id: "account",
			title: "Account",
			type: "group",
			children: [
				{
					id: "profile",
					title: "Profile",
					type: "item",
					url: "admin",
					icon: IconUserCircle,
					breadcrumbs: false
				}
				// {
				//     id: 'achievements',
				//     title: "Achievements",
				//     type: 'item',
				//     url: 'achievements',
				//     icon: IconMilitaryAward,
				//     breadcrumbs: false
				// }
			]
		}
	];

	const renderItems = () =>
		items.map((item) => {
			switch (item.type) {
				case "group":
					return (
						<NavGroup
							key={item.id}
							item={item}
							id={`sidemenu-${item.id}-btn`}
						/>
					);
				default:
					return (
						<Typography
							key={item.id}
							variant="h6"
							color="error"
							align="center"
						>
							Menu Items Error
						</Typography>
					);
			}
		});

	return <>{renderItems()}</>;
};

export default MenuList;
