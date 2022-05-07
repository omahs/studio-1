import { Grid, Typography, LinearProgress } from '@mui/material';

import { withStyles } from '@mui/styles';
import useAppConfiguration from 'hooks/useAppConfiguration';

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

const Progress = () => {
    const { appConfiguration } = useAppConfiguration();

    const completedSteps = () => Object.values(appConfiguration).filter((item) => item).length;

    const totalSteps = () => Object.keys(appConfiguration).length;

    return (
        <Grid item xs={12} sx={{ width: 150 }}>
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
        </Grid>
    );
};

export default Progress;
