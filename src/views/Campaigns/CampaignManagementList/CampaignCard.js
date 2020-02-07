import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardContent,
  Link,
  Typography,
  colors,
  Grid
} from '@material-ui/core';

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
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={2}
          >
            <Link
              color="textPrimary"
              component={RouterLink}
              to={"/campaigns/details/"+campaign.id+"/overview"}
              variant="h5"
            >
              {campaign.name}
            </Link>
            <Typography variant="body2">
              {campaign.clientName}
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography variant="h6">
              $
              {campaign.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </Typography>
            <Typography variant="body2">Campaign Value</Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography variant="h6">
              {moment(campaign.execDate).format('DD MMMM YYYY')}
            </Typography>
            <Typography variant="body2">Execution Date</Typography>
          </Grid>
          <Grid
            item
            xs={1}
          >
            <Typography variant="h6">
              {campaign.currentPhase}
            </Typography>
            <Typography variant="body2">Current Phase</Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography variant="h6">
              {campaign.upcomingMilestone}
            </Typography>
            <Typography variant="body2">Upcoming Milestone</Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography variant="h6">
              {moment(campaign.dueDate).format('DD MMMM YYYY')}
            </Typography>
            <Typography variant="body2">Milestone Deadline</Typography>
          </Grid>
          <Grid
            item
            xs={1}
          >
            <Typography variant="h6">
              {campaign.delta}
            </Typography>
          <Typography variant="body2">{campaign.delta > 0 ? 'Days Ahead' : 'Days Behind'}</Typography>
          </Grid>
        </Grid>
        <div className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            component={RouterLink}
            to={"/campaigns/details/"+campaign.id+"/overview"}
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
  campaign: PropTypes.object.isRequired
};

export default CampaignCard;
