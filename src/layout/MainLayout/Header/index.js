import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import LocalizationSection from './LocalizationSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import logoApp from 'assets/images/logo/dark-full.svg';
import useAppConfiguration from 'hooks/useAppConfiguration';
import AppSection from 'common/Logo';
import { useMoralis } from 'react-moralis';
import { ADD_ITEM_COMMENT, SNACKBAR_OPEN, CLEAR_APP } from 'store/actions';
// assets
import { IconMenu2 } from '@tabler/icons';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import Project from 'react-dappify/model/Project';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const appConfiguration = useSelector((state) => state.app);
    const { Moralis, user, isAuthenticated, logout, authenticate } = useMoralis();
    const [openDelete, setOpenDelete] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate('/', { replace: true });
    //     }
    // }, [isAuthenticated]);

    const publishChanges = async () => {
        try {
            await Project.publishChanges(appConfiguration, user);
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Project updated',
                variant: 'alert',
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                alertSeverity: 'success'
            });
        } catch (e) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: e.message,
                variant: 'alert',
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                alertSeverity: 'error'
            });
        }
    };

    const renderAddress = () => {
        const address = user.get('ethAddress');
        return `${address.substring(0, 4)}...${address.substring(address.length - 8, address.length)}`;
    };

    const authUser = () => {
        authenticate();
    };

    const cleanupState = () => {
        console.log('dispatching');
        dispatch({ type: CLEAR_APP });
    };

    const loginButton = isAuthenticated ? (
        <Button
            disableElevation
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
                logout();
                cleanupState();
            }}
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
            onClick={authUser}
            startIcon={<AccountBalanceWalletTwoToneIcon />}
        >
            Connect Wallet
        </Button>
    );

    const dismiss = () => {
        setOpenDelete(false);
    };

    const deleteProject = async () => {
        try {
            await Project.destroy(appConfiguration, user);
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Project updated',
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                alertSeverity: 'success'
            });
            cleanupState();
            navigate('/projects', { replace: true });
        } catch (e) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: e.message,
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                alertSeverity: 'error'
            });
        }
    };

    const confirmDialog = (
        <Dialog open={openDelete} onClose={dismiss} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Delete current project?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    If you delete this project the frontend and backend will no longer be available for users. Make sure to backup your
                    information about smart contract address and ABI. Do you wish to continue?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={dismiss}>Cancel</Button>
                <Button onClick={deleteProject} autoFocus>
                    Delete Forever
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                {confirmDialog}
                {/* <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <img src={logoApp} alt="Dappify" width="48" />
                </Box> */}
                {appConfiguration.name && <AppSection />}
                {/* <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                            color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                    </ButtonBase> */}
            </Box>
            <Button color="secondary" variant="outlined" size="large" sx={{ mx: 1 }} href="/projects">
                My projects
            </Button>
            <Button color="secondary" variant="outlined" size="large" sx={{ mx: 1 }} onClick={() => setOpenDelete(true)}>
                Delete this Project
            </Button>
            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* live customization & localization */}
            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <LocalizationSection />
                </Box> */}
            <Button color="secondary" variant="outlined" size="large" sx={{ mx: 1 }} onClick={publishChanges}>
                Publish Changes
            </Button>
            <Button
                color="secondary"
                variant="outlined"
                size="large"
                sx={{ mx: 1 }}
                href={`https://${appConfiguration.subdomain}.dappify.us/`}
                target="_blank"
            >
                View Site
            </Button>
            {loginButton}
            {/* notification & profile 
            <NotificationSection />
            <ProfileSection /> */}

            {/* mobile header */}
            {/* <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box> */}
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
