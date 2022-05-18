// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrush, IconNews, IconUsers } from '@tabler/icons';

// constant
const icons = {
    IconBrush,
    IconNews,
    IconUsers
};

// ==============================|| UI ELEMENTS MENU ITEMS ||============================== //

const elements = {
    id: 'manage',
    title: "2. Manage",
    type: 'group',
    children: [
        {
            id: 'users',
            title: "Users",
            type: 'item',
            url: 'users',
            icon: icons.IconUsers,
            breadcrumbs: false
        }
    ]
};

export default elements;
