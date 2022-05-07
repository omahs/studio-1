// material-ui
import { styled } from '@mui/material/styles';

// project imports
import Header from 'views/landing/Header';
import Feature from 'views/landing/Feature';
import KeyFeature from 'views/landing/KeyFeature';
import Steps from 'views/landing/Steps';
import Subscribe from 'views/landing/Subscribe';
import Footer from 'views/landing/Footer';
import Cases from 'views/cases/Cases';
import AppBar from 'common/AppBar';

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

const CasesPage = () => (
    <>
        <HeaderWrapper id="home">
            <AppBar />
        </HeaderWrapper>
        <SecondWrapper>
            <Cases />
        </SecondWrapper>
        <Footer />
    </>
);

export default CasesPage;
