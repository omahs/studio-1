// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Container, Grid, Link, Typography } from "@mui/material";

// project imports
import { gridSpacing } from "store/constant";

// assets
import EmailIcon from "@mui/icons-material/Email";
import discord from "assets/images/discord.svg";

// styles
const FooterWrapper = styled("div")(({ theme }) => ({
	padding: "35px 0",
	color: "#fff",
	background: theme.palette.primary.main,
	[theme.breakpoints.down("md")]: {
		textAlign: "center"
	}
}));

const FooterLink = styled(Link)({
	color: "#fff",
	display: "inline-flex",
	alignItems: "center",
	textDecoration: "none !important",
	opacity: "0.8",
	"& svg": {
		fontsize: "1.125rem",
		marginRight: 8
	},
	"&:hover": {
		opacity: "1"
	}
});

const FooterSubWrapper = styled("div")(({ theme }) => ({
	padding: "20px 0",
	color: "#fff",
	background: theme.palette.primary.dark,
	[theme.breakpoints.down("md")]: {
		textAlign: "center"
	}
}));

// ==============================|| LANDING - FOOTER PAGE ||============================== //

const FooterPage = () => {
	const theme = useTheme();

	return (
		<div className="footer">
			<FooterWrapper sx={{ mt: 20 }}>
				<Container>
					<Grid container alignItems="center" spacing={gridSpacing}>
						<Grid item xs={12} sm={8}>
							<Grid
								container
								alignItems="center"
								spacing={2}
								sx={{
									justifyContent: "flex-end",
									[theme.breakpoints.down("md")]: {
										justifyContent: "center"
									},
									fontSize: "1.5em"
								}}
							>
								<Grid item>
									<FooterLink
										href="https://discord.gg/X5NEW9q8FG"
										target="_blank"
										underline="hover"
									>
										<img
											src={discord}
											alt="discord"
											style={{
												height: 36,
												marginRight: 5
											}}
										/>
										Join our Discord
									</FooterLink>
								</Grid>
								<Grid item>
									<FooterLink
										href="mailto:giancarlo@dappify.com"
										target="_blank"
										underline="hover"
									>
										<EmailIcon />
										Contact us
									</FooterLink>
								</Grid>
								{/* <Grid item>
                                    <FooterLink href="https://twitter.com/codedthemes" target="_blank" underline="hover">
                                        <TwitterIcon />
                                        Twitter
                                    </FooterLink>
                                </Grid> */}
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</FooterWrapper>
			<FooterSubWrapper>
				<Container>
					<Typography
						variant="subtitle2"
						component="div"
						color="inherit"
						fontSize="1.3em"
					>
						&#169; Dappify
					</Typography>
				</Container>
			</FooterSubWrapper>
		</div>
	);
};

export default FooterPage;
