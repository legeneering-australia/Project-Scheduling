import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Button } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import AboutAuthor from './AboutAuthor';
import AboutProject from './AboutProject';
import Preferences from './Preferences';
import ProjectCover from './ProjectCover';
import ProjectDetails from './ProjectDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  aboutAuthor: {
    marginTop: theme.spacing(3)
  },
  aboutProject: {
    marginTop: theme.spacing(3)
  },
  projectCover: {
    marginTop: theme.spacing(3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  preferences: {
    marginTop: theme.spacing(3)
  },
  actions: {
    marginTop: theme.spacing(3)
  }
}));

function ProjectCreate() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Project Create"
    >
      <Container maxWidth="lg">
        <Header />
        <AboutProject className={classes.aboutProject} />
        <ProjectDetails className={classes.projectDetails} />
        <div className={classes.actions}>
          <Button
            color="primary"
            variant="contained"
          >
            Create project
          </Button>
        </div>
      </Container>
    </Page>
  );
}

export default ProjectCreate;
