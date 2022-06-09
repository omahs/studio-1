// material-ui
import { styled } from '@mui/material/styles';

// project imports
import Header from 'views/landing/Header';
import Feature from 'views/landing/Feature';
import KeyFeature from 'views/landing/KeyFeature';
import Steps from 'views/landing/Steps';
import Subscribe from 'views/landing/Subscribe';
import Footer from 'views/landing/Footer';
import Projects from 'views/projects/Projects';
import AppBar from 'common/AppBar';
import background from 'assets/images/landing/bg5.svg';
import Options from 'views/marketplace/Options';
import { Box, Button, Container, Grid, Typography, SvgIcon, Icon } from '@mui/material';

// third party
import { motion } from 'framer-motion';
const HeaderWrapper = styled('div')(({ theme }) => ({
    paddingTop: 30,
    overflowX: 'hidden',
    overflowY: 'clip',
    [theme.breakpoints.down('md')]: {
        paddingTop: 42
    }
}));

const SecondWrapper = styled('div')(({ theme }) => ({
    paddingTop: 35,
    minHeight: 700,
    margin: '0 10%',
    [theme.breakpoints.down('md')]: {
        paddingTop: 60
    }
}));

// =============================|| LANDING MAIN ||============================= //

const MarketplacePage = () => (
    <>
        <HeaderWrapper>
            <Box className="landing-dark">
                <img src={background} alt="background" width="100%" />
            </Box>
            <AppBar />
            <Grid container textAlign="center" sx={{ mt: 8 }}>
                <Grid item xs={12}>
                    <motion.div
                        initial={{ opacity: 0, translateY: 550 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 150,
                            damping: 30
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '2.25rem', sm: '4rem', md: '4rem', color: '#fff' },
                                fontWeight: 900,
                                lineHeight: 1
                            }}
                        >
                            Smart Templates for every<br />use case in
                            <Box component="span" sx={{ ml: 2, color: 'white' }}>
                                <em><b>Web3</b></em>
                            </Box>
                        </Typography>
                    </motion.div>
                </Grid>
            </Grid>
        </HeaderWrapper>
        <SecondWrapper>
            <Options />
        </SecondWrapper>
        <Footer />
    </>
);

export default MarketplacePage;
