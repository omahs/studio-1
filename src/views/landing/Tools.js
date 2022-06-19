// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, Container, Grid, Link, Typography, Box } from '@mui/material';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import imgbase from 'assets/images/demodapp.png';
import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone';
import CodeTwoToneIcon from '@mui/icons-material/CodeTwoTone';
import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import CallSplitTwoToneIcon from '@mui/icons-material/CallSplitTwoTone';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import MobileDevicePreview from 'views/application/MobileDevicePreview';

import EthLogo from 'assets/images/logo_eth.svg';
import AvaLogo from 'assets/images/logo_avalanche.svg';
import PolygonLogo from 'assets/images/logo_polygon.svg';
import BscLogo from 'assets/images/logo_bsc.svg';
import { constants } from 'react-dappify';

const { NETWORKS, LOGO } = constants;

// ============================|| LANDING - KEY FEATURE PAGE ||============================ //

// const supportedChains = [
//     {
//         name: 'Ethereum',
//         logo: EthLogo
//     },
//     {
//         name: 'Avalanche',
//         logo: AvaLogo
//     },
//     {
//         name: 'Polygon',
//         logo: PolygonLogo
//     },
//     {
//         name: 'BNB Chain',
//         logo: BscLogo
//     }
// ];

const ToolsPage = () => {
    const theme = useTheme();
    const avatarIconSx = {
        ...theme.typography.commonAvatar,
        cursor: 'initial',
        width: 72,
        height: 72
    };

    const displayChains = () => {
        const chains = [];
        const supportedNetworks = Object.keys(NETWORKS);
        supportedNetworks.forEach((chain) => {
            const network = NETWORKS[chain];
            const logo = LOGO[network.nativeCurrency.symbol];
            chains.push(
                <Grid item xs={6} md={2} key={network.chainName} sx={{ my: 2 }}>
                    <Box>
                        <Grid item xs={12}>
                            <img src={logo} alt={network.chainName} height="96" />
                        </Grid>
                        <Grid item xs={12} sx={{ py: 2 }}>
                            <Typography variant="h5">{network.chainName}</Typography>
                        </Grid>
                    </Box>
                </Grid>
            );
        });
        return chains;
    };

    return (
        <Container>
            <Grid container>
                <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
                    <Grid item sx={{ mb: 5 }}>
                        <Grid item xs={12} sx={{ mt: 5, mb: 3 }}>
                            <Typography className="landing-title">Dappify supports a multi-chain ecosystem of blockchains</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                        {displayChains()}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ToolsPage;
