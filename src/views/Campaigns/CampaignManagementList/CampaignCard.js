import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Link,
  Typography,
  colors
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap'
    },
    '&:last-child': {
      paddingBottom: theme.spacing(2)
    }
  },
  header: {
    maxWidth: '100%',
    width: 240,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
      flexBasis: '100%'
    }
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  stats: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  },
  actions: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  }
}));

function CampaignCard({ campaign, className, ...rest }) {
  const classes = useStyles();

  const statusColors = {
    'In progress': colors.orange[600],
    Canceled: colors.grey[600],
    Completed: colors.green[600]
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <div>
            <Link
              color="textPrimary"
              component={RouterLink}
              noWrap
              to="#"
              variant="h5"
            >
              {campaign.title}
            </Link>
            <Typography variant="body2">
              Client
              {' '}
              <Link
                color="textPrimary"
                component={RouterLink}
                to="/management/customers/1"
                variant="h6"
              >
                {campaign.author.name}
              </Link>
            </Typography>
          </div>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {campaign.currency}
            {campaign.price}
          </Typography>
          <Typography variant="body2">Campaign Value</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{campaign.members}</Typography>
          <Typography variant="body2">Projects</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {moment(campaign.start_date).format('DD MMMM YYYY')}
          </Typography>
          <Typography variant="body2">Campaign Started</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {moment(campaign.execute_date).format('DD MMMM YYYY')}
          </Typography>
          <Typography variant="body2">Campaign Execution</Typography>
        </div>
        <div className={classes.stats}>
          <Typography
            style={{ color: statusColors[campaign.status] }}
            variant="h6"
          >
            {campaign.status}
          </Typography>
          <Typography variant="body2">Campaign Status</Typography>
        </div>
        <div className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="outlined"
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

CampaignCard.propTypes = {
  className: PropTypes.string,
  campaigns: PropTypes.object.isRequired
};

export default CampaignCard;
