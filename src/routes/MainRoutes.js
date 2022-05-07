import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardAnalytics = Loadable(lazy(() => import('views/dashboard/Analytics')));

// widget routing
const WidgetStatistics = Loadable(lazy(() => import('views/widget/Statistics')));
const WidgetData = Loadable(lazy(() => import('views/widget/Data')));
const WidgetChart = Loadable(lazy(() => import('views/widget/Chart')));

// application - user social & account profile routing
const AppUserSocialProfile = Loadable(lazy(() => import('views/application/users/social-profile')));
const AppUserAccountProfile1 = Loadable(lazy(() => import('views/application/users/account-profile/Profile1')));
const AppUserAccountProfile2 = Loadable(lazy(() => import('views/application/users/account-profile/Profile2')));
const AppUserAccountProfile3 = Loadable(lazy(() => import('views/application/users/account-profile/Profile3')));
const ApplicationPage = Loadable(lazy(() => import('views/application')));

// application - user cards & list variant routing
const AppProfileCardStyle1 = Loadable(lazy(() => import('views/application/users/card/CardStyle1')));
const AppProfileCardStyle2 = Loadable(lazy(() => import('views/application/users/card/CardStyle2')));
const AppProfileCardStyle3 = Loadable(lazy(() => import('views/application/users/card/CardStyle3')));
const AppProfileListStyle1 = Loadable(lazy(() => import('views/application/users/list/Style1')));
const AppProfileListStyle2 = Loadable(lazy(() => import('views/application/users/list/Style2')));

// application - customer routing
const AppCustomerList = Loadable(lazy(() => import('views/application/customer/CustomerList')));
const AppCustomerOrderList = Loadable(lazy(() => import('views/application/customer/OrderList')));
const AppCustomerOrderDetails = Loadable(lazy(() => import('views/application/customer/OrderDetails')));
const AppCustomerProduct = Loadable(lazy(() => import('views/application/customer/Product')));
const AppCustomerProductReview = Loadable(lazy(() => import('views/application/customer/ProductReview')));

// application routing
const AppChat = Loadable(lazy(() => import('views/application/chat')));
const AppKanban = Loadable(lazy(() => import('views/application/kanban')));
const AppMail = Loadable(lazy(() => import('views/application/mail')));
const AppContactCard = Loadable(lazy(() => import('views/application/contact/Card')));
const AppContactList = Loadable(lazy(() => import('views/application/contact/List')));

// application e-commerce pages
const AppECommProducts = Loadable(lazy(() => import('views/application/e-commerce/Products')));
const AppECommProductDetails = Loadable(lazy(() => import('views/application/e-commerce/ProductDetails')));
const AppECommProductList = Loadable(lazy(() => import('views/application/e-commerce/ProductList')));
const AppECommCheckout = Loadable(lazy(() => import('views/application/e-commerce/Checkout')));

// forms component routing
const FrmComponentsTextfield = Loadable(lazy(() => import('views/forms/components/TextField')));
const FrmComponentsButton = Loadable(lazy(() => import('views/forms/components/Button')));
const FrmComponentsCheckbox = Loadable(lazy(() => import('views/forms/components/Checkbox')));
const FrmComponentsRadio = Loadable(lazy(() => import('views/forms/components/Radio')));
const FrmComponentsSwitch = Loadable(lazy(() => import('views/forms/components/Switch')));
const FrmComponentsAutoComplete = Loadable(lazy(() => import('views/forms/components/AutoComplete')));
const FrmComponentsSlider = Loadable(lazy(() => import('views/forms/components/Slider')));
const FrmComponentsDateTime = Loadable(lazy(() => import('views/forms/components/DateTime')));

// forms plugins layout
const FrmLayoutLayout = Loadable(lazy(() => import('views/forms/layouts/Layouts')));
const FrmLayoutMultiColumnForms = Loadable(lazy(() => import('views/forms/layouts/MultiColumnForms')));
const FrmLayoutActionBar = Loadable(lazy(() => import('views/forms/layouts/ActionBar')));
const FrmLayoutStickyActionBar = Loadable(lazy(() => import('views/forms/layouts/StickyActionBar')));

// forms plugins routing
const FrmAutocomplete = Loadable(lazy(() => import('views/forms/plugins/AutoComplete')));
const FrmMask = Loadable(lazy(() => import('views/forms/plugins/Mask')));
const FrmClipboard = Loadable(lazy(() => import('views/forms/plugins/Clipboard')));
const FrmRecaptcha = Loadable(lazy(() => import('views/forms/plugins/Recaptcha')));
const FrmWysiwugEditor = Loadable(lazy(() => import('views/forms/plugins/WysiwugEditor')));
const FrmModal = Loadable(lazy(() => import('views/forms/plugins/Modal')));
const FrmTooltip = Loadable(lazy(() => import('views/forms/plugins/Tooltip')));

// table routing
const TableBasic = Loadable(lazy(() => import('views/forms/tables/TableBasic')));
const TableDense = Loadable(lazy(() => import('views/forms/tables/TableDense')));
const TableEnhanced = Loadable(lazy(() => import('views/forms/tables/TableEnhanced')));
const TableData = Loadable(lazy(() => import('views/forms/tables/TableData')));
const TableCustomized = Loadable(lazy(() => import('views/forms/tables/TablesCustomized')));
const TableStickyHead = Loadable(lazy(() => import('views/forms/tables/TableStickyHead')));
const TableCollapsible = Loadable(lazy(() => import('views/forms/tables/TableCollapsible')));

// forms validation
const FrmFormsValidation = Loadable(lazy(() => import('views/forms/forms-validation')));
const FrmFormsWizard = Loadable(lazy(() => import('views/forms/forms-wizard')));

// chart routing
const ChartApexchart = Loadable(lazy(() => import('views/forms/chart/Apexchart')));

// basic ui-elements routing
const BasicUIAccordion = Loadable(lazy(() => import('views/ui-elements/basic/UIAccordion')));
const BasicUIAvatar = Loadable(lazy(() => import('views/ui-elements/basic/UIAvatar')));
const BasicUIBadges = Loadable(lazy(() => import('views/ui-elements/basic/UIBadges')));
const BasicUIBreadcrumb = Loadable(lazy(() => import('views/ui-elements/basic/UIBreadcrumb')));
const BasicUICards = Loadable(lazy(() => import('views/ui-elements/basic/UICards')));
const BasicUIChip = Loadable(lazy(() => import('views/ui-elements/basic/UIChip')));
const BasicUIList = Loadable(lazy(() => import('views/ui-elements/basic/UIList')));
const BasicUITabs = Loadable(lazy(() => import('views/ui-elements/basic/UITabs')));

// advance ui-elements routing
const AdvanceUIAlert = Loadable(lazy(() => import('views/ui-elements/advance/UIAlert')));
const AdvanceUIDialog = Loadable(lazy(() => import('views/ui-elements/advance/UIDialog')));
const AdvanceUIPagination = Loadable(lazy(() => import('views/ui-elements/advance/UIPagination')));
const AdvanceUIProgress = Loadable(lazy(() => import('views/ui-elements/advance/UIProgress')));
const AdvanceUIRating = Loadable(lazy(() => import('views/ui-elements/advance/UIRating')));
const AdvanceUISnackbar = Loadable(lazy(() => import('views/ui-elements/advance/UISnackbar')));
const AdvanceUISkeleton = Loadable(lazy(() => import('views/ui-elements/advance/UISkeleton')));
const AdvanceUISpeeddial = Loadable(lazy(() => import('views/ui-elements/advance/UISpeeddial')));
const AdvanceUITimeline = Loadable(lazy(() => import('views/ui-elements/advance/UITimeline')));
const AdvanceUIToggleButton = Loadable(lazy(() => import('views/ui-elements/advance/UIToggleButton')));
const AdvanceUITreeview = Loadable(lazy(() => import('views/ui-elements/advance/UITreeview')));

// pricing page routing
const PagesPrice1 = Loadable(lazy(() => import('views/pages/pricing/Price1')));
const PagesPrice2 = Loadable(lazy(() => import('views/pages/pricing/Price2')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const UtilsAnimation = Loadable(lazy(() => import('views/utilities/Animation')));
const UtilsGrid = Loadable(lazy(() => import('views/utilities/Grid')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const OverviewPage = Loadable(lazy(() => import('views/overview')));
const DesignThemePage = Loadable(lazy(() => import('views/design/Theme')));
const UtilsColorPalette = Loadable(lazy(() => import('views/utilities/ColorPalette')));

const BrandPage = Loadable(lazy(() => import('views/brand')));
const TemplatePage = Loadable(lazy(() => import('views/template')));
const FeaturesPage = Loadable(lazy(() => import('views/features')));
const BlockchainPage = Loadable(lazy(() => import('views/blockchain')));
const BackendPage = Loadable(lazy(() => import('views/backend')));

const NewsPage = Loadable(lazy(() => import('views/announcements')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/studio',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/studio/widget/statistics',
            element: <WidgetStatistics />
        },
        {
            path: '/studio/widget/data',
            element: <WidgetData />
        },
        {
            path: '/studio/widget/chart',
            element: <WidgetChart />
        },

        {
            path: '/studio/user/social-profile/:tab',
            element: <AppUserSocialProfile />
        },
        {
            path: '/studio/user/account-profile/profile1',
            element: <AppUserAccountProfile1 />
        },
        {
            path: '/studio/user/account-profile/profile2',
            element: <AppUserAccountProfile2 />
        },
        {
            path: '/studio/user/account-profile/profile3',
            element: <AppUserAccountProfile3 />
        },

        {
            path: '/studio/user/card/card1',
            element: <AppProfileCardStyle1 />
        },
        {
            path: '/studio/user/card/card2',
            element: <AppProfileCardStyle2 />
        },
        {
            path: '/studio/user/card/card3',
            element: <AppProfileCardStyle3 />
        },
        {
            path: '/studio/user/list/list1',
            element: <AppProfileListStyle1 />
        },
        {
            path: '/studio/user/list/list2',
            element: <AppProfileListStyle2 />
        },

        {
            path: '/studio/customer/customer-list',
            element: <AppCustomerList />
        },
        {
            path: '/studio/customer/order-list',
            element: <AppCustomerOrderList />
        },
        {
            path: '/studio/customer/order-details',
            element: <AppCustomerOrderDetails />
        },
        {
            path: '/studio/customer/product',
            element: <AppCustomerProduct />
        },
        {
            path: '/studio/customer/product-review',
            element: <AppCustomerProductReview />
        },

        {
            path: '/studio/app/chat',
            element: <AppChat />
        },
        {
            path: '/studio/app/mail',
            element: <AppMail />
        },
        {
            path: '/studio/app/kanban',
            element: <AppKanban />
        },
        {
            path: '/studio/app/contact/c-card',
            element: <AppContactCard />
        },
        {
            path: '/studio/app/contact/c-list',
            element: <AppContactList />
        },

        {
            path: '/studio/e-commerce/products',
            element: <AppECommProducts />
        },
        {
            path: '/studio/e-commerce/product-details/:id',
            element: <AppECommProductDetails />
        },
        {
            path: '/studio/e-commerce/product-list',
            element: <AppECommProductList />
        },
        {
            path: '/studio/e-commerce/checkout',
            element: <AppECommCheckout />
        },

        {
            path: '/studio/components/text-field',
            element: <FrmComponentsTextfield />
        },
        {
            path: '/studio/components/button',
            element: <FrmComponentsButton />
        },
        {
            path: '/studio/components/checkbox',
            element: <FrmComponentsCheckbox />
        },
        {
            path: '/studio/components/radio',
            element: <FrmComponentsRadio />
        },
        {
            path: '/studio/components/autocomplete',
            element: <FrmComponentsAutoComplete />
        },
        {
            path: '/studio/components/slider',
            element: <FrmComponentsSlider />
        },
        {
            path: '/studio/components/switch',
            element: <FrmComponentsSwitch />
        },
        {
            path: '/studio/components/date-time',
            element: <FrmComponentsDateTime />
        },

        {
            path: '/studio/forms/layouts/layouts',
            element: <FrmLayoutLayout />
        },
        {
            path: '/studio/forms/layouts/multi-column-forms',
            element: <FrmLayoutMultiColumnForms />
        },
        {
            path: '/studio/forms/layouts/action-bar',
            element: <FrmLayoutActionBar />
        },
        {
            path: '/studio/forms/layouts/sticky-action-bar',
            element: <FrmLayoutStickyActionBar />
        },

        {
            path: '/studio/forms/frm-autocomplete',
            element: <FrmAutocomplete />
        },
        {
            path: '/studio/forms/frm-mask',
            element: <FrmMask />
        },
        {
            path: '/studio/forms/frm-clipboard',
            element: <FrmClipboard />
        },
        {
            path: '/studio/forms/frm-recaptcha',
            element: <FrmRecaptcha />
        },
        {
            path: '/studio/forms/frm-wysiwug',
            element: <FrmWysiwugEditor />
        },
        {
            path: '/studio/forms/frm-modal',
            element: <FrmModal />
        },
        {
            path: '/studio/forms/frm-tooltip',
            element: <FrmTooltip />
        },

        {
            path: '/studio/tables/tbl-basic',
            element: <TableBasic />
        },
        {
            path: '/studio/tables/tbl-dense',
            element: <TableDense />
        },
        {
            path: '/studio/tables/tbl-enhanced',
            element: <TableEnhanced />
        },
        {
            path: '/studio/tables/tbl-data',
            element: <TableData />
        },
        {
            path: '/studio/tables/tbl-customized',
            element: <TableCustomized />
        },
        {
            path: '/studio/tables/tbl-sticky-header',
            element: <TableStickyHead />
        },
        {
            path: '/studio/tables/tbl-collapse',
            element: <TableCollapsible />
        },

        {
            path: '/studio/chart/apexchart',
            element: <ChartApexchart />
        },
        {
            path: '/studio/forms/forms-validation',
            element: <FrmFormsValidation />
        },
        {
            path: '/studio/forms/forms-wizard',
            element: <FrmFormsWizard />
        },

        {
            path: '/studio/basic/accordion',
            element: <BasicUIAccordion />
        },
        {
            path: '/studio/basic/avatar',
            element: <BasicUIAvatar />
        },
        {
            path: '/studio/basic/badges',
            element: <BasicUIBadges />
        },
        {
            path: '/studio/basic/breadcrumb',
            element: <BasicUIBreadcrumb />
        },
        {
            path: '/studio/basic/cards',
            element: <BasicUICards />
        },
        {
            path: '/studio/basic/chip',
            element: <BasicUIChip />
        },
        {
            path: '/studio/basic/list',
            element: <BasicUIList />
        },
        {
            path: '/studio/basic/tabs',
            element: <BasicUITabs />
        },

        {
            path: '/studio/advance/alert',
            element: <AdvanceUIAlert />
        },
        {
            path: '/studio/advance/dialog',
            element: <AdvanceUIDialog />
        },
        {
            path: '/studio/advance/pagination',
            element: <AdvanceUIPagination />
        },
        {
            path: '/studio/advance/progress',
            element: <AdvanceUIProgress />
        },
        {
            path: '/studio/advance/rating',
            element: <AdvanceUIRating />
        },
        {
            path: '/studio/advance/snackbar',
            element: <AdvanceUISnackbar />
        },
        {
            path: '/studio/advance/skeleton',
            element: <AdvanceUISkeleton />
        },
        {
            path: '/studio/advance/speeddial',
            element: <AdvanceUISpeeddial />
        },
        {
            path: '/studio/advance/timeline',
            element: <AdvanceUITimeline />
        },
        {
            path: '/studio/advance/toggle-button',
            element: <AdvanceUIToggleButton />
        },
        {
            path: '/studio/advance/treeview',
            element: <AdvanceUITreeview />
        },

        {
            path: '/studio/pages/price/price1',
            element: <PagesPrice1 />
        },
        {
            path: '/studio/pages/price/price2',
            element: <PagesPrice2 />
        },

        {
            path: '/studio/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/studio/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/studio/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/studio/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/studio/utils/util-animation',
            element: <UtilsAnimation />
        },
        {
            path: '/studio/utils/util-grid',
            element: <UtilsGrid />
        },
        // {
        //     path: '/studio/overview',
        //     element: <ApplicationPage />
        // },
        {
            path: '/studio/dashboard',
            element: <DashboardAnalytics />
        },
        {
            path: '/studio/overview',
            element: <OverviewPage />
        },
        {
            path: '/studio/theme',
            element: <BrandPage />
        },
        {
            path: '/studio/localization',
            element: <TemplatePage />
        },
        {
            path: '/studio/features',
            element: <FeaturesPage />
        },
        {
            path: '/studio/blockchain',
            element: <BlockchainPage />
        },
        {
            path: '/studio/backend',
            element: <BackendPage />
        },
        {
            path: '/studio/news',
            element: <NewsPage />
        }
    ]
};

export default MainRoutes;
