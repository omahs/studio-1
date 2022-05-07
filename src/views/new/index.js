import { useSelector } from 'react-redux';
import { Box, Stack, Grid } from '@mui/material';
import NameField from 'views/new/NameField';
import UseCase from 'views/new/UseCase';
import Template from 'views/new/Template';
import Loader from 'views/new/Loader';
import logo from 'assets/images/logo/light-full.svg';

const NewPage = () => {
    const appState = useSelector((state) => state.app);
    const stepOne = !appState.step && <NameField />;
    const stepTwo = appState.step === 1 && <UseCase />;
    // const stepThree = appState.step === 2 && <Template />;
    const loader = appState.step === 2 && <Loader />;

    return (
        <Box className="new-project-container" component={Stack} direction="column" justifyContent="center" textAlign="center">
            <Grid container direction="row" alignItems="center" sx={{ position: 'absolute', top: 0, padding: 5 }}>
                <img src={logo} alt="Dappify" width="110" style={{ margin: '0 auto', width: 400 }} />
            </Grid>
            <Box sx={{ mt: 20 }}>
                {stepOne}
                {stepTwo}
                {/*stepThree*/}
                {loader}
            </Box>
        </Box>
    );
};

export default NewPage;
