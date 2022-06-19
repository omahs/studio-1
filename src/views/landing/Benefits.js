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
import CodeOffIcon from '@mui/icons-material/CodeOff';
import PeopleIcon from '@mui/icons-material/People';

import template1 from 'assets/images/template1.png';

// =============================|| LANDING - FEATURE PAGE ||============================= //

const Benefits = () => {

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
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
                
                    <Grid item xs={12}>
                    <Grid item sx={{ mb: 5 }}>
                        <Grid item xs={12} sx={{ mt: 5, mb: 3 }}>
                            <Typography className="landing-title" component="h1">Why build with Dappify?</Typography>
                        </Grid>
                    </Grid>
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
                                            1-click deploy
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
                                            Free
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
                                            Brandable
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
                                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark[900] : 'secondary.light',
                                                    color: theme.palette.secondary.main
                                                }}
                                            >
                                                <CodeOffIcon fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth className="landing-description">
                                           No-code
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
                                                <PeopleIcon fontSize="large" />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth className="landing-description">
                                            Community-driven
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



                        {/*<Grid item lg={4} xs={12}>
                            <FadeInWhenVisible>
                                <SubCard className="feature-highlight" elevation="0" sx={{ ':hover': { boxShadow: 20 } }}>
                                    <Grid container justifyContent="center" spacing={2}>
                                        <Grid item className="use-case">
                                            <img src={templateNftMarketplace} alt="Build an NFT Marketplace" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">White Label NFT Marketplace</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography className="use-case-description" component="h4">
                                                From tokenized artwork to audio and ingame items, you name it, there is one template that
                                                will fit your needs. Launch a beautiful, custom branded NFT marketplace you control in
                                                seconds.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Chip label="In development" variant="contained" color="secondary" size="large" />
                                        </Grid>
                                        {displayActions('NFT_MARKETPLACE')}
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <FadeInWhenVisible>
                                <SubCard className="feature-highlight" elevation="0" sx={{ ':hover': { boxShadow: 20 } }}>
                                    <Grid container justifyContent="center" spacing={2}>
                                        <Grid item className="use-case">
                                            <img src={imagePayment} alt="Launch Crypto Payments via QR Code for your business" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">QR Code Payments</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography className="use-case-description" component="h4">
                                                Businesses and individuals looking to setup a secure payment point of sale to accept
                                                payments in crypto now have a 1 click secure and transparent solution powered by blockchain.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Chip label="In backlog" variant="outlined" color="secondary" size="large" />
                                        </Grid>
                                        {displayActions('QR_CODE_PAYMENTS')}
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <FadeInWhenVisible>
                                <SubCard className="feature-highlight" elevation="0" sx={{ ':hover': { boxShadow: 20 } }}>
                                    <Grid container justifyContent="center" spacing={2}>
                                        <Grid item className="use-case">
                                            <img src={imageTicket} alt="Launch an NFT based ticketing dApp" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">Ticket Sales</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography className="use-case-description" component="h4">
                                                A suite of ticketing tools, from your own custom ticket wallet app to real-time dashboard.
                                                Everything you need to start selling tickets.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Chip label="In backlog" variant="outlined" color="secondary" size="large" />
                                        </Grid>
                                        {displayActions('TICKET_SALES')}
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <FadeInWhenVisible>
                                <SubCard className="feature-highlight" elevation="0" sx={{ ':hover': { boxShadow: 20 } }}>
                                    <Grid container className="feature-highlight-content" justifyContent="center" spacing={2}>
                                        <Grid item className="use-case">
                                            <img src={imageBooking} alt="Create an on-chain Event Booking dApp" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">Event Booking</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography className="use-case-description" component="h4">
                                                Host events, manage bookings and waiting lists, all onchain. You can create your own Booking
                                                app and generate additional sales without paying commissions. All tools are seamlessly
                                                integrated.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Chip label="In backlog" variant="outlined" color="secondary" size="large" />
                                        </Grid>
                                        {displayActions('BOOKINGS')}
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <FadeInWhenVisible>
                                <SubCard className="feature-highlight" elevation="0" sx={{ ':hover': { boxShadow: 20 } }}>
                                    <Grid container className="feature-highlight-content" justifyContent="center" spacing={2}>
                                        <Grid item className="use-case">
                                            <img src={imageBlog} alt="Build a decentralized blog" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">Blog</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography className="use-case-description" component="h4">
                                                Share your story through a cutomized blog where you can engage with your audience and
                                                monetize your content, all decentralized. Dappify helps you build that wanted experience and
                                                gives you the tools to build it beautifully.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Chip label="In backlog" variant="outlined" color="secondary" size="large" />
                                        </Grid>
                                        {displayActions('BLOG')}
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <FadeInWhenVisible>
                                <SubCard className="feature-highlight" elevation="0" sx={{ ':hover': { boxShadow: 20 } }}>
                                    <Grid container className="feature-highlight-content" justifyContent="center" spacing={2}>
                                        <Grid item className="use-case">
                                            <img src={imageLanding} alt="Create a Web3 landing page to get leads" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">Landing Page</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography className="use-case-description" component="h4">
                                                Lead pages helps individuals and small businesses connect with their audience, collect
                                                leads, and close sales and deals. Easily build personal or business landing pages, share
                                                information and engage via a CTA button.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Chip label="In backlog" variant="outlined" color="secondary" size="large" />
                                        </Grid>
                                        {displayActions('LANDING_PAGE')}
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <FadeInWhenVisible>
                                <SubCard className="feature-highlight" elevation="0" sx={{ ':hover': { boxShadow: 20 } }}>
                                    <Grid container className="feature-highlight-content" justifyContent="center" spacing={2}>
                                        <Grid item className="use-case">
                                            <img src={imageChat} alt="Build a Web3 messaging dApp" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">Messaging</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography className="use-case-description" component="h4">
                                                Send and receive a variety of media: text, photos, videos, documents, and voice calls. Share
                                                your moments with your community, powered by blockchain.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Chip label="In backlog" variant="outlined" color="secondary" size="large" />
                                        </Grid>
                                        {displayActions('CHAT')}
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <FadeInWhenVisible>
                                <SubCard className="feature-highlight" elevation="0" sx={{ ':hover': { boxShadow: 20 } }}>
                                    <Grid container className="feature-highlight-content" justifyContent="center" spacing={2}>
                                        <Grid item className="use-case">
                                            <img src={imageMembership} alt="Launch NFT based memberships and leases" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">Memberships</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography className="use-case-description" component="h4">
                                                Build and maintain authentic relationships with your members at every phase of their life
                                                cycle. Create perks embedded in NFT membership plans your network can use to enjoy your
                                                product or service.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Chip label="In backlog" variant="outlined" color="secondary" size="large" />
                                        </Grid>
                                        {displayActions('MEMBERSHIPS')}
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
    </Grid>*/}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Benefits;
