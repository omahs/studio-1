import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
    useParams
  } from "react-router-dom";
import { Paper, Grid, Typography, Input, FormGroup, FormControlLabel, Switch, Checkbox, TextField, Button, Alert, Box, Tabs, Tab } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Property from 'react-dappify/model/Property';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_APP } from 'store/actions';
import { SNACKBAR_OPEN } from 'store/actions';
import { debounce } from 'react-dappify/utils/timer';
import isEmpty from 'lodash/isEmpty';
import AddIcon from '@mui/icons-material/Add';
import constants from 'react-dappify/constants';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { DappifyContext } from 'react-dappify';
import { getUrl } from 'utils/url';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const TemplatesItemPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const [properties, setProperties] = useState([]);
    const { Provider } = useContext(DappifyContext);
   
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const loadProperties = async() => {
        setProperties([]);
        const props = await Property.listPropertiesByProject({ projectId: appState.appId, templateId: id  });
        setProperties(props);
    }

    useEffect(() => {
        loadProperties();
    }, [id]);

    const saveProperty = debounce((prop) => prop.save());

    const renderProperties = () => {
        const list = properties.map((prop) => {
            return (
                <Grid item xs={12}>
                    <Grid container xs={prop.id} spacing={2}>
                        <Grid item xs={2}>
                            <TextField placeholder="Type" fullWidth defaultValue={prop.type}  onChange={(e) => {
                                prop.type = e.target.value;
                                saveProperty(prop);
                            }}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField placeholder="Key" fullWidth defaultValue={prop.key} onChange={(e) => {
                                prop.key = e.target.value;
                                saveProperty(prop);
                            }} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField placeholder="Value" fullWidth defaultValue={prop.value} onChange={(e) => {
                                prop.value = e.target.value;
                                saveProperty(prop);
                            }} />
                        </Grid>
                        <Grid item xs={2}>
                            <label htmlFor="contained-button-file">
                                <Input  sx={{ display: 'none' }} 
                                        accept="image/*" 
                                        id="contained-button-file" 
                                        type="file"
                                        onChange={async(e) => {
                                            const data = e.target.files[0];
                                            const file = new Provider.File('property', data);
                                            const upload = await file.saveIPFS();
                                            prop.value = upload.ipfs();
                                            saveProperty(prop);
                                        }}/>
                                <Button component="span" color="primary">
                                    <FileUploadIcon />
                                </Button>
                            </label>
                            <Button color="error" size="large" onClick={async() => {
                                await prop.remove();
                                await loadProperties();
                            }}><RemoveCircleIcon /></Button>
                        </Grid>
                    </Grid>
                </Grid>
            )
        })
        return list;
    }


    const getSmartContract = () => {
        return appState.template[id].contract[appState.chainId]
    }

    const getSmartContractExplorerUrl = () => {
        return `${constants.NETWORKS[appState.chainId].blockExplorerUrls[0]}/address/${getSmartContract()}`;
    }

    const isSupported = () => !isEmpty(getSmartContract());

    const renderLocales = () => {
        const list = [];
        if (isEmpty(appState.template[id].translation)) return list;
        const items = Object.keys(appState.template[id].translation?.resources?.en?.translation);
        items.forEach((item, index) => {
            list.push(
                <Grid container key={index} sx={{ my: 1}} spacing={2}>
                    <Grid item xs={4}>
                        <TextField disabled placeholder="Type" fullWidth defaultValue={item} />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth defaultValue={appState.template[id].translation.resources.en.translation[item]} 
                            onChange={(e) => {
                                appState.template[id].translation.resources.en.translation[item] = e.target.value;
                                dispatch({ type: UPDATE_APP, configuration: appState });
                            }}></TextField>
                    </Grid>
                </Grid>
            );
        })
        return list;
    }

    return (
       <MainCard>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">{appState.template[id].name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{ textTransform: 'none' }} href={getUrl(appState.subdomain, id)} target="_blank">{getUrl(appState.subdomain, id)}</Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body">{appState.template[id].description}</Typography>
                </Grid>
                <Grid item xs={12}>
                    {isSupported() && (<Button variant="contained" color="secondary" sx={{ textTransform: 'none' }} href={getSmartContractExplorerUrl()} target="_blank">View in explorer {getSmartContract()}</Button>)}
                    {!isSupported() && (<Button variant="contained" color="error" sx={{ textTransform: 'none' }} disabled>Not supported in current blockchain</Button>)}
                    <Button variant="outlined" sx={{ textTransform: 'none', ml: 1  }} href={appState.template[id].source} target="_blank">Source code</Button>
                    <Button variant="outlined" sx={{ textTransform: 'none', ml: 1 }} href={appState.template[id].guide} target="_blank">Documentation</Button>
                    {appState.template[id].admin && (<Button variant="outlined" sx={{ textTransform: 'none', ml: 1 }} href={`${getUrl()}${appState.template[id].admin}`} target="_blank">Manage Blockchain Settings</Button>)}
                </Grid>
                <Grid item xs={12} alignContent="center">
                    <Alert severity="info">Follow the <a href={appState.template[id].guide} target="_blank" rel="noreferrer">how to guide</a> for instructions on how to set up the properties for this template</Alert>
                </Grid>
                <Grid container sx={{ p: 2 }} spacing={2}>

                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Properties" {...a11yProps(0)} />
                                <Tab label="Language" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Grid container spacing={2} sx={{ p: 3 }}>
                                <Grid item xs={12}>
                                    <Typography variant="h2">Template properties</Typography>
                                    <Typography variant="body">Configurable settings for the template</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" disabled={!isSupported()} onClick={async () => {
                                        await Property.addPropertyForProject({ projectId: appState.appId, templateId: id });
                                        await loadProperties();
                                    }} endIcon={<AddIcon />}>Add Property</Button>
                                </Grid>
                                {!isEmpty(properties) && renderProperties()}
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Grid container spacing={2} sx={{ p: 3 }}>
                                <Grid item xs={12}>
                                    <Typography variant="h2">Localization</Typography>
                                    <Typography variant="body">Translate default text from the template</Typography>
                                    <Grid container spacing={2} sx={{ p: 3 }}>
                                        {renderLocales()}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </Box>

                </Grid>
            </Grid>
       </MainCard>
    );
};

export default TemplatesItemPage;
