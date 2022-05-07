import { useEffect, useState } from 'react';
import { FormGroup, FormControlLabel, Grid, Switch, TextField, Paper, Typography, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { BlockPicker } from 'react-color';
import { gridSpacing } from 'store/constant';

import { setField, setImage, setBoolean, setColor, setMoralis, setSocial, setFeature } from 'utils/config';
import { useMoralis } from 'react-moralis';
import Loader from 'ui-component/Loader';

const NewsPage = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const [newsList, setNewsList] = useState([]);
    const [item, setItem] = useState({});
    const { Moralis } = useMoralis();
    const [isLoading, setLoading] = useState();

    const loadNews = async () => {
        console.log(appState);
        const News = Moralis.Object.extend('News');
        const query = new Moralis.Query(News);
        query.equalTo('appId', appState.id);
        const results = await query.find();
        setNewsList(results);
        console.log(results);
    };

    useEffect(() => {
        loadNews();
    }, []);

    const uploadFile = async (e) => {
        setLoading(true);
        const data = e.target.files[0];
        const file = new Moralis.File(data.name, data);
        const upload = await file.saveIPFS();
        item.image = upload.ipfs();
        setItem(item);
        setLoading(false);
    };

    const saveNews = async () => {
        setLoading(true);
        const News = Moralis.Object.extend('News');
        const news = new News();

        news.set('appId', appState.id);
        news.set('title', item.title);
        news.set('content', item.content);
        news.set('image', item.image);

        news.save().then(
            (monster) => {
                // Execute any logic that should take place after the object is saved.
                console.log(`New object created with objectId: ${monster.id}`);
                loadNews();
                setLoading(false);
            },
            (error) => {
                // Execute any logic that should take place if the save fails.
                // error is a Moralis.Error with an error code and message.
                console.log(`Failed to create new object, with error code: ${error.message}`);
                setLoading(false);
            }
        );
    };

    const remove = async (element) => {
        setLoading(true);
        await element.destroy();
        loadNews();
        setLoading(false);
    };

    const renderNews = () => {
        const list = [];
        newsList.forEach((element) => {
            list.push(
                <Grid item xs={12} key={element.id}>
                    <Paper className="paper-blockchain">
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography variant="h2">{element.attributes.title}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={() => remove(element)}>Delete</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            );
        });
        console.log(list);
        return list;
    };

    return (
        <MainCard>
            {isLoading && <Loader />}
            <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                <Grid item xs={12}>
                    <Typography variant="h2">News & Announcements</Typography>
                    <Typography variant="body">Create entries to let your users know what is new!</Typography>
                    <Paper variant="outlined" elevation="20" sx={{ p: 1, mt: 2 }} className="paper-in">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={6} textAlign="center">
                                <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                                    <Grid container spacing={2}>
                                        {newsList && renderNews()}
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={6} textAlign="center">
                                <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="body">Write or edit an article</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Title"
                                                value={item.title}
                                                onChange={(e) => {
                                                    item.title = e.target.value;
                                                    setItem(item);
                                                }}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Content"
                                                multiline
                                                maxRows={10}
                                                value={item.content}
                                                onChange={(e) => {
                                                    item.content = e.target.value;
                                                    setItem(item);
                                                }}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body">Upload a banner for this announcement</Typography>
                                            <Paper variant="outlined" elevation="20" sx={{ p: 3, mt: 2 }} className="paper-in">
                                                <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                                                    {item.image && (
                                                        <Grid item xs={12}>
                                                            <img src={item.image} alt="Logo" style={{ maxWidth: '100%' }} />
                                                        </Grid>
                                                    )}
                                                    <Grid item xs={12}>
                                                        {/* (<TextField
                                                            id="outlined-name"
                                                            label="News image"
                                                            value={item.image}
                                                            sx={{ minWidth: '75%', mr: 1 }}
                                                            onChange={(e) => {
                                                                item.image = e.target.value;
                                                                setItem(item);
                                                            }}
                                                        />
                                                        <span style={{ lineHeight: '48px' }}>{' OR '}</span> */}
                                                        <Button variant="outlined" component="label" sx={{ ml: 1 }}>
                                                            Upload File
                                                            <input accept="image/*" type="file" hidden onChange={uploadFile} />
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Button
                                                            color="secondary"
                                                            size="large"
                                                            variant="contained"
                                                            fullWidth
                                                            onClick={saveNews}
                                                        >
                                                            Save
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default NewsPage;
