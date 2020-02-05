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
import { DatePicker } from '@material-ui/pickers';
import Alert from 'src/components/Alert';

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
  const [calendarTrigger, setCalendarTrigger] = useState(null);
  const calendarOpen = Boolean(calendarTrigger);
  const calendarMinDate = calendarTrigger === 'startDate'
    ? moment()
    : moment(values.startDate).add(1, 'day');
  const calendarValue = values[calendarTrigger];

  const handleCalendarOpen = (trigger) => {
    setCalendarTrigger(trigger);
  };

  const handleCalendarChange = () => {};

  const handleCalendarAccept = (date) => {
    setValues((prevValues) => ({
      ...prevValues,
      [calendarTrigger]: date
    }));
  };

  const handleCalendarClose = () => {
    setCalendarTrigger(false);
  };

  const handleFieldChange = (event, field, value) => {
    event.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }));
  };

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
      <CardHeader title="Project Info" />
      <CardContent>
        <form>
          <Alert
            className={classes.alert}
            message="Once you choose the project name you can’t change it unless you use M1."
          />
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
                label="Project ID"
                margin="dense"
                name="id"
                disabled
                required
                // eslint-disable-next-line react/jsx-sort-props
                value={values.client}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={9}
            >
              <TextField
                fullWidth
                label="Project Name"
                margin="dense"
                name="name"
                required
                // eslint-disable-next-line react/jsx-sort-props
                value={values.asset}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={3}
            >
              <TextField
                fullWidth
                label="Project Type"
                margin="dense"
                name="type"
                required
                // eslint-disable-next-line react/jsx-sort-props
                value={values.asset}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={3}
            >
              <TextField
                fullWidth
                helperText=""
                label="Project Manager"
                margin="dense"
                name="manager"
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={3}
            >
            <TextField
              fullWidth
              margin="dense"
              label="Start Date"
              name="startDate"
              onClick={() => handleCalendarOpen('startDate')}
              value={moment().format('DD/MM/YYYY')}
              variant="outlined"
            />
            </Grid>
            <Grid
              item
              xs={3}
            >
            <TextField
              fullWidth
              margin="dense"
              label="End Date"
              name="endDate"
              onClick={() => handleCalendarOpen('endDate')}
              value={moment().format('DD/MM/YYYY')}
              variant="outlined"
            />
            </Grid>
            <Grid
              item
              xs={3}
            >
              <TextField
                fullWidth
                label="Campaign"
                margin="dense"
                name="campaign"
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.asset}
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
        </form>
      </CardContent>
      <DatePicker
        minDate={calendarMinDate}
        onAccept={handleCalendarAccept}
        onChange={handleCalendarChange}
        onClose={handleCalendarClose}
        open={calendarOpen}
        style={{ display: 'none' }} // Hide the input element
        value={calendarValue}
        variant="dialog"
      />
    </Card>
  );
}

AboutProject.propTypes = {
  className: PropTypes.string
};

export default AboutProject;
