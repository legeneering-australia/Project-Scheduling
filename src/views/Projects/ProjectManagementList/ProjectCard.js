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

function ProjectCard({ project, className, ...rest }) {
  const classes = useStyles();

  const statusColors = {
    'In Progress': colors.orange[600],
    Cancelled: colors.grey[600],
    Completed: colors.green[600],
    Overdue: colors.red[600]
  };

  const activeStatus = project.status === 5 ? 'Inactive' : 'Active'

  const activeColors = {
    Inactive: colors.grey[100]
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      style={{ backgroundColor: activeColors[activeStatus] }}
    >
      <CardContent className={classes.content}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={4}
          >
            <Link
              color="textPrimary"
              component={RouterLink}
              to={"/projects/details/"+project.id+"/overview"}
              variant="h5"
            >
              {project.name}
            </Link>
            <Typography variant="body2">
              {project.id}
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography variant="h6">
              {project.currency}
              {project.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </Typography>
            <Typography variant="body2">Project Value</Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography variant="h6">
              {moment(project.startDate).format('DD MMMM YYYY')}
            </Typography>
            <Typography variant="body2">Project Start</Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography variant="h6">
              {moment(project.endDate).format('DD MMMM YYYY')}
            </Typography>
            <Typography variant="body2">Project Deadline</Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
          <Typography
            style={{ color: statusColors[project.status] }}
            variant="h6"
          >
            {project.statusName}
          </Typography>
          <Typography variant="body2">Project Status</Typography>
          </Grid>
        </Grid>
        <div className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            component={RouterLink}
            to={"/projects/details/"+project.id+"/overview"}
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default ProjectCard;
