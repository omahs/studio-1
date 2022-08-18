// material-ui
import { Button, SvgIcon } from "@mui/material";
import discordIcon from "assets/images/discord.svg";

// ==============================|| LANDING - HEADER PAGE ||============================== //

const DiscordButton = () => {
	return (
		<Button
			href="https://discord.gg/CYYX8yUVgc"
			target="__blank"
			variant="contained"
			size="large"
			className="join__discord"
			id="join-discord-btn"
			color="secondary"
			sx={{ px: 5, py: 2 }}
			endIcon={
				<SvgIcon component="object" sx={{ fontSize: "48px" }}>
					<embed
						type="image/svg+xml"
						src={discordIcon}
						style={{ height: "100%" }}
					/>
				</SvgIcon>
			}
		>
			Join us on Discord
		</Button>
	);
};

export default DiscordButton;
