import { Paper, Typography, Grid, Switch, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { BlockPicker } from 'react-color';
import { gridSpacing } from 'store/constant';

import { setField, setImage, setBoolean, setColor, setMoralis, setSocial, setFeature } from 'utils/config';

const BackendPage = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);

    return (
        <MainCard>
            <Grid item xs={12}>
                <Typography variant="h2">Backend Configuration</Typography>
                <Typography variant="body">Select how to store your data</Typography>
                <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                    <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                        <Grid item xs={6}>
                            <Paper
                                variant="outlined"
                                elevation="20"
                                sx={{
                                    p: 3,
                                    mt: 2,
                                    cursor: 'pointer',
                                    border: appState?.moralis?.appId ? '1px solid white' : '5px solid white',
                                    textAlign: 'center',
                                    minHeight: '220px'
                                }}
                                className="paper-in backend-managed"
                            >
                                <Typography variant="h1">Dappify Managed Instance</Typography>
                                <Typography variant="body">Fully managed backend by Dappify</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper
                                variant="outlined"
                                elevation="20"
                                sx={{
                                    p: 3,
                                    mt: 2,
                                    cursor: 'pointer',
                                    border: appState?.moralis?.appId ? '5px solid white' : '1px solid white',
                                    textAlign: 'center',
                                    minHeight: '220px'
                                }}
                                className="paper-in backend-custom"
                            >
                                <Typography variant="h1">Custom Moralis Instance</Typography>
                                <Typography variant="body">You can set up your own Moralis instance as backend</Typography>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-appid"
                                        label="Moralis appId"
                                        value={appState?.moralis?.appId}
                                        onChange={(e) => setMoralis(dispatch, appState, 'appId', e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-serverurl"
                                        label="Moralis serverUrl"
                                        value={appState?.moralis?.serverUrl}
                                        onChange={(e) => setMoralis(dispatch, appState, 'serverUrl', e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </MainCard>
    );
};

export default BackendPage;
