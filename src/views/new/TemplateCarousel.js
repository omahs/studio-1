import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable react/no-unescaped-entities */
import { UPDATE_APP } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Typography, Paper, Button } from '@mui/material';

import sonicLight from 'assets/images/templates/nft/sonicLight.png';
import carouselLight from 'assets/images/templates/nft/carouselLight.png';
import carouselSmallLight from 'assets/images/templates/nft/carouselSmallLight.png';
import flatLight from 'assets/images/templates/nft/flatLight.png';
import mosaicLight from 'assets/images/templates/nft/mosaicLight.png';
import vectorLight from 'assets/images/templates/nft/vectorLight.png';
import splitLight from 'assets/images/templates/nft/splitLight.png';
import splitDark from 'assets/images/templates/nft/splitDark.png';
import vectorDark from 'assets/images/templates/nft/vectorDark.png';
import carouselSmallDark from 'assets/images/templates/nft/carouselSmallDark.png';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const imgStyle = {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
};

const imageRepoUrl = 'https://s3.amazonaws.com/dappify.templates/';

const options = [
    {
        id: 'SONIC_LIGHT',
        name: 'Sonic Light',
        img: sonicLight,
        images: {
            landingPage: `${imageRepoUrl}14.jpg`,
            subHeader: `${imageRepoUrl}2.jpg`
        }
    },
    {
        id: 'CAROUSEL_LIGHT',
        name: 'Carousel Light',
        img: carouselLight,
        images: {
            landingPage: `${imageRepoUrl}15.jpg`,
            subHeader: `${imageRepoUrl}2.jpg`
        }
    },
    {
        id: 'FLAT_LIGHT',
        name: 'Flat Light',
        img: flatLight,
        images: {
            landingPage: `${imageRepoUrl}15.jpg`,
            subHeader: `${imageRepoUrl}2.jpg`
        }
    },
    {
        id: 'MOSAIC_LIGHT',
        name: 'Mosaic Light',
        img: mosaicLight,
        images: {
            landingPage: `${imageRepoUrl}11.jpg`,
            subHeader: `${imageRepoUrl}2.jpg`
        }
    },
    {
        id: 'VECTOR_LIGHT',
        name: 'Vector Light',
        img: vectorLight,
        images: {
            landingPage: `${imageRepoUrl}8.jpg`,
            subHeader: `${imageRepoUrl}2.jpg`
        }
    },
    {
        id: 'CAROUSEL_SMALL_LIGHT',
        name: 'Carousel Small Light',
        img: carouselSmallLight,
        images: {
            landingPage: `${imageRepoUrl}1.jpg`,
            subHeader: `${imageRepoUrl}2.jpg`
        }
    },
    {
        id: 'SPLIT_LIGHT',
        name: 'Split Light',
        img: splitLight,
        images: {
            landingPage: `${imageRepoUrl}11.jpg`,
            subHeader: `${imageRepoUrl}2.jpg`
        }
    },
    {
        id: 'SPLIT_DARK',
        name: 'Split Dark',
        img: splitDark,
        images: {
            landingPage: `${imageRepoUrl}8.jpg`,
            subHeader: `${imageRepoUrl}2.jpg`
        }
    },
    {
        id: 'VECTOR_DARK',
        name: 'Vector Dark',
        img: vectorDark,
        images: {
            landingPage: `${imageRepoUrl}8.jpg`,
            subHeader: `${imageRepoUrl}2.jpg`
        }
    },
    {
        id: 'CAROUSEL_SMALL_DARK',
        name: 'Carousel Small Dark',
        img: carouselSmallDark,
        images: {
            landingPage: `${imageRepoUrl}1.jpg`,
            subHeader: `${imageRepoUrl}2.jpg`
        }
    }
];

const TemplateCarousel = ({ onSelect, selected }) => {
    const [themeIndex, setThemeIndex] = useState(0);

    useEffect(() => {
        if (selected) {
            const selectedThemeIndex = options.findIndex((opt) => opt.id === selected);
            setThemeIndex(selectedThemeIndex);
        }
    }, []);

    const renderCarouselOptions = () => {
        const items = [];
        options.forEach((opt) => {
            items.push(
                <Paper elevation="0" key={opt.id}>
                    <img src={opt.img} alt={opt.name} style={imgStyle} />
                    <Button className="legend btn-option" onClick={() => onSelect(opt)}>
                        {opt.name}
                    </Button>
                </Paper>
            );
        });
        return items;
    };

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ px: '12.5%' }} spacing={2}>
            <Grid item xs={12} textAlign="center">
                <Typography className="landing-title-white">Select your starting template</Typography>
            </Grid>
            <Grid item xs={12} lg={8} xl={6}>
                <Carousel selectedItem={themeIndex}>{renderCarouselOptions()}</Carousel>
            </Grid>
        </Grid>
    );
};

TemplateCarousel.propTypes = {
    onSelect: PropTypes.func,
    selected: PropTypes.string
};

export default TemplateCarousel;
