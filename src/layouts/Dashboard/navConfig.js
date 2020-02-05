/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListIcon from '@material-ui/icons/List';

export default [
  {
    subheader: 'Pages',
    items: [
      {
        title: 'Overview',
        href: '/overview',
        icon: HomeIcon
      },
      {
        title: 'Dashboards',
        href: '/dashboards',
        icon: DashboardIcon,
        items: [
          {
            title: 'Default',
            href: '/dashboards/default'
          },
          {
            title: 'Analytics',
            href: '/dashboards/analytics'
          }
        ]
      },
      {
        title: 'Campaigns',
        href: '/campaigns',
        icon: ListIcon,
        items: [
          {
            title: 'Overview',
            href: '/campaigns/overview'
          },
          {
            title: 'Browse',
            href: '/campaigns'
          },
        ]
      },
      {
        title: 'Projects',
        href: '/projects',
        icon: ListAltIcon,
        items: [
          {
            title: 'Overview',
            href: '/projects/overview'
          },
          {
            title: 'Browse',
            href: '/projects'
          },
        ]
      },
      {
        title: 'Calendar',
        href: '/calendar',
        icon: CalendarTodayIcon,
      }
    ]
  }
];
