import { FormGroup, FormControlLabel, Grid, Switch, TextField, Typography, Paper } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { BlockPicker } from 'react-color';
import { gridSpacing } from 'store/constant';
import avalancheProd from 'assets/images/avalanche_banner.png';
import ethereumProd from 'assets/images/ethereum_banner.jpeg';
import binanceProd from 'assets/images/binance_banner.png';
import polygonProd from 'assets/images/polygon_banner.jpeg';

import { setNetwork } from 'utils/config';

const network = {
    chain: 'avalanche testnet',
    symbol: 'AVAX',
    name: 'Avalanche Testnet',
    nftContractAddress: '0x2796A01EeF59443d85B67786D5eEC5a22Bc9B7C0',
    marketplaceContractAddress: '0xDB1df61Aab439fd3aF6d4eF97626d7a32D1C9A17',
    nftContractAbi: [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "Items",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "creator",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "uri",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "uri",
                    "type": "string"
                }
            ],
            "name": "createItem",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    marketplaceContractAbi: [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "askingPrice",
                    "type": "uint256"
                }
            ],
            "name": "itemAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "askingPrice",
                    "type": "uint256"
                }
            ],
            "name": "itemSold",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "askingPrice",
                    "type": "uint256"
                }
            ],
            "name": "addItemToMarket",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "buyItem",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "itemsForSale",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "address payable",
                    "name": "seller",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "askingPrice",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isSold",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
};

const BlockchainPage = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                <Grid item xs={12}>
                    <Typography variant="h2">Blockchain Settings</Typography>
                    <Typography variant="body">Please select where you want to deploy your dApp</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={4} textAlign="center">
                                <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2}} className="paper-blockchain paper-blockchain-selected" onClick={() => setNetwork(dispatch, appState, network)}>
                                    <img src={avalancheProd} alt="Ava" width="100%"/>
                                    <Typography variant="h2" sx={{ mt: 2 }}>Avalanche Testnet</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} textAlign="center">
                                <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2}} className="paper-blockchain" onClick={() => setNetwork(dispatch, appState, network)}>
                                    <img src={avalancheProd} alt="Ava" width="100%"/>
                                    <Typography variant="h2" sx={{ mt: 2 }}>Avalanche Mainnet</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} textAlign="center">
                                <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2}} className="paper-blockchain" onClick={() => setNetwork(dispatch, appState, network)}>
                                    <img src={ethereumProd} alt="Ava" width="100%"/>
                                    <Typography variant="h2" sx={{ mt: 2 }}>Ethereum Mainnet</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} textAlign="center">
                                <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2}} className="paper-blockchain" onClick={() => setNetwork(dispatch, appState, network)}>
                                    <img src={ethereumProd} alt="Ava" width="100%"/>
                                    <Typography variant="h2" sx={{ mt: 2 }}>Ethereum Ropsten</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} textAlign="center">
                                <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2}} className="paper-blockchain" onClick={() => setNetwork(dispatch, appState, network)}>
                                    <img src={ethereumProd} alt="Ava" width="100%"/>
                                    <Typography variant="h2" sx={{ mt: 2 }}>Ethereum Rinkeby</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} textAlign="center">
                                <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2}} className="paper-blockchain" onClick={() => setNetwork(dispatch, appState, network)}>
                                    <img src={binanceProd} alt="Ava" width="100%"/>
                                    <Typography variant="h2" sx={{ mt: 2 }}>BSC Mainnet</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} textAlign="center">
                                <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2}} className="paper-blockchain" onClick={() => setNetwork(dispatch, appState, network)}>
                                    <img src={binanceProd} alt="Ava" width="100%"/>
                                    <Typography variant="h2" sx={{ mt: 2 }}>BSC Testnet</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} textAlign="center">
                                <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2}} className="paper-blockchain" onClick={() => setNetwork(dispatch, appState, network)}>
                                    <img src={polygonProd} alt="Ava" width="100%"/>
                                    <Typography variant="h2" sx={{ mt: 2 }}>Polygon Mainnet</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} textAlign="center">
                                <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2}} className="paper-blockchain" onClick={() => setNetwork(dispatch, appState, network)}>
                                    <img src={polygonProd} alt="Ava" width="100%"/>
                                    <Typography variant="h2" sx={{ mt: 2 }}>Polygon Mumbai</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default BlockchainPage;
