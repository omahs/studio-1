// material-ui
import { styled } from '@mui/material/styles';

// project imports
import Footer from 'views/landing/Footer';
import Questions from 'views/faq/Questions';
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

const FaqPage = () => (
    <>
        <HeaderWrapper id="home">
            <AppBar />
        </HeaderWrapper>
        <SecondWrapper>
            <Questions />
        </SecondWrapper>
        {/*
        <SecondWrapper>
            <Layouts />
        </SecondWrapper>
        <SecondWrapper>
            <KeyFeature />
        </SecondWrapper> 
        <SecondWrapper>
            <Steps />
        </SecondWrapper>
        <SecondWrapper>
            <Subscribe />
        </SecondWrapper> */}
        <Footer />
        {/* <Customization /> */}
    </>
);

export default FaqPage;
