// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, Container, Grid, Box, Typography } from '@mui/material';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import SpeedIcon from '@mui/icons-material/Speed';
import MonetizableIcon from '@mui/icons-material/AttachMoneyTwoTone';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import SignalCellularNodataIcon from '@mui/icons-material/SignalCellularNodata';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ShieldIcon from '@mui/icons-material/Shield';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import landingVideo from 'assets/videos/Build.mp4';

// ============================|| LANDING - KEY FEATURE PAGE ||============================ //

const KeyFeaturePage = () => {
    const theme = useTheme();
    const avatarIconSx = {
        ...theme.typography.commonAvatar,
        cursor: 'initial',
        width: 72,
        height: 72
    };

    return (
        <Container sx={{ position: 'relative' }}>
            <Grid container justifyContent="left" spacing={gridSpacing} sx={{ textAlign: 'left' }}>
                <Grid item xs={12} sm={6}>
                    <video loop autoplay="autoplay" muted style={{ borderRadius: 6, width: '100%', height: 'auto' }}>
                        <source src={landingVideo} type="video/mp4" />
                        Your browser does not support HTML video.
                    </video>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                    <Grid item xs={12} sx={{ mt: 5, mb: 3 }}>
                        <Typography className="landing-title" component="h1">Simple yet Flexible, Free yet Priceless</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className="landing-description" component="h2">
                            Dappify is a DYI Builder platform for Web3 applications from ready-made, modular templates. 
                            Launching your custom branded dApp is as simple as selecting a template and configuring it to meet your needs.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={gridSpacing}>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...avatarIconSx,
                                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : 'primary.light',
                                                    color: theme.palette.primary.main
                                                }}
                                            >
                                                <SpeedIcon fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth className="landing-description">
                                            No-code, Fast
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...avatarIconSx,
                                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark[900] : 'secondary.light',
                                                    color: theme.palette.secondary.main
                                                }}
                                            >
                                                <MonetizableIcon fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth className="landing-description">
                                            Monetizable
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...avatarIconSx,
                                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : 'primary.light',
                                                    color: theme.palette.primary.main
                                                }}
                                            >
                                                <AspectRatioIcon fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth className="landing-description">
                                            Responsive
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...avatarIconSx,
                                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark[900] : 'secondary.light',
                                                    color: theme.palette.secondary.main
                                                }}
                                            >
                                                <ViewCompactIcon fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth className="landing-description">
                                            Multi-layout
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...avatarIconSx,
                                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark[900] : 'secondary.light',
                                                    color: theme.palette.secondary.main
                                                }}
                                            >
                                                <SettingsIcon fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth className="landing-description">
                                            Configurable
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...avatarIconSx,
                                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : 'primary.light',
                                                    color: theme.palette.primary.main
                                                }}
                                            >
                                                <NotificationsActiveIcon fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth className="landing-description">
                                            Engaging
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...avatarIconSx,
                                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark[900] : 'secondary.light',
                                                    color: theme.palette.secondary.main
                                                }}
                                            >
                                                <DashboardCustomizeIcon fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth className="landing-description">
                                            Modular
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...avatarIconSx,
                                                    background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : 'primary.light',
                                                    color: theme.palette.primary.main
                                                }}
                                            >
                                                <ShieldIcon fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth className="landing-description">
                                            Secure
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

export default KeyFeaturePage;
