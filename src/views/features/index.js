import { FormGroup, FormControlLabel, Grid, Switch, Paper, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';

import { setBoolean, setFeature } from 'utils/config';

const FeaturesPage = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                <Grid item xs={12}>
                    <Typography variant="h2">Explore</Typography>
                    <Typography variant="body">Allows users to search for NFTs with filters</Typography>
                    <Paper variant="outlined"  sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={4}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="secondary"
                                                checked={appState?.feature?.exploreSideMenu}
                                                onChange={(e) => setBoolean(dispatch, appState, 'exploreSideMenu', e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        label="Side filter instead of on the top"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2">Comments</Typography>
                    <Typography variant="body">Allow comments and replies to collections and NFTs</Typography>
                    <Paper variant="outlined"  sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={4}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="secondary"
                                                checked={appState?.feature?.comments}
                                                onChange={(e) => setFeature(dispatch, appState, 'comments', e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        label="Enabled"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2">Stats</Typography>
                    <Typography variant="body">Enable a new tab with Ranking and Activity</Typography>
                    <Paper variant="outlined"  sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={4}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="secondary"
                                                checked={appState?.feature?.stats}
                                                onChange={(e) => setFeature(dispatch, appState, 'stats', e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        label="Enabled"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2">Social</Typography>
                    <Typography variant="body">Enable social interactions between users</Typography>
                    <Paper variant="outlined"  sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={4}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="secondary"
                                                checked={appState?.feature?.social}
                                                onChange={(e) => setFeature(dispatch, appState, 'social', e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        label="Enabled"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2">News Section</Typography>
                    <Typography variant="body">Create announcements and keep your users engaged</Typography>
                    <Paper variant="outlined"  sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={4}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="secondary"
                                                checked={appState?.feature?.news}
                                                onChange={(e) => setFeature(dispatch, appState, 'news', e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        label="Enabled"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2">NFT Actions</Typography>
                    <Typography variant="body">What can users do within the platform</Typography>
                    <Paper variant="outlined"  sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="secondary"
                                                checked={appState?.feature?.create}
                                                onChange={(e) => setFeature(dispatch, appState, 'create', e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        label="Users can create their own collections"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="secondary"
                                                checked={appState?.feature?.auction}
                                                onChange={(e) => setFeature(dispatch, appState, 'auction', e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        label="Enable timed auctions"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="secondary"
                                                checked={appState?.feature?.bids}
                                                onChange={(e) => setFeature(dispatch, appState, 'bids', e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        label="Enable bidding"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default FeaturesPage;
