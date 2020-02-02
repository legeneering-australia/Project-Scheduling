import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { RequestDetails, RequirementDetails, ScopeDetails, ScopeConstraints, PipingChecklist, FabricationDetails } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const NewClientRequest = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          xs={4}
        >
          <RequestDetails />
        </Grid>
        <Grid
          item
          xs={8}
          container
          spacing={3}
          direction="column"
        >
          <Grid
            item
          >
            <RequirementDetails />
          </Grid>
          <Grid
            item
          >
            <ScopeDetails />
          </Grid>
          <Grid
            item
          >
            <ScopeConstraints />
          </Grid>
          <Grid
            item
          >
            <PipingChecklist />
          </Grid>
          <Grid
            item
          >
            <FabricationDetails />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewClientRequest;
