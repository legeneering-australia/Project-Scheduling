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

const PipingChecklist = props => {
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
          title="Tie In Points"
        />
        <Divider />
        <CardActions>
          <Grid
            container
            xs={12}
            >
              <Grid
                item
                xs={9}
                >
                </Grid>
              <Grid
                item
                xs={3}
                >
                <Button
                  color="primary"
                  variant="contained"
                >
                  Insert Tie In Points
                </Button>
              </Grid>
          </Grid>
        </CardActions>
      </form>
    </Card>
  );
};

PipingChecklist.propTypes = {
  className: PropTypes.string
};

export default PipingChecklist;
