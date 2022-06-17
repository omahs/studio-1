// material-ui
import { useEffect, useState } from 'react';
import { Paper, Container, Grid, Typography, Box, Chip, Button, Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

import { useTheme } from '@mui/material/styles';

import templateNftMarketplace from 'assets/images/marketplace.jpeg';

import { SNACKBAR_OPEN } from 'store/actions';
// assets
import background from 'assets/images/landing/bg.svg';
import { useMoralis } from 'react-moralis';

import imageBooking from 'assets/images/booking.jpeg';
import imageTicket from 'assets/images/ticket.jpeg';
import imagePayment from 'assets/images/payment.jpeg';
import imageBlog from 'assets/images/blog.jpeg';
import imageLanding from 'assets/images/landing.jpeg';
import imageChat from 'assets/images/chat.jpeg';
import imageMembership from 'assets/images/membership.jpeg';

import SpeedIcon from '@mui/icons-material/Speed';
import MonetizableIcon from '@mui/icons-material/AttachMoneyTwoTone';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import SignalCellularNodataIcon from '@mui/icons-material/SignalCellularNodata';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ShieldIcon from '@mui/icons-material/Shield';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';

import template1 from 'assets/images/template1.png';

// =============================|| LANDING - FEATURE PAGE ||============================= //

const FeaturePage = () => {
    const dispatch = useDispatch();
    const { Moralis } = useMoralis();
    const [votes, setVotes] = useState({});
    const [myVotes, setMyVotes] = useState({});

    const loadVotes = async () => {
        try {
            const totalVotes = await Moralis.Cloud.run('getTotalTemplateVotes');
            const result = totalVotes.reduce((map, obj) => {
                map[obj.objectId] = obj.count;
                return map;
            }, {});
            setVotes(result);

            const myVotes = await Moralis.Cloud.run('getMyTemplateVotes');
            const myResults = myVotes.reduce((map, obj) => {
                map[obj.get('name')] = true;
                return map;
            }, {});
            setMyVotes(myResults);
        } catch (e) {
            
        }
    };

    const vote = async (template) => {
        try {
            const TemplateVote = Moralis.Object.extend('TemplateVote');
            const vote = new TemplateVote();
            vote.set('name', template);
            await vote.save().then(
                () => {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: 'Thank you vor voting!',
                        variant: 'alert',
                        alertSeverity: 'success'
                    });
                },
                (error) => {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: error.message,
                        variant: 'alert',
                        alertSeverity: 'error'
                    });
                }
            );
            await loadVotes();
        } catch (e) {

        }
    };

    useEffect(() => {
        loadVotes();
    }, []);

    const displayActions = (template) => (
        <Grid item xs={12}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {!myVotes[template] && (
                        <Button variant="outlined" onClick={() => vote(template)}>
                            Vote for this template
                        </Button>
                    )}
                    {myVotes[template] && <Button disabled>I voted for this template!</Button>}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body">
                        <i>
                            {myVotes[template] ? 'You and other' : 'Other'} {votes[template]} people liked this template
                        </i>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );

    const theme = useTheme();
    const avatarIconSx = {
        ...theme.typography.commonAvatar,
        cursor: 'initial',
        width: 72,
        height: 72
    };

    return (
        <Container>
            <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
                <Box className="landing-dark">
                    <img src={background} width="100%" alt="Create dApps from templates" />
                </Box>
                <Grid item sx={{ mb: 5 }}>
                    <Grid item xs={12} sx={{ mt: 5, mb: 3 }}>
                        <Typography className="landing-title-white" component="h1">Start building your own app from our templates</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ 
                            p:0,
                            width: '85%',
                            height: 375,
                            background: `url(${template1})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: 6,
                            overflow: 'hidden',
                            margin: '0 auto'
                        }} elevation={20} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid item xs={12} sx={{ mt: 5, mb: 3 }}>
                            <Typography className="landing-title-white" component="h1">Templates for NFT, DeFi, GameFi, DAO and more</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className="landing-description" sx={{ color: 'white' }} component="h2">
                                Launch NFT Marketplaces, NFT Minters, Payments solutions, DAOs and more. Templates offer pre-launched smart contracts so you don't have to pay for the deployment yourself but you are always free to launch your own version.
                            </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FeaturePage;
