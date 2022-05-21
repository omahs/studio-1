// material-ui
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography, Box, Chip, Button, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

import templateNftMarketplace from 'assets/images/marketplace.jpeg';
import templateQrCode from 'assets/images/qr_code.png';

import howItWorks from 'assets/images/how-it-works.svg';
import { SNACKBAR_OPEN } from 'store/actions';
// assets
import PaletteTwoToneIcon from '@mui/icons-material/PaletteTwoTone';
import ReorderTwoToneIcon from '@mui/icons-material/ReorderTwoTone';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';
import background from 'assets/images/landing/bg.svg';
import likeImg from 'assets/images/like.png';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useMoralis } from 'react-moralis';

import imageBooking from 'assets/images/booking.jpeg';
import imageTicket from 'assets/images/ticket.jpeg';
import imagePayment from 'assets/images/payment.jpeg';
import imageBlog from 'assets/images/blog.jpeg';
import imageLanding from 'assets/images/landing.jpeg';
import imageChat from 'assets/images/chat.jpeg';
import imageMembership from 'assets/images/membership.jpeg';

// =============================|| LANDING - FEATURE PAGE ||============================= //

const FeaturePage = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { Moralis } = useMoralis();
    const [votes, setVotes] = useState({});
    const [myVotes, setMyVotes] = useState({});

    const loadVotes = async () => {
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
    };

    const vote = async (template) => {
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
                    <Grid item xs={12}>
                        <Typography className="landing-description" sx={{ color: 'white' }} component="h2">
                            Craft and launch web3 projects, from templates, without having to write a single line of code. Dappify lowers
                            the entry barrier for builders into web3 by abstracting them on the complexities of blockchain & UX with
                            pre-built templates they can adapt for their own needs that offer an ultra friendly end experience for their
                            users.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
                        <Grid item lg={4} xs={12}>
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
                                    {/* <Box className="voting-overlay">
                                        <img src={likeImg} alt="like" />
                                        <Typography variant="h1">VOTE</Typography>
    </Box> */}
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
                                    {/* <Box className="voting-overlay">
                                        <img src={likeImg} alt="like" />
                                        <Typography variant="h1">VOTE</Typography>
    </Box> */}
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
                                    {/* <Box className="voting-overlay">
                                        <img src={likeImg} alt="like" />
                                        <Typography variant="h1">VOTE</Typography>
    </Box> */}
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
                                    {/* <Box className="voting-overlay">
                                        <img src={likeImg} alt="like" />
                                        <Typography variant="h1">VOTE</Typography>
    </Box> */}
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
                                    {/* <Box className="voting-overlay">
                                        <img src={likeImg} alt="like" />
                                        <Typography variant="h1">VOTE</Typography>
    </Box> */}
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
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FeaturePage;
