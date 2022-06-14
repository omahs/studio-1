import { useContext, useState } from 'react';
import { Alert, Box, Tab, Tooltip, TextField, InputAdornment, Grid,  CircularProgress, Typography, Paper, Button, DialogActions, Dialog, DialogContentText, DialogTitle, DialogContent } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import { DappifyContext, constants, Project, utils } from 'react-dappify';
import { UPDATE_APP } from 'store/actions';
import { SNACKBAR_OPEN } from 'store/actions';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const { formatAddress } = utils;
const { NETWORKS, LOGO, MAINNETS, CONTRACTS } = constants;

const BlockchainPage = () => {
    const { user } = useContext(DappifyContext);


    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const [beneficiaryFee, setBeneficiaryFee] = useState(0);
    const [beneficiary] = useState(user.get('ethAddress'));
    const [isConfirmationOpen, setConfirmationOpen] = useState();
    const [isRatesOpen, setRatesOpen] = useState();
    const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[appState.chainId] || {});
    const [processing, setProcessign] = useState();


    const setVersion = async () => {
        try {
            setProcessign(true);
            appState.template = {
                chainId: selectedNetwork.chainId,
                contract: CONTRACTS[appState.type][selectedNetwork.chainId]
            };
            appState.operator = beneficiary;
            dispatch({ type: UPDATE_APP, configuration: appState });
            await Project.publishChanges(appState, user);
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
        } finally {
            setProcessign(false);
            setConfirmationOpen(false);
        }
    }

    const renderDappifyOptions = () => {
        const list = [];
        Object.keys(CONTRACTS.marketplace).forEach((chainId, index) => {
            const targetNetwork = NETWORKS[chainId];
            const contractAddress = CONTRACTS.marketplace[chainId];
            const isTestnet = !MAINNETS.includes(chainId);
            const isCurrentChain = chainId === appState.template.chainId;
            const tooltip = isCurrentChain ? `Current beneficiary ${appState.operator}` : 'Not active chain';
            if (contractAddress)
                list.push(
                    <Grid item xs={12} sm={6} md={3} lg={2} textAlign="center" key={chainId}>
                        <Tooltip title={tooltip}>
                            <Paper variant="outlined" sx={{ p: 3 }} className={`paper-blockchain ${isCurrentChain ? 'paper-blockchain-selected': ''}`} onClick={() => {
                                if (isTestnet) {
                                    setSelectedNetwork(targetNetwork);
                                    setConfirmationOpen(true);
                                }
                            }}>
                                <img src={LOGO[targetNetwork.nativeCurrency.symbol]} alt="Ava" height="50px"/>
                                <Typography variant="h6" sx={{ my: 2 }}>{targetNetwork.chainName}</Typography>

                            </Paper>
                        </Tooltip>
                        {isCurrentChain && <Button sx={{ borderRadius: 0 }} fullWidth onClick={async () => {
                            setProcessign(true);
                            // await getContractFee();
                            setProcessign(false);
                            setRatesOpen(true);
                        }}>
                            {!processing && "Manage Rates"}
                            {processing && <CircularProgress color="inherit" size={20} />}
                        </Button>}
                    </Grid>
                );
        });
        return list;
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const ratesDialog = (
        <Dialog
            open={isRatesOpen}
            onClose={() => {}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Rates {selectedNetwork.chainName}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Set up your revenue per transaction within the dApp. This revenue gets paid automatically when users transact through your platform.
                <Grid container direction="row" spacing={1}>
                    <Grid item sx={{ mt: 2, width: 140 }} justifyContent="center">
                        <TextField
                        fullWidth
                        label="Rate (0%-25%)"
                        id="outlined-start-adornment"
                        value={beneficiaryFee}
                        type="number"
                        InputProps={{
                            style: {fontSize: '20px'},
                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            inputProps: { min: 0, max: 25, step:".01" }
                        }}
                        InputLabelProps={{style: {fontSize: 20}}}
                        onChange={(e)=> {
                            let value = parseFloat(e.target.value);
                            console.log(value);
                            if (value > 25) value = 25;
                            if (value < 0) value = 0;
                            setBeneficiaryFee(value);
                        }}
                    />
                    </Grid>
                    <Grid item sx={{ mt: 2, flex: 1 }} justifyContent="center">
                        <TextField
                        fullWidth
                        label="Beneficiary"
                        id="outlined-start-adornment"
                        value={formatAddress(beneficiary)}
                        disabled
                        InputProps={{
                            style: {fontSize: '20px'},
                            startAdornment: <InputAdornment position="start">Eth</InputAdornment>,
                        }}
                        InputLabelProps={{style: {fontSize: 20}}}
                        />
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" sx={{ mt: 1 }} spacing={1}>
                    <Grid item xs={6}>
                        <Button variant="outlined" fullWidth href={
                            selectedNetwork.blockExplorerUrls && `${selectedNetwork?.blockExplorerUrls[0]}/address/${appState.template.contract}`
                        } target="_blank">Explore Smart Contract</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button  variant="outlined" fullWidth  href={
                            selectedNetwork.blockExplorerUrls && `${selectedNetwork?.blockExplorerUrls[0]}/address/${beneficiary}`
                        } target="_blank">Explore Beneficiary</Button>
                    </Grid>
                </Grid>
                <Alert severity="info" sx={{ mt: 1 }}>Gas fees apply</Alert>
                <Alert severity="error" sx={{ mt: 1 }}>This action will set the rate per transaction for all activities within the dApp effective immediately. Existing offerings will be paid to the beneficiary address configured at the moment of the placing</Alert>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setRatesOpen(false)} color="error">Cancel</Button>
            <Button variant="contained" color="error"  autoFocus>
                {!processing && "Save in blockchain"}
                {processing && <CircularProgress color="inherit" size={20} />}
            </Button>
            </DialogActions>
        </Dialog>
    );

    const confirmDialog = (
        <Dialog
            open={isConfirmationOpen}
            onClose={() => {}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Switch to {selectedNetwork.chainName}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                This action will set you dApp network to chainId: {selectedNetwork.chainName}<br />
                Do you want to continue?
                {/*<Grid item sx={{ mt: 2}} xs={12} justifyContent="center">
                    <TextField
                    fullWidth
                    label="I want to receive a % of all transactions in my dApp"
                    id="outlined-start-adornment"
                    defaultValue={beneficiaryFee}
                    InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
                    onChange={(e)=> setBeneficiaryFee(e.target.value)}
                />
                </Grid>
                <Grid item sx={{ mt: 2}} xs={12} justifyContent="center">
                    <TextField
                    fullWidth
                    label="Beneficiary address is the signer of the following transaction"
                    id="outlined-start-adornment"
                    value={beneficiary}
                    disabled
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Eth</InputAdornment>,
                    }}
                    onChange={(e)=> setBeneficiary(e.target.value)}
                    />
                </Grid>
                */}
                <Alert severity="info" sx={{ mt: 1 }}>Your users will be switched to the new network!</Alert>
                {/* hasBeneficiaryFeeChanged() && (<Alert severity="warning" variant="filled" sx={{ mt: 1 }}>Gas fees apply for changing revenue %</Alert>) */}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setConfirmationOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setVersion()} autoFocus>
                {!processing && "Save"}
                {processing && <CircularProgress color="inherit" size={20} />}
            </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <MainCard>


            <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Shared Contract" value="1" />
                    <Tab label="Custom Contract" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1">
                <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                    <Grid item xs={12}>
                        <Typography variant="h2">Shared Contract (Recommended)</Typography>
                        <Typography variant="body">Share contracts with other Dappify users but keep your segmentation with offchain indexing. This solution is FREE.</Typography>
                    </Grid>
                    <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ mt: 2 }} className="paper-in">
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sx={{ mb: 2 }}>
                                        <Alert severity="info">Dappify will get 2.5% of the transactions within the dApp. Additionally you can specify your revenue percentage per transaction when selecting a network (gas fees apply).</Alert>
                                    </Grid>
                                    {renderDappifyOptions()}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value="2">
                <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                    <Grid item xs={12}>
                        <Typography variant="h2">Custom Contract (Coming soon...)</Typography>
                        <Typography variant="body">Deploy your own custom smart contract where all traffic will be from your own marketplace. Gas fees apply. Gas fees apply</Typography>
                    </Grid>
                </Grid>
            </TabPanel>
            </TabContext>
        </Box>
            {confirmDialog}
            {ratesDialog}
        </MainCard>
    );
};

export default BlockchainPage;
