import { useEffect, useState } from 'react';
import { Paper, Grid, Typography, FormGroup, FormControlLabel, Checkbox, Switch, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_APP } from 'store/actions';
import { SNACKBAR_OPEN } from 'store/actions';
import {Template} from 'react-dappify';
import Marketplace from 'views/marketplace/Options';

const TemplatesPage = ({ id }) => {
    // console.log(id);
    // const dispatch = useDispatch();
    // const appState = useSelector((state) => state.app);
    // const [page, setPage] = useState(0);
    // const [limit, setLimit] = useState(10);
    // const [search, setSearch] = useState();
    // const [templates, setTemplates] = useState([]);
    // const [total, setTotal] = useState(0);

    return (
       <MainCard sx={{ width:'100%' }}>
            <Grid container spacing={3} sx={{ width: '100%' }}>
                {/*renderTemplates()}
                <Grid item xs={12}>
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
                        </Grid> */}
                        <Marketplace />
            </Grid>
       </MainCard>
    );
};

export default TemplatesPage;
