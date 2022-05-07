import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import Loadable from 'ui-component/Loadable';

const NewProject = Loadable(lazy(() => import('views/new')));
const PagesLanding = Loadable(lazy(() => import('views/landing')));
const ResourcesPage = Loadable(lazy(() => import('views/resources')));
const FaqPage = Loadable(lazy(() => import('views/faq')));
const ProjectsPage = Loadable(lazy(() => import('views/projects')));
const CasesPage = Loadable(lazy(() => import('views/cases')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([
        { path: '/', element: <PagesLanding /> },
        { path: '/cases', element: <CasesPage /> },
        { path: '/faq', element: <FaqPage /> },
        { path: '/resources', element: <ResourcesPage /> },
        { path: '/projects', element: <ProjectsPage /> },
        { path: '/new', element: <NewProject /> },
        MainRoutes
    ]);
}
