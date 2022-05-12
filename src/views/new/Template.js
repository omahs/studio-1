/* eslint-disable react/no-unescaped-entities */
import { UPDATE_APP } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';

const Template = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);

    const handleSelectTemplate = (template) => {
        appState.step += 1;
        appState.theme = template.id;
        appState.title = 'Create, sell or collect digital items.';
        appState.subtitle =
            'Unit of data stored on a digital ledger, called a blockchain, that certifies a digital asset to be unique and therefore not interchangeable';
        appState.logoUrl = 'https://dappify.com/static/media/dappify_full_transparent_background_text.20b4986f.svg';
        appState.color = '#8364E2';
        appState.colorSecondary = '#403F83';
        appState.colorMenu = '#8364E2';
        appState.textColor = template.id.includes('DARK') ? '#ffffff' : '#666666';
        appState.exploreSideMenu = true;
        appState.feature = {
            create: false,
            stats: false,
            news: false,
            auction: false,
            bids: false,
            comments: false,
            social: false
        };
        appState.categories = [
            { name: 'Art', fontAwesomeIcon: 'fa-image', resource: 'art' },
            { name: 'Music', fontAwesomeIcon: 'fa-music', resource: 'music' },
            { name: 'Domain Names', fontAwesomeIcon: 'fa-search', resource: 'domains' },
            { name: 'Virtual Worls', fontAwesomeIcon: 'fa-globe', resource: 'worls' },
            { name: 'Trading Cards', fontAwesomeIcon: 'fa-vcard', resource: 'cards' },
            { name: 'Collectibles', fontAwesomeIcon: 'fa-th', resource: 'collectibles' }
        ];
        appState.images = template.images;
        appState.social = {
            facebook: null,
            twitter: null,
            instagram: null,
            pinterest: null,
            email: null,
            telegram: null
        };
        dispatch({ type: UPDATE_APP, configuration: appState });
    };

    return <div></div>;
};

export default Template;
