import { useState } from 'react';
import { UPDATE_APP } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, Grid, Typography, Alert } from '@mui/material';
import { withStyles } from '@mui/styles';
import Project from 'react-dappify/model/Project';

const WhiteTextField = withStyles({
    root: {
        '& .MuiInputBase-input': {
            color: '#fff' // Text color
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#fff8' // Semi-transparent underline
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#fff' // Solid underline on hover
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fff' // Solid underline on focus
        }
    }
})(TextField);

const styles = { 'aria-label': 'description', style: { fontSize: '2.5em', height: '2.25em' } };

const NameField = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const [appName, setAppName] = useState('');
    const [appSubdomain, setAppSubdomain] = useState('subdomain');
    const [exists, setExists] = useState();

    const generateSubdomain = async (name) => {
        const suffix = Math.random().toString(36).substr(2, 3);
        const prefix = name ? name.toLowerCase().replace(/\s/g, '').replace(/\W/g, '') : 'subdomain';
        const found = await Project.exists(prefix);
        setExists(found);
        setAppSubdomain(`${prefix}`);
        setAppName(name);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            appState.step = 1;
            appState.name = appName;
            appState.subdomain = appSubdomain;
            dispatch({ type: UPDATE_APP, configuration: appState });
        }
    };

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ px: '5%' }} spacing={2}>
            <Grid item xs={12}>
                <WhiteTextField
                    className="new-project-input"
                    placeholder="e.g Dappify Studio"
                    label="Project Name"
                    inputProps={styles}
                    InputLabelProps={{ style: { fontSize: '0.5em', color: 'white' } }}
                    variant="standard"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => generateSubdomain(e.target.value)}
                    autoFocus
                />
            </Grid>
            <Grid item xs={12}>
                <Typography sx={{ color: 'white', fontSize: '1.5em', fontWeight: 100, opacity: 0.7 }}>
                    <b>https://</b>
                    <i>
                        <u>{appSubdomain}</u>
                    </i>
                    <b>.dappify.us</b>
                </Typography>
            </Grid>
            <Grid item sx={{ height: 40 }}>
                {exists && (<Alert severity="error">Project name taken</Alert>)}
            </Grid>
        </Grid>
    );
};

export default NameField;
