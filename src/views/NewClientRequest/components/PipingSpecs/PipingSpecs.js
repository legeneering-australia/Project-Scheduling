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

const PipingSpecs = props => {
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
          title="Scope Details"
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
              <TextField
                fullWidth
                helperText=""
                label="Noti Number"
                margin="dense"
                name="wrNumber"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                fullWidth
                label="Line Number"
                margin="dense"
                name="line"
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value=""
                variant="outlined"
              >
                {lines.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                fullWidth
                helperText=""
                label="Floc Number"
                margin="dense"
                name="wrNumber"
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                fullWidth
                helperText=""
                label="Floc Description"
                margin="dense"
                name="wrNumber"
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                fullWidth
                helperText=""
                label="Inspection Report - DRIMS Number"
                margin="dense"
                name="wrNumber"
                variant="outlined"
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
                label="Class Required"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                id="outlined-multiline-static"
                fullWidth
                label="Scope Description"
                multiline
                rows="4"
                defaultValue=""
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                id="outlined-multiline-static"
                fullWidth
                label="Desired Outcomes"
                multiline
                rows="4"
                defaultValue=""
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="text"
          >
            Upload Relevant Documents
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

PipingSpecs.propTypes = {
  className: PropTypes.string
};

export default PipingSpecs;
