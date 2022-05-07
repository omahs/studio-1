// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrush, IconNews } from '@tabler/icons';

// constant
const icons = {
    IconBrush,
    IconNews
};

// ==============================|| UI ELEMENTS MENU ITEMS ||============================== //

const elements = {
    id: 'content',
    title: <FormattedMessage id="Content Creation" />,
    type: 'group',
    children: [
        {
            id: 'news',
            title: <FormattedMessage id="News" />,
            type: 'item',
            url: 'news',
            icon: icons.IconNews,
            breadcrumbs: false
        }
    ]
};

export default elements;
