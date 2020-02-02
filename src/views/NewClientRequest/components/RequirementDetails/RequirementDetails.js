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

const RequirementDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

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
          subheader="Items required from Legeneering"
          title="Work Requirements"
        />
        <Divider />
        <CardContent>
        <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={2}
            >
              <FormControlLabel
                control={
                  <Checkbox value="checkedA" checked="true" />
                }
                label="Scope of Work"
              />
            </Grid>
            <Grid
              item
              xs={2}
            >
              <FormControlLabel
                control={
                  <Checkbox value="checkedA" checked="true" />
                }
                label="Design"
              />
            </Grid>
            <Grid
              item
              xs={2}
            >
              <FormControlLabel
                control={
                  <Checkbox value="checkedA" checked="true" />
                }
                label="Engineering"
              />
            </Grid>
            <Grid
              item
              xs={2}
            >
              <FormControlLabel
                control={
                  <Checkbox value="checkedA" checked="true" />
                }
                label="Fabrication"
              />
            </Grid>
            <Grid
              item
              xs={2}
            >
              <FormControlLabel
                control={
                  <Checkbox value="checkedA" checked="true" />
                }
                label="Workpack"
              />
            </Grid>
            <Grid
              item
              xs={2}
            >
              <FormControlLabel
                control={
                  <Checkbox value="checkedA" checked="true" />
                }
                label="Installation"
              />
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

RequirementDetails.propTypes = {
  className: PropTypes.string
};

export default RequirementDetails;
