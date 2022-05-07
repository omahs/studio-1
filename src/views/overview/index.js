import { Typography, Grid, TextField, Paper } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import { UPDATE_APP } from 'store/actions';
import { setField, setSocial } from 'utils/config';

const OverviewPage = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);

    const renderFooterColumnItems = (column) => {
        const list = [];
        appState.footer[column].items.forEach((item, index) => {
            list.push(
                <Grid container direction="row" spacing={2}sx={{ py: 1 }}>
                    <Grid item xs={6}>
                        <TextField
                            label="Title"
                            value={item.title}
                            onChange={(e) => {
                                appState.footer[column].items[index].title = e.target.value;
                                dispatch({ type: UPDATE_APP, configuration: appState });
                            }}
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Link URL"
                            value={item.link}
                            onChange={(e) => {
                                appState.footer[column].items[index].link = e.target.value;
                                dispatch({ type: UPDATE_APP, configuration: appState });
                            }}
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            );
        });
        return list;
    }


    const renderCategoryItems = (column) => {
        const list = [];
        appState.categories.forEach((item, index) => {
            list.push(
                <Grid container direction="row" spacing={2}sx={{ py: 1 }}>
                    <Grid item xs={4}>
                        <TextField
                            label="Label"
                            value={item.label}
                            onChange={(e) => {
                                appState.categories[index].label = e.target.value;
                                dispatch({ type: UPDATE_APP, configuration: appState });
                            }}
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="URI"
                            value={item.uri}
                            onChange={(e) => {
                                appState.categories[index].uri = e.target.value;
                                dispatch({ type: UPDATE_APP, configuration: appState });
                            }}
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Icon"
                            value={item.icon}
                            onChange={(e) => {
                                appState.categories[index].icon = e.target.value;
                                dispatch({ type: UPDATE_APP, configuration: appState });
                            }}
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            );
        });
        return list;
    }

    return (
        <MainCard>
            <Grid container spacing={gridSpacing} sx={{ p: 3 }} alignContent="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h2">Basic Information</Typography>
                    <Typography variant="body">Only App Name is editable.</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-name"
                                    label="App Name"
                                    value={appState.name}
                                    onChange={(e) => setField(dispatch, appState, 'name', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="outlined-id" disabled label="App Id" value={appState.appId} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-id"
                                    disabled
                                    label="Provided Subdomain"
                                    value={`https://${appState.subdomain}.dappify.us`}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-id"
                                    disabled
                                    label="Custom Domain"
                                    value={appState.domain ? appState.domain : 'Contact support@dappify to request one'}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h2">Contact Information</Typography>
                    <Typography variant="body">Links are optional and are displayed in the footer.</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-email"
                                    label="Email Address"
                                    value={appState?.social?.email}
                                    onChange={(e) => setSocial(dispatch, appState, 'email', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-facebook"
                                    label="Facebook Page URL"
                                    value={appState?.social?.facebook}
                                    onChange={(e) => setSocial(dispatch, appState, 'facebook', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-instagram"
                                    label="Instagram URL"
                                    value={appState?.social?.instagram}
                                    onChange={(e) => setSocial(dispatch, appState, 'instagram', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-twitter"
                                    label="Twitter URL"
                                    value={appState?.social?.twitter}
                                    onChange={(e) => setSocial(dispatch, appState, 'twitter', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-telegram"
                                    label="Telegram URL"
                                    value={appState?.social?.telegram}
                                    onChange={(e) => setSocial(dispatch, appState, 'telegram', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-pinterest"
                                    label="Pinterest URL"
                                    value={appState?.social?.pinterest}
                                    onChange={(e) => setSocial(dispatch, appState, 'pinterest', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Typography variant="h2">Footer left</Typography>
                    <Typography variant="body">Footer left column items</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                        <TextField
                            id="outlined-email"
                            label="Header"
                            value={appState.footer.left.title}
                            onChange={(e) => {
                                appState.footer.left.title = e.target.value;
                                dispatch({ type: UPDATE_APP, configuration: appState });
                            }}
                            fullWidth
                        />
                        {renderFooterColumnItems('left')}
                    </Paper>    
                </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                    <Typography variant="h2">Footer center</Typography>
                    <Typography variant="body">Footer center column items</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                        <TextField
                            id="outlined-email"
                            label="Header"
                            value={appState.footer.center.title}
                            onChange={(e) => {
                                appState.footer.center.title = e.target.value;
                                dispatch({ type: UPDATE_APP, configuration: appState });
                            }}
                            fullWidth
                        />
                        {renderFooterColumnItems('center')}
                    </Paper>    
                </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                    <Typography variant="h2">Footer right</Typography>
                    <Typography variant="body">Footer right column items</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                        <TextField
                            id="outlined-email"
                            label="Header"
                            value={appState.footer.right.title}
                            onChange={(e) => {
                                appState.footer.right.title = e.target.value;
                                dispatch({ type: UPDATE_APP, configuration: appState });
                            }}
                            fullWidth
                        />
                        {renderFooterColumnItems('right')}
                    </Paper>    
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2">Categories</Typography>
                    <Typography variant="body">Add filtering categories.  Use the string identifier from icons in <a href="https://fonts.google.com/icons?icon.style=Outlined">Material UI</a></Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                        {renderCategoryItems()}
                    </Paper>    
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default OverviewPage;
