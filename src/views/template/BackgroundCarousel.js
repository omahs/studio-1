import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable react/no-unescaped-entities */
import { UPDATE_APP } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Typography, Paper, Button } from '@mui/material';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const imgStyle = {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
};

const imageRepoUrl = 'https://s3.amazonaws.com/dappify.templates/';
const totalTemplates = 15;

const BackgroundCarousel = ({ onSelect, selected }) => {
    const [themeIndex, setThemeIndex] = useState(0);

    const renderCarouselOptions = () => {
        const items = [];
        for (let i = 1; i <= totalTemplates; i += 1) {
            const url = `${imageRepoUrl}${i}.jpg`;
            items.push(
                <Paper elevation="0" key={i}>
                    <img src={url} alt={i} style={imgStyle} />
                    <Button className="legend btn-option" onClick={() => onSelect(url)}>
                        Select
                    </Button>
                </Paper>
            );
        }
        return items;
    };

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ px: '12.5%' }} spacing={2}>
            <Grid item xs={12} textAlign="center">
                <Carousel selectedItem={themeIndex}>{renderCarouselOptions()}</Carousel>
            </Grid>
        </Grid>
    );
};

BackgroundCarousel.propTypes = {
    onSelect: PropTypes.func,
    selected: PropTypes.string
};

export default BackgroundCarousel;
