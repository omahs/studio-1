import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Stack, Grid, Typography, IconButton, Button, Slide } from '@mui/material';
import NameField from 'views/new/NameField';
import UseCase from 'views/new/UseCase';
import Template from 'views/new/Template';
import Loader from 'views/new/Loader';
import logo from 'assets/images/logo/light-full.svg';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const NewPage = () => {
    const navigate = useNavigate();
    const appState = useSelector((state) => state.app);
    const stepOne = !appState.step && <NameField />;
    const stepTwo = appState.step === 1 && <UseCase />;
    // const stepThree = appState.step === 2 && <Template />;
    const loader = appState.step === 2 && <Loader />;
    const [cantContinue, setCantContinue] = useState(true);


    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Box sx={{ px: 16, py: 8 }} className="new-project-container" component={Stack} direction="column" justifyContent="left" textAlign="left">
                <Box className="project-new-container">
                    <Box className="project-new-image"></Box>
                </Box>
                <Grid container direction="row" sx={{ ml: -8 }}>
                    <Grid item>
                        <IconButton aria-label="Back" onClick={() => navigate('/projects')}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item sx={{ py: 1.25, px: 2 }}>
                        <Typography variant="body" fontSize="1.5em" fontWeight="400">Create a project (Step {appState.step ? appState.step+1 : 1} of 3)</Typography>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 12 }}>
                    {stepOne}
                    {stepTwo}
                    {/*stepThree*/}
                    {loader}
                </Box>
                <Grid container sx={{ mt: 8 }}>
                    <Grid item>
                        <Button variant="contained" size="large" sx={{ px: 8 }} disabled={cantContinue}>Continue</Button>
                    </Grid>
                </Grid>
            </Box>
        </Slide>
    );
};

export default NewPage;
