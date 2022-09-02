import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";
import { useEffect } from "react";

import useAppConfiguration from "hooks/useAppConfiguration";
// project imports
import MainCard from "ui-component/cards/MainCard";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";

// assets
import LinkIcon from "@mui/icons-material/Link";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_APP } from "store/actions";
// styles
const IFrameWrapper = styled("iframe")(({ theme }) => ({
	height: "calc(100vh - 150px)",
	border: "1px solid",
	borderColor:
		theme.palette.mode === "dark"
			? theme.palette.dark.main
			: theme.palette.primary.light
}));

// =============================|| TABLER ICONS ||============================= //

const TablerIcons = () => {
	const dispatch = useDispatch();
	const appState = useSelector((state) => state.app);
	const handleClipboard = () => {
		try {
			navigator.clipboard.readText().then((clipboard) => {
				if (
					!clipboard ||
					!clipboard.includes("svg") ||
					clipboard === appState.icon
				)
					return;
				const current = appState;
				current.icon = clipboard;
				dispatch({ type: UPDATE_APP, configuration: current });
			});
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => handleClipboard(), 500);

		// clean up
		return () => clearInterval(interval);
	}, []);

	return (
		<Card sx={{ overflow: "hidden" }}>
			<IFrameWrapper
				id="iconFrame"
				title="Tabler Icons"
				width="100%"
				src="https://tablericons.com/"
			/>
		</Card>
	);
};

export default TablerIcons;
