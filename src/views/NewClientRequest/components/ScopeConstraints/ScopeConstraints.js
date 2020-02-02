import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ScopeConstraints = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  

  const lines = [
    {
      value: 'na',
      label: 'NA'
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader=""
          title="Scoping Constraints"
        />
        <Divider />
        <CardContent>
        <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={6}
            >
              <FormControlLabel
                control={
                  <Checkbox value="checkedA" />
                }
                label="Confines Space Entry (CSE) Required?"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <FormControlLabel
                control={
                  <Checkbox value="checkedA" />
                }
                label="Isolations and/or Permits required for access?"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <FormControlLabel
                control={
                  <Checkbox value="checkedA" />
                }
                label="Working at Heights (WAH) Required?"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <FormControlLabel
                control={
                  <Checkbox value="checkedA" />
                }
                label="Scaffold required for access?"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <FormControlLabel
                control={
                  <Checkbox value="checkedA" checked="true" />
                }
                label="Piping needs to be Surveyed?"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <FormControlLabel
                control={
                  <Checkbox value="checkedA" checked="true" />
                }
                label="3D Laser Scanning Required?"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <FormControlLabel
                control={
                  <Checkbox value="checkedA" />
                }
                label="Notification required to scope."
              />
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

ScopeConstraints.propTypes = {
  className: PropTypes.string
};

export default ScopeConstraints;
