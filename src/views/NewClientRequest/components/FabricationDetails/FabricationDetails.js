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
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const FabricationDetails = props => {
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
          subheader=""
          title="Fabrication Requirements"
        />
        <Divider />
        <CardContent>
        <Grid
            container
            spacing={3}
          >
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

FabricationDetails.propTypes = {
  className: PropTypes.string
};

export default FabricationDetails;
