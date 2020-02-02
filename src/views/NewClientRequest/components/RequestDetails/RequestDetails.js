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

const RequestDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'Shen',
    lastName: 'Zhi',
    email: 'shen.zhi@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const assets = [
    {
      value: 'none',
      label: 'None'
    },
    {
      value: 'okha',
      label: 'OKHA FPSO'
    },
    {
      value: 'ny',
      label: 'Ngujima-Yin FPSO'
    }
  ];

  const campaigns = [
    {
      value: 'none',
      label: 'None'
    },
    {
      value: 'OKCR2004',
      label: 'OKCR2004'
    },
    {
      value: 'OKCR2005',
      label: 'OKCR2005'
    },
    {
      value: 'OKCR2006',
      label: 'OKCR2006'
    },
    {
      value: 'OKCR2009',
      label: 'OKCR2009'
    },
    {
      value: 'OKCR2010',
      label: 'OKCR2010'
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
          title="Request Details"
        />
        <Divider />
        <CardContent>
        <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText=""
                label="Work Request Number"
                margin="dense"
                name="wrNumber"
                onChange={handleChange}
                required
                disabled="true"
                value="WEL1032"
                variant="outlined"
              />
            </Grid>
          </Grid>
        <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                helperText=""
                label="Work Order Number"
                margin="dense"
                name="wrNumber"
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Brief description of the Work Request"
                label="Description"
                margin="dense"
                name="description"
                onChange={handleChange}
                required
                value={values.description}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Asset"
                margin="dense"
                name="asset"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.asset}
                variant="outlined"
              >
                {assets.map(option => (
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
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Campaign"
                margin="dense"
                name="campaign"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.campaign}
                variant="outlined"
              >
                {campaigns.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
          >
            Submit Request
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

RequestDetails.propTypes = {
  className: PropTypes.string
};

export default RequestDetails;
