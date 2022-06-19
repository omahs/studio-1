import { useState } from 'react';
import { Button, FormGroup, FormControlLabel, Grid, Switch, TextField, Paper, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { BlockPicker } from 'react-color';
import { gridSpacing } from 'store/constant';

import { setField, setImage, setBoolean, setColor, setMoralis, setSocial, setFeature } from 'utils/config';

import { UPDATE_APP } from 'store/actions';
import BackgroundCarousel from 'views/template/BackgroundCarousel';
import { useMoralis } from 'react-moralis';

const TemplatePage = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const [isLoading, setLoading] = useState();
    const { Moralis } = useMoralis();

    const renderItems = () => {
        const list = [];
        const items = Object.keys(appState.translation.resources.en.translation);
        items.forEach((item, index) => {
            list.push(
                <Grid container key={index} sx={{ my: 1}}>
                    <Grid item xs={4}>
                        <Typography variant="body" fontWeight={400} fontSize="1.2em">{item}</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth variant="standard"  defaultValue={appState.translation.resources.en.translation[item]} 
                            onChange={(e) => {
                                appState.translation.resources.en.translation[item] = e.target.value;
                                dispatch({ type: UPDATE_APP, configuration: appState });
                            }}></TextField>
                    </Grid>
                </Grid>
            );
        })
        return list;
    }

    return (
        <MainCard>
            <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                <Grid item xs={12}>
                    <Typography variant="h2">Localization</Typography>
                    <Typography variant="body">Translate default text from the template</Typography>
                    <Paper variant="outlined"  sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            {renderItems()}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default TemplatePage;
