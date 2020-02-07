import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Tabs,
  Tab,
  Divider,
  colors,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import Header from './Header';
import Overview from './Overview';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  alert: {
    marginTop: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(3)
  },
  label: {
    marginTop: theme.spacing(1)
  },
  shareButton: {
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(2)
  },
  shareIcon: {
    marginRight: theme.spacing(1)
  },
  applyButton: {
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

function ProjectDetails({ match, history }) {
  const classes = useStyles();
  const { id, tab } = match.params;
  const [project, setProject] = useState(null);
  const [overviewValues, setOverviewValues] = useState({});
  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'costs', label: 'Costs' },
    { value: 'jobs', label: 'Jobs' }
  ];

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  useEffect(() => {
    let mounted = true;

    const fetchProject = () => {
      axios.get('/projects/details/?id=' + id).then((response) => {
        if (mounted) {
          setProject(response.data);
        }
      });
    };

    fetchProject();

    return () => {
      mounted = false;
    };
  }, []);

  if (!tab) {
    return <Redirect to={`/projects/${id}/overview`} />;
  }

  if (!tabs.find((t) => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }

  if (!project) {
    return null;
  }

  const handleOverviewChange = data => {
      setOverviewValues(data);
  }

  const handleUpdateProject = () => {
    if (Object.entries(overviewValues).length !== 0)
    {
      axios.post('/projects/updatedetails', overviewValues).then((response) => {
        console.log(response.data);
      }).catch(error => {
        console.log(error)
      });
    }
  }

  /*
          {tab === 'files' && <Files files={[]} />}
          {tab === 'activity' && <Activities activities={[]} />}
          {tab === 'subscribers' && (
            <Subscribers subscribers={[]} />
          )}*/

  return (
    <Page
      className={classes.root}
      title="Project Details"
    >
      <Container maxWidth="lg">
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Project Details
          </Typography>
          <Typography
            component="h1"
            gutterBottom
            variant="h3"
          >
            {project[0].id + ' - ' + project[0].name}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            className={classes.applyButton}
            variant="contained"
            onClick={handleUpdateProject}
          >
            Update Project
          </Button>
        </Grid>
      </Grid>
        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={tab}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {tab === 'overview' && <Overview project={project[0]} onSubmit={handleOverviewChange} />}
        </div>
      </Container>
    </Page>
  );
}

ProjectDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default ProjectDetails;
