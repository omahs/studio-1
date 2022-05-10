import { useState } from 'react';
import { UPDATE_APP } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { TextField, Grid, Typography, Alert, Chip, Tooltip, Button, DialogContentText, DialogTitle, DialogActions, Dialog, DialogContent } from '@mui/material';
import { withStyles } from '@mui/styles';
import Project from 'react-dappify/model/Project';
import EditIcon from '@mui/icons-material/Edit';

const styles = { 'aria-label': 'description', style: { fontSize: '2.5em', height: '2.25em' } };

const NameField = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const [appName, setAppName] = useState('');
    const [appSubdomain, setAppSubdomain] = useState('subdomain');
    const [exists, setExists] = useState();
    const [error, setError] = useState();
    const [showEditor, setShowEditor] = useState();

    const generateSubdomain = async (name) => {
        const suffix = Math.random().toString(36).substr(2, 3);
        const prefix = name ? name.toLowerCase().replace(/\s/g, '').replace(/\W/g, '') : 'subdomain';
        const found = await Project.exists(prefix);
        setError(found ? 'Project subdomain taken, please set a different subdomain' : null);
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
        <Grid container direction="row" justifyContent="left" alignItems="left" spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h1" fontWeight="regular" sx={{ mb: 5 }}>Let's start with a name for<br/>your <span className="project-keyword">project</span></Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fontSize="3em"
                    placeholder="Enter your project name"
                    variant="standard"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => generateSubdomain(e.target.value)}
                    autoFocus
                    sx={{ 
                        input: { 
                            "&::placeholder": {
                                fontSize: 34,
                                fontWeight: '500',
                                color: 'rgba(0,0,0,0.9)'
                            } 
                        }
                    }} 
                    inputProps={{
                        style: {
                            fontSize: 40,    
                            color:   theme.palette.primary.dark
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Tooltip title="A unique identifier subdomain for your project">
                    <Chip icon={<EditIcon sx={{ fontSize: '1.2em', paddingLeft: 1, width: 25 , opacity: 0.75 }} />} label={`https://${appSubdomain}.dappify.us`}  variant="outlined" onClick={() => setShowEditor(true)}/>
                </Tooltip>
            </Grid>
            <Grid item xs={12}>
                { error && (<Alert variant="filled" severity="error" sx={{ fontSize: "1em", height: 28 }}>{error}</Alert>)}
            </Grid>

            <Dialog open={showEditor} onClose={() => showEditor(false)}>
                <DialogTitle>Project Subdomain</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your project's globally unique subdomain, used as your URL. You cannot change your project subdomain after project creation.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Project subdomain"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={appSubdomain}
                        onChange={(e) => {generateSubdomain(e.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowEditor(false)}>Cancel</Button>
                    <Button onClick={() => {
                        setShowEditor(false)
                    }}>Save</Button>
                </DialogActions>
            </Dialog>

        </Grid>
    );
};

export default NameField;
