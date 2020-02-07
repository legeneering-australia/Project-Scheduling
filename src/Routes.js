/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';
import DashboardAnalyticsView from './views/DashboardAnalytics';
import DashboardDefaultView from './views/DashboardDefault';
import OverviewView from './views/Overview';

export default [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/auth/login" />
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('src/views/Login'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('src/views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('src/views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('src/views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/campaigns',
        exact: true,
        component: lazy(() => import('src/views/Campaigns/CampaignManagementList'))
      },
      {
        path: '/campaigns/create',
        exact: true,
        component: lazy(() => import('src/views/Campaigns/CampaignCreate'))
      },
      {
        path: '/campaigns/details/:id/:tab',
        exact: true,
        component: lazy(() => import('src/views/Campaigns/CampaignDetails'))
      },
      {
        path: '/campaigns/overview',
        exact: true,
        component: OverviewView
      },
      {
        path: '/projects',
        exact: true,
        component: lazy(() => import('src/views/Projects/ProjectManagementList'))
      },
      {
        path: '/projects/create',
        exact: true,
        component: lazy(() => import('src/views/Projects/ProjectCreate'))
      },
      {
        path: '/projects/details/:id/:tab',
        exact: true,
        component: lazy(() => import('src/views/Projects/ProjectDetails'))
      },
      {
        path: '/projects/overview',
        exact: true,
        component: OverviewView
      },
      {
        path: '/dashboards/analytics',
        exact: true,
        component: DashboardAnalyticsView
      },
      {
        path: '/dashboards/default',
        exact: true,
        component: DashboardDefaultView
      },
      {
        path: '/overview',
        exact: true,
        component: OverviewView
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];
