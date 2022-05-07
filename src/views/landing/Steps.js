// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography, Box } from '@mui/material';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// assets
import PaletteTwoToneIcon from '@mui/icons-material/PaletteTwoTone';
import ReorderTwoToneIcon from '@mui/icons-material/ReorderTwoTone';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BuildIcon from '@mui/icons-material/Build';
import LaunchIcon from '@mui/icons-material/Launch';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import PublishIcon from '@mui/icons-material/Publish';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// =============================|| LANDING - FEATURE PAGE ||============================= //

const StepsPage = () => {
    const theme = useTheme();

    return (
        <Container id="steps">
            <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
                <Grid item sx={{ mb: 5 }}>
                    <Grid item xs={12} sx={{ mt: 5, mb: 3 }}>
                        <Typography className="landing-title">Your next dApp is just 3 steps away!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className="landing-description">
                            Configure, publish and manage web3 projects from the dashboard. You have access to monitoring and analytics
                            tools to track your users and your revenue streams.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
                        <Grid item md={4} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container justifyContent="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                size="xl"
                                                sx={{
                                                    background: 'transparent',
                                                    color: theme.palette.primary.main,
                                                    fontSize: '4em'
                                                }}
                                            >
                                                <SettingsIcon fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">1. Configure</Typography>
                                        </Grid>
                                        <Grid item xs={12} className="use-case-description">
                                            Select your template and select features, set permissions and define revenue model
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item md={4} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container justifyContent="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                size="xl"
                                                sx={{
                                                    background: 'transparent',
                                                    color: theme.palette.primary.main,
                                                    fontSize: '4em'
                                                }}
                                            >
                                                <PublishIcon fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">2. Publish</Typography>
                                        </Grid>
                                        <Grid item xs={12} className="use-case-description">
                                            Launch your dApp live and have your users engage.
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item md={4} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container justifyContent="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                size="xl"
                                                variant="rounded"
                                                sx={{
                                                    background: 'transparent',
                                                    color: theme.palette.primary.main,
                                                    fontSize: '4em'
                                                }}
                                            >
                                                <AttachMoneyIcon fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">3. Profit</Typography>
                                        </Grid>
                                        <Grid item xs={12} className="use-case-description">
                                            Track your revenue and traffic, control permissions for users and content creators
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default StepsPage;
