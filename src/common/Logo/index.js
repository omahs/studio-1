import { Grid } from '@mui/material';
import appLogo from 'assets/images/logo/dark-full.svg';
import { useSelector, useDispatch } from 'react-redux';

const Logo = () => {
    const appConfiguration = useSelector((state) => state.app);
    return (
        <Grid container>
            <img src={appConfiguration.logo} alt={appConfiguration.name} width="100" />
        </Grid>
    );
};

export default Logo;
