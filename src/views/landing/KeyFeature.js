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
            <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
                <Grid item xs={12}>
                    <Grid item xs={12} sx={{ mt: 0, mb: 3 }}>
                        <Typography className="landing-title" component="h1">Simple yet Flexible, Free yet Priceless</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className="landing-description" component="h2">
                            Craft and launch web3 projects, from templates, without having to write a single line of code. Dappify lowers
                            the entry barrier for builders into web3 by abstracting them on the complexities of blockchain & UX with
                            pre-built templates they can adapt for their own needs that offer an ultra friendly end experience for their
                            users.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <video loop autoplay="autoplay" muted style={{ borderRadius: 6, width: '60%', height: 'auto' }}>
                        <source src={landingVideo} type="video/mp4" />
                        Your browser does not support HTML video.
                    </video>
                </Grid>
            </Grid>
        </Container>
    );
};

export default KeyFeaturePage;
