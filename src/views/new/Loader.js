import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UPDATE_APP } from 'store/actions';
import { TextField, Grid, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import Project from 'react-dappify/model/Project';

import { useMoralis } from 'react-moralis';

const loadingSteps = [
    'Building workspace',
    'Preparing dApp',
    'Grooming dApp design',
    'Making coffee',
    'Preparing deployment',
    'Writing poems about dApps',
    'Terraforming blockchain',
    'Getting things done',
    'Applying design paradigms'
];

const styles = { 'aria-label': 'description', style: { fontSize: '2.5em', height: '2.25em' } };

const Loader = () => {
    const appState = useSelector((state) => state.app);
    const [loadingStep, setLoadingStep] = useState(0);
    const { Moralis, user, isAuthenticated, authenticate } = useMoralis();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            const index = Math.floor(Math.random() * 9);
            setLoadingStep(index);
        }, 1500);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const publishChanges = async () => {
        const savedProject = await Project.create(appState, user);
        dispatch({ type: UPDATE_APP, configuration: savedProject.get('config') });
        navigate(`/studio/overview`);
    };

    const checkAuth = async () => {
        if (!isAuthenticated) {
            await authenticate();
        }
        if (user) {
            setTimeout(() => {
                publishChanges();
            }, 3000);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <Grid container>
            <Grid item xs={12}>
                <div className="tetrominos">
                    <div className="tetromino box1" />
                    <div className="tetromino box2" />
                    <div className="tetromino box3" />
                    <div className="tetromino box4" />
                </div>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 55 }}>
                <Typography className="landing-description-white">{`${loadingSteps[loadingStep]}...`}</Typography>
            </Grid>
        </Grid>
    );
};

export default Loader;
