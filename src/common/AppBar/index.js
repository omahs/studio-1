import { cloneElement, useState, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    AppBar as MuiAppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    Link,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger
} from '@mui/material';

// project imports
import { DappifyContext } from 'react-dappify';

// assets
import MenuIcon from '@mui/icons-material/Menu';
import AppsIcon from '@mui/icons-material/Apps';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import DirectionsIcon from '@mui/icons-material/Directions';
import Logo from 'common/Logo';
import WalletsDialog from 'common/WalletsDialog';

function ElevationScroll({ children, window }) {
    const theme = useTheme();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
        target: window
    });
    const darkBorder = 'transparent';

    return cloneElement(children, {
        elevation: trigger ? 2 : 0,
        style: {
            backgroundColor: trigger ? theme.palette.background.default : 'transparent',
            borderBottom: trigger ? 'none' : '1px solid',
            borderColor: trigger ? '' : darkBorder,
            color: trigger ? theme.palette.text.dark : theme.palette.text.light
        }
    });
}

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
    const location = useLocation();
    const [drawerToggle, setDrawerToggle] = useState(false);
    const { isAuthenticated, user, logout } = useContext(DappifyContext);

    const [showWalletDialog, setShowWalletDialog] = useState();

    /** Method called on multiple components with different event types */
    const drawerToggler = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerToggle(open);
    };

    const myDappsButton = (location.pathname === '/' || location.pathname === '/templates') && (
            <Button disableElevation component={RouterLink} variant="contained" to="/projects" size="small" color="secondary">
                Sign in to the Console
            </Button>
    );

    const renderAddress = () => {
        const address = user.get('ethAddress');
        return `${address.substring(0, 4)}...${address.substring(address.length - 8, address.length)}`;
    };

    const loginButton = isAuthenticated ? (
        <Button
            disableElevation
            variant="contained"
            color="primary"
            size="large"
            onClick={logout}
            startIcon={<AccountBalanceWalletTwoToneIcon />}
            endIcon={<LogoutIcon />}
        >
            {renderAddress()}
        </Button>
    ) : (
        <Button
            disableElevation
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setShowWalletDialog(true)}
            startIcon={<AccountBalanceWalletTwoToneIcon />}
        >
            Connect Wallet
        </Button>
    );

    const roadmap = process.env.REACT_APP_ROADMAP_URL;
    const micropaper = process.env.REACT_APP_MICROPAPER_URL;
    const changelog = process.env.REACT_APP_CHANGELOG_URL;

    return (
        <ElevationScroll {...others}>
            <MuiAppBar>
                <Container>
                    <Toolbar>
                        <WalletsDialog isOpen={showWalletDialog} onClose={() => setShowWalletDialog(false)} />
                        <Typography component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                            <Button color="inherit" component={RouterLink} to="/">
                                <Logo />
                            </Button>
                        </Typography>
                        <Stack direction="row" sx={{ display: { xs: 'none', md: 'block' } }} spacing={2}>
                            <Button color="inherit" component={RouterLink} to="/templates" size="large">
                                Templates
                            </Button>
                            <Button color="inherit" href={roadmap} size="large" target="_blank">
                                Roadmap
                            </Button>
                            <Button color="inherit" href={micropaper} size="large" target="_blank">
                                Micropaper
                            </Button>
                            <Button color="inherit" href={changelog} size="large" target="_blank">
                                Changelog
                            </Button>
                            {myDappsButton}
                            {!(location.pathname === '/' || location.pathname === '/templates') && loginButton}
                        </Stack>
                        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                            <IconButton color="inherit" onClick={drawerToggler(true)} size="large">
                                <MenuIcon />
                            </IconButton>
                            <Drawer anchor="top" open={drawerToggle} onClose={drawerToggler(false)}>
                                <Box
                                    sx={{
                                        width: 'auto'
                                    }}
                                    role="presentation"
                                    onClick={drawerToggler(false)}
                                    onKeyDown={drawerToggler(false)}
                                >
                                    <List>
                                        <Link style={{ textDecoration: 'none' }} href={roadmap}>
                                            <ListItemButton component="a">
                                                <ListItemIcon>
                                                    <DirectionsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Roadmap" />
                                            </ListItemButton>
                                        </Link>
                                        <Link style={{ textDecoration: 'none' }} href={micropaper}>
                                            <ListItemButton component="a">
                                                <ListItemIcon>
                                                    <DirectionsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Micropaper" />
                                            </ListItemButton>
                                        </Link>
                                        <Link style={{ textDecoration: 'none' }} href={micropaper}>
                                            <ListItemButton component="a">
                                                <ListItemIcon>
                                                    <DirectionsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Changelog" />
                                            </ListItemButton>
                                        </Link>
                                        <Link style={{ textDecoration: 'none' }} component={RouterLink} to="/projects">
                                            <ListItemButton component="a">
                                                <ListItemIcon>
                                                    <AppsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="My dApps" />
                                            </ListItemButton>
                                        </Link>
                                    </List>
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </MuiAppBar>
        </ElevationScroll>
    );
};

export default AppBar;
