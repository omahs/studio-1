import { lazy } from "react";
import { useRoutes } from "react-router-dom";

// routes
import BuilderRoutes from "routes/BuilderRoutes";
import Loadable from "ui-component/Loadable";
import MainLayout from "layout/MainLayout";
import ProfileGuard from "utils/route-guard/ProfileGuard";

const NewProject = Loadable(lazy(() => import("views/new")));
const PagesLanding = Loadable(lazy(() => import("views/landing")));
const ResourcesPage = Loadable(lazy(() => import("views/resources")));
const FaqPage = Loadable(lazy(() => import("views/faq")));
const ProjectsPage = Loadable(lazy(() => import("views/projects")));
const CasesPage = Loadable(lazy(() => import("views/cases")));
const MarketplacePage = Loadable(lazy(() => import("views/marketplace")));
const PublicProfile = Loadable(lazy(() => import("views/profile/public")));
const ProfileAdmin = Loadable(lazy(() => import("views/profile/admin")));
const Signin = Loadable(lazy(() => import("views/signin")));
const ProjectsView = Loadable(
	lazy(() => import("views/profile/admin/projects"))
);
const ProfileView = Loadable(lazy(() => import("views/profile/admin/user")));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
	return useRoutes([
		{ path: "/", element: <PagesLanding /> },
		{ path: "/cases", element: <CasesPage /> },
		{ path: "/faq", element: <FaqPage /> },
		{ path: "/templates", element: <MarketplacePage /> },
		{ path: "/resources", element: <ResourcesPage /> },
		{ path: "/projects", element: <ProjectsPage /> },
		{ path: "/signin", element: <Signin /> },
		{ path: "/new", element: <NewProject /> },
		{ path: "/:id", element: <PublicProfile /> },
		{
			path: "/profile",
			element: (
				<ProfileGuard>
					<ProfileAdmin />
				</ProfileGuard>
			),
			children: [
				{
					path: "/profile/admin",
					element: <ProfileView />
				},
				{
					path: "/profile/projects",
					element: <ProjectsView />
				}
			]
		},
		BuilderRoutes
	]);
}
