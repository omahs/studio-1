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
import { Box } from '@mui/material';
import background from 'assets/images/landing/bg5.svg';

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
    minHeight: 700,
    [theme.breakpoints.down('md')]: {
        paddingTop: 60
    }
}));

// =============================|| LANDING MAIN ||============================= //

const ProjectsPage = () => (
    <>
        <HeaderWrapper>
            <Box className="project-bg image-bg">
                {/** <img src={background} alt="background" width="100%" /> */}
            </Box>
            <AppBar />
        </HeaderWrapper>
        <SecondWrapper>
            <Projects />
        </SecondWrapper>
        <Footer />
    </>
);

export default ProjectsPage;
