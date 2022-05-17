import { useContext, useEffect, useState } from 'react';
import { Alert, Box, Tab, Chip, TextField, InputAdornment, Grid,  CircularProgress, Typography, Paper, Button, DialogActions, Dialog, DialogContentText, DialogTitle, DialogContent } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import constants from 'react-dappify/constants';
import { ethers } from 'ethers';
import MarketplaceBytecode from 'react-dappify/contracts/artifacts/contracts.json';
import { DappifyContext } from 'react-dappify';
import { formatAddress } from 'react-dappify/utils/format';
import { UPDATE_APP } from 'store/actions';
import { SNACKBAR_OPEN } from 'store/actions';
import Project from 'react-dappify/model/Project';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const { NETWORKS, LOGO, MAINNETS, FAUCETS, CONTRACTS } = constants;

const BlockchainPage = () => {
    const { user, switchToChain, configuration } = useContext(DappifyContext);
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const [beneficiaryFee, setBeneficiaryFee] = useState(0);
    const [beneficiary, setBeneficiary] = useState(appState.operator);
    const [dappify] = useState('0x6a10C54110336937f184bf9A88bFD5998c8E99D4');
    const [dappifyFee, setDappifyFee] = useState(2.5);
    const [isConfirmationOpen, setConfirmationOpen] = useState();
    const [selectedNetwork, setSelectedNetwork] = useState({});
    const [processing, setProcessign] = useState();

    useEffect(() => {
        const getContractFee = async (currentProvider) => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signerAddress = await provider.getSigner().getAddress();
            setBeneficiary(signerAddress);
            try {
                const contract = MarketplaceBytecode.output.contracts['contracts/ERC721MarketplaceV1.sol'].ERC721MarketplaceV1;
                const abi = contract.abi;
                const marketplaceContract = new ethers.Contract(appState.template.marketplace.main.contract, abi, currentProvider.getSigner());
                const operatorFee = await marketplaceContract.getRoyaltyFee(beneficiary);
                setBeneficiaryFee(operatorFee/100);
                const providerFee = await marketplaceContract.getRoyaltyFee(dappify);
                setDappifyFee(providerFee/100);
            } catch (e) {
                console.log(e);
            }
        };

        getContractFee();
    }, [selectedNetwork]);

    const launch = async() => {
        const currentProvider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = MarketplaceBytecode.output.contracts['contracts/ERC721MarketplaceV1.sol'].Marketplace;
        const abi = contract.abi;
        const bytecode = contract.evm.bytecode;
        const market = new ethers.ContractFactory(abi, bytecode, currentProvider.getSigner());
        const marketplace = await market.deploy();
        const deployment = await marketplace.deployed();
        return deployment.address;
    }
    const deploy = async() => {
        const isMainnet = MAINNETS.includes(selectedNetwork.chainId);
        try {
            setProcessign(true);
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

    const setContractFee = async() => {
        const currentProvider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = MarketplaceBytecode.output.contracts['contracts/ERC721MarketplaceV1.sol'].ERC721MarketplaceV1;
        const abi = contract.abi;
        const marketplaceContract = new ethers.Contract(CONTRACTS.ERC721MarketplaceV1[selectedNetwork.chainId], abi, currentProvider.getSigner());
        const targetFee = beneficiaryFee*100;
        const tx = await marketplaceContract.setRoyaltyFee(targetFee);
        return tx;
    }

    const setVersion = async () => {
        try {
            setProcessign(true);
            const currentProvider = new ethers.providers.Web3Provider(window.ethereum);
            await switchToChain(selectedNetwork, currentProvider.provider);
            await setContractFee();
            appState.template.marketplace.main = {
                chainId: selectedNetwork.chainId,
                contract: CONTRACTS.ERC721MarketplaceV1[selectedNetwork.chainId]
            };
            appState.template.marketplace.test = {
                chainId: selectedNetwork.chainId,
                contract: CONTRACTS.ERC721MarketplaceV1[selectedNetwork.chainId]
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

    const renderSupportedMainNetsChains = () => {
        const list = [];
        Object.keys(NETWORKS).forEach((chainId, index) => {
            const targetNetwork = NETWORKS[chainId];
            if (MAINNETS.includes(chainId)  && (!appState.template.marketplace.main.chainId || (appState.template.marketplace.main.chainId === chainId))) {
                const explorer = `${targetNetwork.blockExplorerUrls[0]}/address/${appState.template.marketplace.main.contract}`;
                list.push(
                    <Grid item xs={12} sm={6} lg={3} textAlign="center" key={chainId}>
                        <Paper variant="outlined" elevation="20" sx={{ p: 3, minHeight: 160 }} className={`paper-blockchain ${chainId === appState.template.marketplace.main.chainId ? 'paper-blockchain-selected': ''}`} onClick={() => {
                            setSelectedNetwork(targetNetwork);
                            setConfirmationOpen(true);
                        }}>
                            <img src={LOGO[targetNetwork.nativeCurrency.symbol]} alt="Ava" height="50px"/>
                            <Typography variant="h4" sx={{ mt: 2 }}>{targetNetwork.chainName}</Typography>
                            {chainId === appState.template.marketplace.main.chainId && (<Button fullWidth size="small" href={explorer} target="_blank">View in explorer {formatAddress(appState.template.marketplace.main.contract)}</Button>)}
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
            if (!MAINNETS.includes(chainId) && (!appState.template.marketplace.test.chainId || (appState.template.marketplace.test.chainId === chainId))) {
                const explorer = `${targetNetwork.blockExplorerUrls[0]}/address/${appState.template.marketplace.test.contract}`;
                list.push(
                    <Grid item xs={12} sm={6} lg={3} textAlign="center" key={chainId}>
                        <Paper variant="outlined" elevation="20" sx={{ p: 3, minHeight: 160 }} className={`paper-blockchain ${chainId === appState.template.marketplace.test.chainId ? 'paper-blockchain-selected': ''}`} onClick={() => {
                            setSelectedNetwork(targetNetwork);
                            setConfirmationOpen(true);
                        }}>
                            <img src={LOGO[targetNetwork.nativeCurrency.symbol]} alt="Ava" height="50px"/>
                            <Typography variant="h4" sx={{ mt: 2 }}>{targetNetwork.chainName}</Typography>
                            {chainId === appState.template.marketplace.test.chainId && (<Button fullWidth size="small" href={explorer} target="_blank">View in explorer {formatAddress(appState.template.marketplace.test.contract)}</Button>)}
                            {FAUCETS[chainId] && (<Button fullWidth size="small" href={FAUCETS[chainId]} target="_blank">Get funds</Button>)}
                        </Paper>
                    </Grid>
                );
            }
        });
        return list;
    }

    const renderDappifyOptions = () => {
        const list = [];
        Object.keys(CONTRACTS.ERC721MarketplaceV1).forEach((chainId, index) => {
            const targetNetwork = NETWORKS[chainId];
            const contractAddress = CONTRACTS.ERC721MarketplaceV1[chainId];
            const explorer = `${targetNetwork.blockExplorerUrls[0]}/address/${contractAddress}`;
            const isTestnet = !MAINNETS.includes(chainId);
            const isCurrentChain = chainId === appState.template.marketplace.main.chainId;
            list.push(
                <Grid item xs={12} sm={6} md={4} textAlign="center" key={chainId}>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, minHeight: 160 }} className={`paper-blockchain ${isCurrentChain ? 'paper-blockchain-selected': ''}`} onClick={() => {
                        if (isTestnet) {
                            setSelectedNetwork(targetNetwork);
                            setConfirmationOpen(true);
                        }
                    }}>
                        <img src={LOGO[targetNetwork.nativeCurrency.symbol]} alt="Ava" height="50px"/>
                        <Typography variant="h4" sx={{ my: 2 }}>Select {targetNetwork.chainName}</Typography>
                        {isTestnet && (<Chip color="secondary" variant="outlined" label="Testnet"></Chip>)}
                        {!isTestnet && (<Chip color="secondary" variant="outlined" label="Mainnet coming soon"></Chip>)}
                        <Grid item xs={12} sx={{ minHeight: 45, pt: 1 }}>
                            {isCurrentChain && <Typography fontWeight="bold">{`Dappify gets ${dappifyFee}%`}</Typography>}
                            {isCurrentChain && <Typography fontWeight="bold">{`You get ${beneficiaryFee}% at ${formatAddress(appState.operator)}`}</Typography>}
                        </Grid>
                    </Paper>
                    {!contractAddress && 
                        (<Grid item xs={12} sx={{ minHeight:35}}>
                            <Button variant="contained" disabled fullWidth size="small">TBD</Button>
                         </Grid>)
                    }
                    {contractAddress && (
                        <Grid container sx={{ minHeight: 35 }}>
                            <Grid item xs={FAUCETS[chainId] ? 8 : 12}>
                                <Button sx={{ borderRadius: 0 }} variant="contained" fullWidth size="small" href={explorer} target="_blank">View in explorer {formatAddress(CONTRACTS.ERC721MarketplaceV1[chainId])}</Button>
                            </Grid>
                            {FAUCETS[chainId] && (
                                <Grid item xs={4}>
                                    <Button sx={{ borderRadius: 0 }} fullWidth variant="contained" color="secondary" size="small" href={FAUCETS[chainId]} target="_blank">Get test funds</Button>
                                </Grid>
                            )}
                        </Grid>)
                    }
                </Grid>
            );
        });
        return list;
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

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
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
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

{/*

            <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                <Grid item xs={12}>
                    <Typography variant="h2">1. Lets start by launching on a testnet for FREE</Typography>
                    <Typography variant="body">Your testing network where <a href={`https://test.${appState.subdomain}.dappify.us`}>{`https://test.${appState.subdomain}.dappify.us`}</a> will be deployed to</Typography>
                    <Paper elevation={0} sx={{ mt: 2 }} className="paper-in">
                        <Grid container>
                            {renderSupportedTestnetChains()}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                <Grid item xs={12}>
                    <Typography variant="h2">2. Deploy your production ready version (Gas fees apply)</Typography>
                    <Typography variant="body">Your production network where <a href={`https://${appState.subdomain}.dappify.us`}>{`https://${appState.subdomain}.dappify.us`}</a> will be deployed to</Typography>
                    <Paper elevation={0} sx={{ mt: 2 }} className="paper-in">
                        <Grid container>
                            {renderSupportedMainNetsChains()}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

    */}
          {/*}  <Dialog
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
                    {!processing && "Deploy"}
                    {processing && <CircularProgress color="inherit" size={20} />}
                </Button>
                </DialogActions>
                    </Dialog> */}

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
                    <Grid item sx={{ mt: 2}} xs={12} justifyContent="center">
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
                    <Alert severity="info" sx={{ mt: 1 }}>This action will override any existing configuration!</Alert>
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

        </MainCard>
    );
};

export default BlockchainPage;
