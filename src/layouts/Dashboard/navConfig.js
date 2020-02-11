/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';

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
        title: 'Campaigns',
        href: '/campaigns',
        icon: ListIcon,
        items: [
          {
            title: 'Browse',
            href: '/campaigns'
          },
          {
            title: 'Maintenance',
            href: '/campaigns/maintenance',
            icon: SettingsIcon,
            items: [
              {
                title: 'Campaign Templates',
                href: '/campaigns/maintenance/templates'
              }
            ]
          }
        ]
      },
      {
        title: 'Projects',
        href: '/projects',
        icon: ListAltIcon,
        items: [
          {
            title: 'Browse',
            href: '/projects'
          }
        ]
      }
    ]
  }
];
