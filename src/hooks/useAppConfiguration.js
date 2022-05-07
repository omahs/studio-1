import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';

const defaultConfig = {
    name: 'Your name goes here',
    title: 'Your flashy title goes here to blow your users away!',
    subtitle:
        'Anything else you may want to add to let your users know about your project, what is it about, who can do what? this is the perfect place to define all this information',
    logoUrl: 'https://dappify.com/static/media/dappify_full_transparent_background_text.20b4986f.svg',
    theme: 'MOSAIC_LIGHT',
    color: 'cornflowerblue',
    colorSecondary: 'red',
    colorMenu: 'deepskyblue',
    textColor: '#666',
    exploreSideMenu: true,
    feature: {
        create: true,
        stats: true,
        news: true,
        auction: true,
        bids: true,
        comments: true,
        social: true
    },
    categories: [
        {
            name: 'Art',
            fontAwesomeIcon: 'fa-image',
            resource: 'art'
        },
        {
            name: 'Musik',
            fontAwesomeIcon: 'fa-music',
            resource: 'music'
        },
        {
            name: 'Domain Names',
            fontAwesomeIcon: 'fa-search',
            resource: 'domains'
        },
        {
            name: 'Virtual Worls',
            fontAwesomeIcon: 'fa-globe',
            resource: 'worls'
        },
        {
            name: 'Trading Kards',
            fontAwesomeIcon: 'fa-vcard',
            resource: 'cards'
        },
        {
            name: 'Collektibles',
            fontAwesomeIcon: 'fa-th',
            resource: 'collectibles'
        }
    ],
    moralis: {
        appId: 'eRamAhTkLGdRjN6f97nnmMg2ysLh9PKHqa5LCuuL',
        serverUrl: 'https://uupcwbzcd0g3.usemoralis.com:2053/server'
    },
    images: {
        subHeader: 'https://dappify-nftmarketplace.firebaseapp.com/img/background/subheader.jpg',
        landingPage: 'https://dappify-nftmarketplace.firebaseapp.com/img/background/15.jpg'
    },
    social: {
        facebook: 'asd',
        twitter: 'asd',
        instagram: 'as',
        pinterest: 'asd',
        email: 'mail@gmail.com',
        telegram: 'asda'
    }
};

const useAppConfiguration = () => {
    const { Moralis, user } = useMoralis();
    const [appConfiguration, setAppConfiguration] = useState({});

    // const loadAppConfiguration = async (appId) => {
    //     // const Project = Moralis.Object.extend('Project');
    //     // const query = new Moralis.Query(Project);
    //     // query.equalTo('objectId', appId);
    //     // query.equalTo('owner', user.get('ethAddress'));
    //     // const appObj = await query.first();
    //     // const config = appObj?.attributes?.config;
    //     // setAppConfiguration(config);
    // };

    // useEffect(() => {
    //     loadAppConfiguration();
    // }, [appId]);

    return { appConfiguration };
};

export default useAppConfiguration;
