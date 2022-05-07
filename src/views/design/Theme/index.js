import { Grid, Typography, LinearProgress, Box, CardActions, Button } from '@mui/material';
import ElevationScroll from 'views/forms/layouts/ElevationScroll';
import { withStyles } from '@mui/styles';
import useAppConfiguration from 'hooks/useAppConfiguration';

import { lazy, useState, useEffect } from 'react';
import Loadable from 'ui-component/Loadable';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Accordion from 'ui-component/extended/Accordion';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const UtilsColorPalette = Loadable(lazy(() => import('views/utilities/ColorPalette')));

// style constant
const BorderLinearProgress = withStyles(() => ({
    root: {
        height: 10,
        borderRadius: 5
    },
    bar: {
        borderRadius: 5
    }
}))(LinearProgress);

// =============================|| UI ACCORDION ||============================= //

const svg =
    '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">' +
    '<path fill="#156BB1" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>' +
    '<circle fill="#FFFFFF" cx="15" cy="10.677" r="3.291"/></svg>';

const mysvg = new Image();
mysvg.src = `data:image/svg+xml,${escape(svg)}`;

const Progress = () => {
    const { appConfiguration } = useAppConfiguration();
    const [svgIcon, setSvgIcon] = useState();
    const [bgColor, setBgColor] = useState();
    const completedSteps = () => Object.values(appConfiguration).filter((item) => item).length;

    const totalSteps = () => Object.keys(appConfiguration).length;

    return (
        <MainCard title="Design Theme" secondary={<SecondaryAction link="https://next.material-ui.com/components/accordion/" />}>
            <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                {/* <Grid item xs={12} lg={6}>
                    <SubCard title="My dApp Design & Content" secondary={<Progress />}>
                        <Accordion expandIcon={<ArrowDropDownIcon />} data={customContentData(appConfiguration, dispatch)} />
                    </SubCard>
                </Grid> */}
                {/* <Grid item xs={12} sx={{ width: 150 }}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item>
                            <Typography variant="caption">
                                {completedSteps()}/{totalSteps()}
                            </Typography>
                        </Grid>
                        <Grid item xs sx={{ color: 'green' }}>
                            <BorderLinearProgress color="success" variant="determinate" value={10} />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">{Math.round((completedSteps() / totalSteps()) * 100)}%</Typography>
                        </Grid>
                    </Grid>
            </Grid> */}
                <Grid item xs={12} sx={{ position: 'fixed', background: 'white' }}>
                    {/* <UtilsTablerIcons /> */}
                    <Box
                        sx={{
                            textAlign: 'center',
                            height: 64,
                            width: 64,
                            border: '1px solid #ccc',
                            borderRadius: 5,
                            backgroundColor: bgColor,
                            cursor: 'pointer'
                        }}
                        elevation={1}
                        onClick={async () => {
                            const rawInput = await navigator.clipboard.readText();
                            console.log(rawInput);
                            if (CSS.supports('color', rawInput)) {
                                setBgColor(rawInput);
                            } else {
                                setSvgIcon(rawInput);
                            }
                        }}
                    >
                        <img src={`data:image/svg+xml,${escape(svgIcon)}`} alt="lol" height={64} />
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    onClick={() => {
                        console.log('copy??');
                    }}
                >
                    <UtilsColorPalette />
                </Grid>
                <Grid item xs={12}>
                    <UtilsTablerIcons />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Progress;
