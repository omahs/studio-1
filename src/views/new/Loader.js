import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UPDATE_APP } from 'store/actions';
import { TextField, Grid, Typography, Alert, CircularProgress, Box } from '@mui/material';
import { withStyles } from '@mui/styles';
import Project from 'react-dappify/model/Project';
import PropTypes from 'prop-types';
import { useMoralis } from 'react-moralis';


function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} size={160} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h1" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  
  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };

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

const Loader = ({onChange}) => {
    const appState = useSelector((state) => state.app);
    const [loadingStep, setLoadingStep] = useState(0);
    const { Moralis, user, isAuthenticated, authenticate } = useMoralis();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isReady, setReady] = useState();

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         const index = Math.floor(Math.random() * 9);
    //         setLoadingStep(index);
    //     }, 1500);
    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);

    // const publishChanges = async () => {
        // const savedProject = await Project.create(appState, user);
        // dispatch({ type: UPDATE_APP, configuration: savedProject.get('config') });
        // navigate(`/studio/overview`);
    // };

    // const showReady = () => {
    //     publishChanges();
    //     onChange
    // }

    const [progress, setProgress] = useState(20);
    useEffect(() => {
        if (progress >= 100) {
            setReady(true);
            onChange(true);
        }
    }, [progress]);


    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 20));
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);
    const ready = isReady && (
        <Alert variant="filled" severity="success">Your new project is ready!</Alert>
    )

    const loader = (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sx={{ textAlign: 'center', position: 'absolute' }}>
                <CircularProgressWithLabel value={progress} />;
            </Grid>
            <Grid item sx={{ marginTop: 30, textAlign: 'center', height: 50 }}>
                {ready}
            </Grid>
        </Grid>
    );


    return loader;
};

export default Loader;
