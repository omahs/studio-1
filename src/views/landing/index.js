// material-ui
import { styled } from '@mui/material/styles';

// project imports
import Header from './Header';
import Feature from './Feature';
import KeyFeature from './KeyFeature';
import Steps from './Steps';
import Subscribe from './Subscribe';
import Footer from './Footer';
import Tools from 'views/landing/Tools';
import AppBar from 'common/AppBar';
import { Box } from '@mui/material';
import background from 'assets/images/landing/bg.svg';
import background2 from 'assets/images/landing/bg2.svg';
import background3 from 'assets/images/landing/bg4.svg';

const HeaderWrapper = styled('div')(({ theme }) => ({
    paddingTop: 30,
    overflowX: 'hidden',
    overflowY: 'clip',
    [theme.breakpoints.down('md')]: {
        paddingTop: 42
    }
}));

const SecondWrapper = styled('div')(({ theme }) => ({
    paddingTop: 160,
    [theme.breakpoints.down('md')]: {
        paddingTop: 60
    }
}));

// =============================|| LANDING MAIN ||============================= //

const Landing = () => (
    <>
        <HeaderWrapper>
            <Box className="landing-dark">
                <img src={background} alt="background" width="100%" />
            </Box>
            <AppBar />
            <Header />
        </HeaderWrapper>
        <SecondWrapper>
            <KeyFeature />
        </SecondWrapper>
        <SecondWrapper sx={{ minHeight: '1200px' }}>
            <Box sx={{ position: 'relative' }}>
                <Box className="landing-dark">
                    <img src={background2} alt="background" width="100%" />
                </Box>
            </Box>
            <Feature />
        </SecondWrapper>
        <SecondWrapper sx={{ minHeight: '500px', pt: 50, pb: 10 }}>
            <Tools />
        </SecondWrapper>
        <SecondWrapper sx={{ minHeight: '1300px' }}>
            <Box sx={{ position: 'relative' }}>
                <Box className="landing-dark">
                    <img src={background3} alt="background" width="100%" />
                </Box>
            </Box>
            <Steps />
        </SecondWrapper>
        <SecondWrapper>
            <Subscribe />
        </SecondWrapper>
        <Footer />
    </>
);

export default Landing;
