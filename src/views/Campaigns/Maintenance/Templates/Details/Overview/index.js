import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  deliverables: {
    marginTop: theme.spacing(3)
  },
  members: {
    marginTop: theme.spacing(3)
  }
}));

function Overview({ template, className, ...rest }) {
  const classes = useStyles();

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid
        item
        lg={8}
        xl={9}
        xs={12}
      >
      </Grid>
      <Grid
        item
        lg={4}
        xl={3}
        xs={12}
      >
      </Grid>
    </Grid>
  );
}

Overview.propTypes = {
  className: PropTypes.string,
  template: PropTypes.object.isRequired
};

export default Overview;
