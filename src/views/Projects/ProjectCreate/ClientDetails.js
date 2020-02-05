import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  alert: {
    marginBottom: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  fieldHint: {
    margin: theme.spacing(1, 0)
  },
  tags: {
    marginTop: theme.spacing(1),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  flexGrow: {
    flexGrow: 1
  },
  dateField: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const initialValues = {
  name: '',
  tag: '',
  tags: ['Full-Time', 'ReactJS'],
  startDate: moment(),
  endDate: moment().add(1, 'day')
};

function AboutProject({ className, ...rest }) {
  const classes = useStyles();
  const [values, setValues] = useState({ ...initialValues });

  const handleFieldChange = (event, field, value) => {
    event.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }));
  };

  const clients = [
    {
      value: 'none',
      label: 'None'
    },
    {
      value: 'wel',
      label: 'Woodside Energy'
    },
    {
      value: 'bhp',
      label: 'BHP'
    }
  ];

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
      <CardHeader title="Client Details" />
      <CardContent>
        <form>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={3}
            >
              <TextField
                fullWidth
                label="Client"
                name="client"
                required
                select
                margin="dense"
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.client}
                variant="outlined"
              >
                {clients.map(option => (
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
              xs={3}
            >
              <TextField
                fullWidth
                label="Facility"
                name="facility"
                required
                select
                margin="dense"
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
              xs={3}
            >
              <TextField
                fullWidth
                label="Client Contact"
                name="contact"
                required
                select
                margin="dense"
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
              xs={3}
            >
              <TextField
                fullWidth
                helperText=""
                margin="dense"
                label="Client Project Number"
                name="clientProjectNumber"
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

AboutProject.propTypes = {
  className: PropTypes.string
};

export default AboutProject;
