/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { UPDATE_APP } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Grid, Typography, Paper, Tooltip, Chip, FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import UserCountCard from 'ui-component/cards/UserCountCard';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import LocalGroceryStoreTwoToneIcon from '@mui/icons-material/LocalGroceryStoreTwoTone';
import LocalActivityTwoToneIcon from '@mui/icons-material/LocalActivityTwoTone';
import templateNftMarketplace from 'assets/images/marketplace.jpeg';
import SubCard from 'ui-component/cards/SubCard';
import { constants } from 'react-dappify';

const { NETWORKS, LOGO, MAINNETS, CONTRACTS } = constants;

const Blockchain = ({ onChange }) => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const theme = useTheme();
    const [selected, setSelected] = useState(appState.type);

    const projectInfo = `
    Dappify supports all EVMs. Having said this, each blockchain has a specific set of traits that make it more appealing depending on your specific needs. Have a read at each of the offering descriptions for more information
    `;

    const supported = [
        {id:'marketplace', label:"Marketplace", ready: true, tooltip: 
        `White Label NFT Marketplace.
        From tokenized artwork to audio and ingame items, you name it, there is one template that will fit your needs. Launch a beautiful, custom branded NFT marketplace you control in seconds.`},
        {id:'tokenizer', label:"NFT Creator", ready: true, tooltip: 
        `Tokenize and Create NFTs.
        Tokenize anything and create NFTs for any EVM supported blockchain, setup royalties, properties, attributes and more.`},
        {id:'membership', label:"Memberships", ready: false},
        {id:'bookings', label:"Event Bookings", ready: false},
        {id:'blog', label:"Blog", ready: false},
        {id:'qrpayments', label:"QR Payments", ready: false},
        {id:'tickets', label:"Ticket Sales", ready: false},
        {id:'landing', label:"Landing Page", ready: false},
        {id:'messaging', label:"Messaging", ready: false}
    ];

    useEffect(() => {
        if(selected) onChange(selected);
    }, [selected]);

    const renderSupported = () => {
        const list = [];
        supported.forEach((item, index) => {
            list.push(
                <Grid item>
                    <Tooltip title={item.tooltip} key={index}>
                        <Chip sx={{minWidth: 100}} disabled={!item.ready} color={selected===item.id ? 'primary': 'default'} label={item.label} variant={selected===item.id? 'contained': 'outlined'} size="large" onClick={() => setSelected(item.id)} />
                    </Tooltip>
                </Grid>
            )
        })
        return list;
    }

    const renderMenuItems = () => {
        const list = [];
        const supportedNetworks = Object.keys(NETWORKS);
        supportedNetworks.forEach((chainId) => {
            const targetNetwork = NETWORKS[chainId];
            list.push(
                <MenuItem value={chainId} key={chainId}>
                    <Grid container>
                            
                        <Box sx={{ minWidth: 30 }}>   
                            <img src={LOGO[targetNetwork.nativeCurrency.symbol]} alt="Ava" height="20px"/>
                        </Box>      
                                    <Typography variant="h3" fontWeight={200} sx={{ ml: 2 }}>{targetNetwork.chainName}</Typography>
                    </Grid>
                </MenuItem>
            )
        })
        return list;
    };

    return (
        <Grid container direction="row" justifyContent="left" alignItems="left" spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h1" fontWeight="regular" sx={{ mb: 5 }}>
                    What ecosystem best suits<br/>your 
                    <Tooltip title={projectInfo}>
                        <span className="project-keyword">use cases<HelpOutlineIcon /></span>
                    </Tooltip>
                </Typography>
            </Grid>
            <Grid container spacing={1}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select your ecosystem</InputLabel>
                    <Select labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select your ecosystem"
                            onChange={(e) => onChange(e.target.value)}
                    >
                        {renderMenuItems()}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Blockchain;
