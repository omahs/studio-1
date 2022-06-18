// material-ui
import { Paper, Container, Grid, Typography, Box } from '@mui/material';
// project imports
import { gridSpacing } from 'store/constant';
// assets
import background from 'assets/images/landing/bg.svg';

import template1 from 'assets/images/template1.png';

// =============================|| LANDING - FEATURE PAGE ||============================= //

const FeaturePage = () => {
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
