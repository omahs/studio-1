import { useContext, useEffect, useState } from 'react';
import { Alert, TextField, InputAdornment, Grid,  Typography, Paper, Button, DialogActions, Dialog, DialogContentText, DialogTitle, DialogContent } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import constants from 'react-dappify/constants';
import { ethers } from 'ethers';
import MarketplaceBytecode from 'react-dappify/contracts/artefacts/contracts.json';
import { DappifyContext } from 'react-dappify';
import { UPDATE_APP } from 'store/actions';

const { NETWORKS, LOGO, MAINNETS } = constants;

const BlockchainPage = () => {
    const { user, switchToChain } = useContext(DappifyContext);
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const [network, setNetwork] = useState(appState.template.marketplace.main.chainId);
    const [testNetwork, setTestNetwork] = useState(appState.template.marketplace.test.chainId);
    const [beneficiaryFee, setBeneficiaryFee] = useState(2.5);
    const [beneficiary, setBeneficiary] = useState();
    const [dappify] = useState("0x6a10C54110336937f184bf9A88bFD5998c8E99D4");
    const [dappifyFee] = useState(2.5);
    const [isConfirmationOpen, setConfirmationOpen] = useState();
    const [selectedNetwork, setSelectedNetwork] = useState({});

    useEffect(() => {
        setBeneficiary(user.get('ethAddress'));
    },[]);

    const launch = async() => {
        const currentProvider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = MarketplaceBytecode.output.contracts['contracts/Marketplace.sol'].Marketplace;
        const abi = contract.abi;
        const bytecode = contract.evm.bytecode;
        const market = new ethers.ContractFactory(abi, bytecode, currentProvider.getSigner());
        const marketplace = await market.deploy(beneficiary, beneficiaryFee*100, dappify, dappifyFee*100);
        const deployment = await marketplace.deployed();
        return deployment.address;
    }
    const deploy = async() => {
        const isMainnet = MAINNETS.includes(selectedNetwork.chainId);
        try {
            const currentProvider = new ethers.providers.Web3Provider(window.ethereum);
            await switchToChain(selectedNetwork, currentProvider.provider);
            const address = await launch();
            if (isMainnet) {
                appState.template.marketplace.main = {
                    chainId: selectedNetwork.chainId,
                    contract: address
                }
            } else {
                appState.template.marketplace.test = {
                    chainId: selectedNetwork.chainId,
                    contract: address
                }
            }
            dispatch({ type: UPDATE_APP, configuration: appState });
        } catch (e) {
            console.log(e);
        }
    }

    const renderSupportedMainNetsChains = () => {
        const list = [];
        Object.keys(NETWORKS).forEach((chainId, index) => {
            const targetNetwork = NETWORKS[chainId];
            if (MAINNETS.includes(chainId)) {
                list.push(
                    <Grid item xs={12} sm={6} lg={4} xl={3} textAlign="center" key={chainId}>
                        <Paper disabled variant="outlined" elevation="20" sx={{ p: 3, minHeight: 160, background:'lightgray' }} >
                            <img src={LOGO[targetNetwork.nativeCurrency.symbol]} alt="Ava" height="50px"/>
                            <Typography variant="h4" sx={{ mt: 2 }}>{targetNetwork.chainName}</Typography>
                            <Typography variant="h5" sx={{opacity:0.75}}>Unavailable during beta</Typography>
                        </Paper>
                    </Grid>
                );
            }
        });
        return list;
    }

    const renderSupportedTestnetChains = () => {
        const list = [];
        Object.keys(NETWORKS).forEach((chainId, index) => {
            const targetNetwork = NETWORKS[chainId];
            if (!MAINNETS.includes(chainId)) {
                list.push(
                    <Grid item xs={12} sm={6} lg={4} xl={3} textAlign="center" key={chainId}>
                        <Paper variant="outlined" elevation="20" sx={{ p: 3, minHeight: 160 }} className={`paper-blockchain ${chainId === testNetwork ? 'paper-blockchain-selected': ''}`} onClick={() => {
                            setSelectedNetwork(targetNetwork);
                            setConfirmationOpen(true);
                            // deployTestNetwork(chainId);
                        }}>
                            <img src={LOGO[targetNetwork.nativeCurrency.symbol]} alt="Ava" height="50px"/>
                            <Typography variant="h4" sx={{ mt: 2 }}>{targetNetwork.chainName}</Typography>
                        </Paper>
                    </Grid>
                );
            }
        });
        return list;
    }

    return (
        <MainCard>
            <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                <Grid item xs={12}>
                    <Typography variant="h2">Select your mainnet</Typography>
                    <Typography variant="body">Your production network where <a href={`https://${appState.subdomain}.dappify.us`}>{`https://${appState.subdomain}.dappify.us`}</a> will be deployed to</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ mt: 2 }} className="paper-in">
                        <Grid container>
                            {renderSupportedMainNetsChains()}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                <Grid item xs={12}>
                    <Typography variant="h2">Select your testnet</Typography>
                    <Typography variant="body">Your testing network where <a href={`https://test.${appState.subdomain}.dappify.us`}>{`https://test.${appState.subdomain}.dappify.us`}</a> will be deployed to</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ mt: 2 }} className="paper-in">
                        <Grid container>
                            {renderSupportedTestnetChains()}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                open={isConfirmationOpen}
                onClose={() => {}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Deploy your smart contract to {selectedNetwork.chainName}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This action will deploy the Marketplace smart contract to the live Network 
                    {selectedNetwork.chainName} {selectedNetwork.chainId}
                    Do you want to continue?
                    <Grid item sx={{ mt: 2}} xs={12} justifyContent="center">
                        <TextField
                        fullWidth
                        label="Marketplace fee %"
                        id="outlined-start-adornment"
                        value={beneficiaryFee}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">%</InputAdornment>,
                        }}
                        onChange={(e)=> setBeneficiaryFee(e.target.value)}
                      />
                    </Grid>
                    <Grid item sx={{ mt: 2}} xs={12} justifyContent="center">
                      <TextField
                        fullWidth
                        label="Beneficiary"
                        id="outlined-start-adornment"
                        value={beneficiary}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Eth</InputAdornment>,
                        }}
                        onChange={(e)=> setBeneficiary(e.target.value)}
                        />
                    </Grid>
                    <Grid item sx={{ mt: 2}} xs={12} justifyContent="center">
                        <TextField
                        fullWidth
                        label="Dappify fee %"
                        id="outlined-start-adornment"
                        value={dappifyFee}
                        disabled
                        InputProps={{
                          startAdornment: <InputAdornment position="start">%</InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item sx={{ my: 2}} xs={12} justifyContent="center">
                      <TextField
                        fullWidth
                        label="Beneficiary"
                        id="outlined-start-adornment"
                        value={dappify}
                        disabled
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Eth</InputAdornment>,
                        }}
                        />
                    </Grid>
                    <Alert severity="info">This action will override any existing deployment!</Alert>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setConfirmationOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={() => deploy()} autoFocus>
                    Deploy
                </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
};

export default BlockchainPage;
