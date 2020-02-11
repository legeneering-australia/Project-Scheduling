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

function TemplateCard({ template, className, ...rest }) {
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
            xs={4}
          >
            <Link
              color="textPrimary"
              component={RouterLink}
              to={"/campaigns/maintenance/templates/details/"+template.id+"/overview"}
              variant="h5"
            >
              {template.name}
            </Link>
            <Typography variant="body2">
              {template.clientName}
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography variant="h6">
              {template.milestones}
            </Typography>
            <Typography variant="body2">Milestones</Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography variant="h6">
              {template.creator}
            </Typography>
            <Typography variant="body2">Created By</Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography variant="h6">
              {moment(template.createdDate).format('DD MMMM YYYY')}
            </Typography>
            <Typography variant="body2">Created Date</Typography>
          </Grid>
        </Grid>
        <div className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            component={RouterLink}
            to={"/campaigns/maintenance/templates/details/"+template.id+"/overview"}
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

TemplateCard.propTypes = {
  className: PropTypes.string,
  template: PropTypes.object.isRequired
};

export default TemplateCard;
