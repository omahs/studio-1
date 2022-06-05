import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const Logo = () => {
    const appConfiguration = useSelector((state) => state.app);
    return (
        <Grid container>
            <img src={appConfiguration.logo} alt={appConfiguration.name} style={{ maxHeight: 40 }} />
        </Grid>
    );
};

export default Logo;
