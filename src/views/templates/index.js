import { useEffect, useState } from 'react';
import { Paper, Grid, Typography, FormGroup, FormControlLabel, Checkbox, Switch, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_APP } from 'store/actions';
import { SNACKBAR_OPEN } from 'store/actions';
import Template from 'react-dappify/model/Template';

const TemplatesPage = ({ id }) => {
    console.log(id);
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState();
    const [templates, setTemplates] = useState([]);
    const [total, setTotal] = useState(0);

    const loadTemplates = async() => {
        const results = await Template.listTemplates();
        setTemplates(results);
        setTotal(results.length);
    };

    useEffect(() => {
        loadTemplates(page, limit, search);
    }, [page, limit, search]);

    const renderTemplates = () => {
        const list = [];
        templates.forEach((template) => {
            const optionsClass = appState.template[template.schema.id] ? 'template__selected' : 'template__unselected';
            list.push(
                <Grid item xs={12} md={6} lg={4} key={template.schema.id}>
                    <Paper elevation={1} className={optionsClass} sx={{p:2}} onClick={() => {
                        const newState = {...appState};
                        console.log(template);
                        if (appState.template[template.schema.id]) {
                            // Toggle unselect
                            delete newState.template[template.schema.id];
                        } else {
                            // Toggle select
                            newState.template[template.schema.id] = template.schema;
                        }
                        dispatch({ type: UPDATE_APP, configuration: appState });
                    }}>
                        <Typography variant="h4">{template.schema.name}</Typography>
                        <Typography variant="h6">{template.schema.id}</Typography>
                        <Typography variant="body">{template.schema.description}</Typography>
                    </Paper>
                </Grid>
            )
        });
        return list;
    }

    return (
       <MainCard>
            <Grid container spacing={3}>
                {renderTemplates()}
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
                </Grid>
            </Grid>
       </MainCard>
    );
};

export default TemplatesPage;
