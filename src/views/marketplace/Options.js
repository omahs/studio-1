import { useEffect, useState } from 'react';
import { Button, Box, TextField, InputAdornment, Tabs, Tab, Paper, Grid, Typography, FormGroup, FormControlLabel, Checkbox, Switch, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_APP } from 'store/actions';
import { SNACKBAR_OPEN } from 'store/actions';
import {Template} from 'react-dappify';

import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import SearchIcon from '@mui/icons-material/Search';
import background from 'assets/images/landing/bg5.svg';

import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import TokenIcon from '@mui/icons-material/Token';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DownloadIcon from '@mui/icons-material/Download';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

const Options = ({ id }) => {
    console.log(id);
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState();
    const [templates, setTemplates] = useState([]);
    const [total, setTotal] = useState(0);

    const [value, setValue] = useState("all");

    const installedTemplates = Object.keys(appState?.template || []);
    const myTemplates = installedTemplates.map((temp) => {
        return { schema: appState.template[temp] }
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const prepareFilters = () => {
        const list = [];

        if (search) list.push({ key: 'schema.description', value: search, type: 'contains' })
        switch (value) {
            case 'all':
            break;
            case 'installed':
                // list.push({ key: 'name', value: installedTemplates, type: 'equalTo' })
            break;
            default:
                list.push({ key: 'schema.category', value: value })
        }
        return list;
    };

    const loadTemplates = debounce(async() => {
        const filters = prepareFilters();
        let results = await Template.listTemplates({ filters });
        setTemplates(results);
        setTotal(results.length);
    }, 500);

    useEffect(() => {
        if (value === 'installed') {
            let usedList = []
            if (search) {
                usedList = myTemplates.filter((temp) => temp.schema.description.includes(search))
            } else {
                usedList = myTemplates;
            }
            setTemplates(usedList);
            setTotal(usedList.length);
        } else {
            loadTemplates();
        }
    }, [appState.template, page, limit, search, value]);

    const renderTemplates = () => {
        const list = [];
        templates.forEach((template) => {
            console.log(template);
            const isInstalled = appState.template[template?.schema?.id];
            list.push(
                <Grid item xs={12} md={6} lg={4} key={template?.schema?.id}>
                    <Paper elevation={10} sx={{p:2}} onClick={() => {
                        // const newState = {...appState};
                        // if (appState.template[template.schema.id]) {
                        //     // Toggle unselect
                        //     delete newState.template[template?.schema?.id];
                        // } else {
                        //     // Toggle select
                        //     newState.template[template?.schema?.id] = template?.schema;
                        // }
                        // dispatch({ type: UPDATE_APP, configuration: appState });
                    }}>
                        <Box sx={{ 
                            height: 250, 
                            background: `url(${template?.schema?.image})`, 
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            mb: 2 
                        }} />
                        <Box sx={{ height: 75, overflow: 'hidden', mb: 1 }}>
                            <Typography variant="h4">{template?.schema?.name}</Typography>
                            <Typography variant="h6">{template?.schema?.id}</Typography>
                            <Typography variant="body">{template?.schema?.description}</Typography>
                        </Box>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Button fullWidth href={template?.schema?.guide} target="_blank">Learn more</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth href={template?.schema?.sample} target="_blank">Demo</Button>
                            </Grid>
                            {!isInstalled && (
                                <Grid item xs={12}>
                                    <Button variant="contained" 
                                            color="secondary" 
                                            fullWidth 
                                            onClick={() => {
                                                const newState = {...appState};
                                                newState.template[template?.schema?.id] = template?.schema;
                                                dispatch({ type: UPDATE_APP, configuration: appState });
                                            }}
                                            >Install Ver. {template?.schema?.version}</Button>
                                </Grid>)
                            }
                            {isInstalled && (
                                <Grid item xs={12}>
                                    <Button variant="contained" 
                                            color="secondary" 
                                            fullWidth 
                                            onClick={() => {
                                                const newState = {...appState};
                                                delete newState.template[template?.schema?.id];
                                                dispatch({ type: UPDATE_APP, configuration: appState });
                                            }}
                                            >Uninstall Ver. {template?.schema?.version}</Button>
                                </Grid>)
                            }
                        </Grid>
                        
                    </Paper>
                </Grid>
            )
        });
        return list;
    }

    return (
       <MainCard sx={{ backgroundColor: 'rgba(255,255,255, 0.85)', border: 0, m: 5, borderRadius: 3, pt: 0, width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ mt: 1 }}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Search"
                        fullWidth
                        placeholder="Search by name or type"
                        variant="outlined"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                        )
                        }}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                        {!isEmpty(installedTemplates) && <Tab value="installed" icon={<DownloadIcon />} label="Installed" />}
                        <Tab value="all" icon={<AllInclusiveIcon />} label="All" />
                        <Tab value="nft" icon={<TokenIcon />} label="NFT" />
                        <Tab value="defi" icon={<AccountBalanceIcon />} label="DeFi" />
                        <Tab value="gamefi" icon={<SportsEsportsIcon />} label="GameFi" />
                    </Tabs>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: 1 }}>

                {renderTemplates()}
                {/*<Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Default landing page</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={appState.type}
                        label="Default landing page"
                        onChange={(e) => {
                            const newState = {...appState};
                            newState.type = e.target.value;
                            dispatch({ type: UPDATE_APP, configuration: newState });
                        }}
                        >
                            {Object.keys(appState.template).map((templateId) => {
                                const landingTemplateOption = appState.template[templateId];
                                return (
                                    <MenuItem value={landingTemplateOption.id}>{landingTemplateOption.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                        </Grid>*/}
            </Grid>
       </MainCard>
    );
};

export default Options;
