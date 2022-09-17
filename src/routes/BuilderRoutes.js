import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import AuthGuard from "utils/route-guard/AuthGuard";

// sample page routing
const OverviewPage = Loadable(lazy(() => import("views/overview")));
const ThemePage = Loadable(lazy(() => import("views/brand")));
const UsersPage = Loadable(lazy(() => import("views/users")));
const TransactionsPage = Loadable(lazy(() => import("views/transactions")));
const TemplatesPage = Loadable(lazy(() => import("views/templates")));
const TemplatesItemPage = Loadable(lazy(() => import("views/templates/Item")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: "/studio",
	element: (
		<AuthGuard>
			<MainLayout />
		</AuthGuard>
	),
	children: [
		{
			path: "/studio/users",
			element: <UsersPage />
		},
		{
			path: "/studio/transactions",
			element: <TransactionsPage />
		},
		{
			path: "/studio/templates",
			element: <TemplatesPage />
		},
		{
			path: "/studio/templates/:id",
			element: <TemplatesItemPage />
		},
		{
			path: "/studio/overview",
			element: <OverviewPage />
		},
		{
			path: "/studio/theme",
			element: <ThemePage />
		}
	]
};

export default MainRoutes;
