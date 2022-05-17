// third-party
import { FormattedMessage } from 'react-intl';

import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

// assets
import {
    IconDashboard,
    IconDeviceAnalytics,
    IconCurrencyBitcoin,
    IconShoppingCart,
    IconAd,
    IconNotes,
    IconSquarePlus,
    IconList,
    IconMessage2,
    IconRecycle,
    IconUserCheck,
    IconBellRinging,
    IconSend,
    IconClock,
    IconHistory,
    IconBrandGoogleAnalytics,
    IconChartPie,
    IconChartBubble,
    IconPalette,
    IconPaint,
    IconLayout,
    IconEditCircle,
    IconQrcode,
    IconUpload,
    IconEye,
    IconCircleCheck,
    IconCircle,
    IconSquaresFilled,
    IconDevices,
    IconInfoSquare,
    IconShape,
    IconSlideshow,
    IconHierarchy,
    IconAdjustments,
    IconSettingsAutomation,
    IconSettings,
    IconLanguage
} from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconCurrencyBitcoin,
    IconShoppingCart,
    IconAd,
    IconNotes,
    IconSquarePlus,
    IconList,
    IconMessage2,
    IconRecycle,
    IconUserCheck,
    IconBellRinging,
    IconSend,
    IconClock,
    IconHistory,
    IconBrandGoogleAnalytics,
    IconChartPie,
    IconChartBubble,
    IconPalette,
    IconPaint,
    IconLayout,
    IconEditCircle,
    IconQrcode,
    IconUpload,
    IconEye,
    IconCircleCheck,
    IconCircle,
    IconSquaresFilled,
    IconDevices,
    IconInfoSquare,
    IconShape,
    IconSlideshow,
    IconHierarchy,
    IconAdjustments,
    IconSettingsAutomation,
    IconSettings,
    IconLanguage
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: <FormattedMessage id="1.Configure" />,
    type: 'group',
    children: [
        {
            id: 'default',
            title: <FormattedMessage id="1. Get started" />,
            type: 'item',
            url: 'overview',
            icon: icons.IconInfoSquare,
            breadcrumbs: false
        },
        {
            id: 'theme',
            title: <FormattedMessage id="2. Brand it" />,
            type: 'item',
            url: 'theme',
            icon: icons.IconPalette,
            breadcrumbs: false,
            // children: [
            //     {
            //         id: 'brand',
            //         title: <FormattedMessage id="Brand Icon & Colors" />,
            //         type: 'item',
            //         url: 'brand',
            //         icon: icons.IconShape,
            //         breadcrumbs: false
            //     },
            //     {
            //         id: 'template',
            //         title: <FormattedMessage id="Template Style" />,
            //         type: 'item',
            //         url: 'template',
            //         icon: icons.IconSlideshow,
            //         breadcrumbs: false
            //     }
            // ]
        },
        {
            id: 'localization',
            title: <FormattedMessage id="3. Localize it" />,
            type: 'item',
            url: 'localization',
            icon: icons.IconLanguage,
            breadcrumbs: false
        },
        // {
        //     id: 'features',
        //     title: <FormattedMessage id="Features" />,
        //     type: 'item',
        //     url: 'features',
        //     icon: icons.IconAdjustments,
        //     breadcrumbs: false
        // },
        {
            id: 'blockchain',
            title: <FormattedMessage id="4. Your smart contract" />,
            type: 'item',
            url: 'blockchain',
            icon: icons.IconSettingsAutomation,
            breadcrumbs: false
        },
        {
            id: 'backend',
            title: <FormattedMessage id="5. Review settings" />,
            type: 'item',
            url: 'backend',
            icon: icons.IconSettings,
            breadcrumbs: false
        },
        // {
        //     id: 'content',
        //     title: <FormattedMessage id="Content" />,
        //     type: 'collapse',
        //     url: 'builder/dashboard/default',
        //     completed: false,
        //     breadcrumbs: false,
        //     children: [
        //         {
        //             id: 'contentAdd',
        //             title: <FormattedMessage id="Add" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconSquarePlus,
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'contentList',
        //             title: <FormattedMessage id="Content List" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconList,
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'contentComments',
        //             title: <FormattedMessage id="Comments" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconMessage2,
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'contentDeleted',
        //             title: <FormattedMessage id="Recycle Bin" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconRecycle,
        //             breadcrumbs: false
        //         }
        //     ]
        // },
        // {
        //     id: 'monetization',
        //     title: <FormattedMessage id="Monetization" />,
        //     type: 'collapse',
        //     url: 'builder/dashboard/analytics',
        //     completed: false,
        //     breadcrumbs: false,
        //     children: [
        //         {
        //             id: 'monetizationApp',
        //             title: <FormattedMessage id="InApp Purchase" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconShoppingCart,
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'monetizationAdvertising',
        //             title: <FormattedMessage id="Advertising" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconAd,
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default dashboard;
