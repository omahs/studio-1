import { useState } from 'react';
import { Typography, Grid, Paper, TextField, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Loader from 'ui-component/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { BlockPicker } from 'react-color';
import { gridSpacing } from 'store/constant';
import { useMoralis } from 'react-moralis';
import { setField, setColor } from 'utils/config';
import { UPDATE_APP } from 'store/actions';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

const BrandPage = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const [isLoading, setLoading] = useState();
    // const [background, setBackground] = useState(appState.landingPage.background);
    const [buttonRadius, setButtonRadius] = useState(appState.theme.components.MuiButton.styleOverrides.root.borderRadius);
    const [shapeRadius, setShapeRadius] = useState(appState.theme.shape.borderRadius);
    const { Moralis } = useMoralis();

    const uploadFile = async (e, field) => {
        const upload = await uploadIpfs(e);
        setField(dispatch, appState, field, upload);
    };

    const setMode = (mode) => {
        appState.theme.palette.mode = mode;
        dispatch({ type: UPDATE_APP, configuration: appState });
    }

    const setPrimaryColor = (color) => {
        appState.theme.palette.primary.main = color;
        dispatch({ type: UPDATE_APP, configuration: appState });
    }

    const setSecondaryColor = (color) => {
        appState.theme.palette.secondary.main = color;
        dispatch({ type: UPDATE_APP, configuration: appState });
    }

    const uploadIpfs = async(e) => {
        setLoading(true);
        const data = e.target.files[0];
        const file = new Moralis.File(data.name, data);
        const upload = await file.saveIPFS();
        setLoading(false);
        return upload.ipfs();
    }

    // const uploadBackground = async (e) => {
    //     const upload = await uploadIpfs(e);
    //     appState.landingPage.background = upload;
    //     console.log(appState.landingPage.background);
    //     setBackground(appState.landingPage.background);
    //     dispatch({ type: UPDATE_APP, configuration: appState });
    // }

    // const removeBackground = () => {
    //     appState.landingPage.background = "";
    //     console.log(appState.landingPage.background);
    //     setBackground(appState.landingPage.background);
    //     dispatch({ type: UPDATE_APP, configuration: appState });
    // }

    const configureShapeRadius = (e, value) => {
        appState.theme.shape.borderRadius = value;
        setShapeRadius(value);
        console.log(value);
        dispatch({ type: UPDATE_APP, configuration: appState });
    }

    const configureButtonRadius = (e, value) => {
        appState.theme.components.MuiButton.styleOverrides.root.borderRadius = value;
        console.log(value);
        setButtonRadius(value);
        dispatch({ type: UPDATE_APP, configuration: appState });
    }

    return (
        <MainCard>
            {isLoading && <Loader />}
            <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                <Grid item xs={12} justifyContent="center">
                    <Typography variant="h2">Color Palette</Typography>
                    <Typography variant="body">Colors displayed as part of the theme</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3, textAlign: 'center' }}
                            alignItems="center"
                            justifyContent="center">
                            <Grid item xs={4} xl={4} justifyContent="center">
                                <Typography variant="h3" sx={{ mb: 3}}>Theme</Typography>
                                <Grid container direction="row" spacing={1}>
                                    <Grid item xs={12}><Button fullWidth variant={appState.theme.palette.mode === 'light' ? 'contained' : 'outlined'} onClick={() => setMode('light')}>Light</Button></Grid>
                                    <Grid item xs={12}><Button fullWidth variant={appState.theme.palette.mode === 'dark' ? 'contained' : 'outlined'} onClick={() => setMode('dark')}>Dark</Button></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4} xl={4} justifyContent="center">
                                <Typography variant="h3" sx={{ mb: 3 }}>Primary</Typography>
                                <BlockPicker
                                    color={appState.theme.palette.primary.main}
                                    onChangeComplete={(color) => setPrimaryColor(color.hex)}
                                />
                            </Grid>
                            <Grid item xs={4} xl={4} justifyContent="center">
                                <Typography variant="h3" sx={{ mb: 3 }}>Secondary</Typography>
                                <BlockPicker
                                    color={appState.theme.palette.secondary.main}
                                    onChangeComplete={(color) => setSecondaryColor(color.hex)}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2">Style</Typography>
                    <Typography variant="body">Look & Feel</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Button disabled variant="contained" sx={{minWidth: '200px', borderRadius:`${buttonRadius}px`}}>Button Radius</Button>
                            <CropSquareIcon />
                            <Slider min={0} max={25} aria-label="Volume" value={buttonRadius} onChange={configureButtonRadius} />
                            <CircleOutlinedIcon />
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Button disabled variant="contained" sx={{minWidth: '200px', borderRadius:`${shapeRadius}px`}}>Card Radius</Button>
                            <CropSquareIcon />
                            <Slider min={0} max={25} aria-label="Volume" value={shapeRadius} onChange={configureShapeRadius} />
                            <CircleOutlinedIcon />
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2">App Logo</Typography>
                    <Typography variant="body">Displayed on the top left corner and the footer</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={12} sx={{ minHeight: 225, p: 3, textAlign: 'center'}}>
                                <img src={appState.logo} alt="Logo" style={{ maxWidth: '260px' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="outlined" fullWidth component="label">
                                    Upload File
                                    <input accept="image/*" type="file" hidden onChange={(e) => uploadFile(e, 'logo')} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2">App Icon</Typography>
                    <Typography variant="body">Displayed as html metadata</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={12} sx={{ minHeight: 225, p: 3, textAlign: 'center'}}>
                                <img src={appState.icon} alt="Icon" style={{ maxWidth: '260px' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="outlined" fullWidth component="label">
                                    Upload File
                                    <input accept="image/*" type="file" hidden onChange={(e) => uploadFile(e, 'icon')} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                {/*<Grid item xs={12}>
                    <Typography variant="h2">Landing Page Background</Typography>
                    <Typography variant="body">Displayed as Background</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={12} sx={{ minHeight: 225, p: 3, textAlign: 'center'}}>
                                { !background &&
                                    (<Typography variant="h1" sx={{ lineHeight: "150px"}}>No Image</Typography>)}
                                { background &&
                                    (<img src={background} alt="Background" style={{ maxWidth: '260px' }} />)}
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="outlined" fullWidth component="label">
                                    Upload File
                                    <input accept="image/*" type="file" hidden onChange={(e) => uploadBackground(e)} />
                                </Button>
                                <Button variant="outlined" fullWidth component="label" sx={{ my: 1 }}>
                                    Remove Background
                                    <input accept="image/*" type="file" hidden onChange={(e) => removeBackground()} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                                </Grid> */}
                {/*<Grid item xs={12}>
                    <Typography variant="h2">Landing Page Title & Subtitle</Typography>
                    <Typography variant="body">These texts are shown in the landing page for those templates that display them.</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-name"
                                    label="Title"
                                    value={appState.title}
                                    onChange={(e) => setField(dispatch, appState, 'title', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-name"
                                    label="Subtitle"
                                    value={appState.subtitle}
                                    onChange={(e) => setField(dispatch, appState, 'subtitle', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                                </Grid>*/}
                
            </Grid>
        </MainCard>
    );
};

export default BrandPage;
