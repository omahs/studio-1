import { useEffect, useState } from 'react';
import { FormGroup, FormControlLabel, Grid, Switch, TextField, Paper, Typography, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { BlockPicker } from 'react-color';
import { gridSpacing } from 'store/constant';

import { setField, setImage, setBoolean, setColor, setMoralis, setSocial, setFeature } from 'utils/config';
import { useMoralis } from 'react-moralis';
import Loader from 'ui-component/Loader';
import UserList from 'views/users/UserList';

const UsersPage = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const [newsList, setNewsList] = useState([]);
    const [item, setItem] = useState({});
    const { Moralis } = useMoralis();
    const [isLoading, setLoading] = useState();

    const loadNews = async () => {
        const News = Moralis.Object.extend('News');
        const query = new Moralis.Query(News);
        query.equalTo('appId', appState.id);
        const results = await query.find();
        setNewsList(results);
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
        return list;
    };

    return (
        <MainCard>
            <UserList />
        </MainCard>
    );
};

export default UsersPage;
