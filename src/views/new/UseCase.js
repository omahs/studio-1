/* eslint-disable react/no-unescaped-entities */
import { useTheme } from '@mui/material/styles';
import { UPDATE_APP } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Typography, Paper } from '@mui/material';
import UserCountCard from 'ui-component/cards/UserCountCard';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import LocalGroceryStoreTwoToneIcon from '@mui/icons-material/LocalGroceryStoreTwoTone';
import LocalActivityTwoToneIcon from '@mui/icons-material/LocalActivityTwoTone';

const UseCase = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const theme = useTheme();

    const handleCategorySelection = (category) => {
        appState.step += 1;
        appState.type = category;
        dispatch({ type: UPDATE_APP, configuration: appState });
    };

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ px: '12.5%' }} spacing={2}>
            <Grid item xs={12}>
                <Typography className="landing-title-white">
                    What best describes <i>{appState.name}</i> use case?
                </Typography>
            </Grid>
            <Grid item xs={6}  xl={4} key="marketplace">
                <UserCountCard
                    primary="Create and sell your own unique NFTs"
                    secondary="NFT Marketplace"
                    iconPrimary={LocalGroceryStoreTwoToneIcon}
                    color={theme.palette.secondary.main}
                    onClick={() => handleCategorySelection('NFT_MARKETPLACE')}
                />
            </Grid>
        </Grid>
    );
};

export default UseCase;
