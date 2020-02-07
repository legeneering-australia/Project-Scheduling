import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import axios from 'src/utils/axios';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

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

function AboutProject({ project, onSubmit, className, ...rest }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: project.name,
    type: project.type,
    manager: project.manager,
    startDate: project.startDate,
    endDate: project.endDate
  });
  const [types, setTypes] = useState([]);
  const [managers, setProjectManagers] = useState([]);
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

    if (calendarTrigger === 'startDate')
    {

      setValues((prevValues) => ({
        ...prevValues,
        endDate: moment(date).add(1, 'day')
      }));
    }

    setValues((prevValues) => ({
      ...prevValues,
      [calendarTrigger]: date
    }));
  };

  const handleCalendarClose = () => {
    setCalendarTrigger(false);
  };

  useEffect(() => {
    let mounted = true;

    const fetchProjectManagers = () => {
      axios.get('/employees/projectManagers').then((response) => {
        if (mounted) {
          setProjectManagers(response.data);
        }
      }).catch(error => {
        console.log(error)
      });
    };

    const fetchTypes = () => {
      axios.get('/projects/types').then((response) => {
        if (mounted) {
          setTypes(response.data);
        }
      }).catch(error => {
        console.log(error)
      });
    };

    fetchProjectManagers();
    fetchTypes();

    onSubmit(values);

    return () => {
      mounted = false;
    };
  }, []);

  const handleFieldChange = (field, value) => {

    setValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }));

    if (onSubmit) {
      values[field] = value

      onSubmit(values);
    }
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Project Info" />
      <CardContent>
        <form>
          <Grid
            container
            spacing={2}
          >
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
                value={values.name}
                onChange={(event) => handleFieldChange(
                  'name',
                  event.target.value
                )}
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
                margin="dense"
                label="Project Type"
                name="type"
                value={values.type}
                InputLabelProps={{ shrink: !!values.type }}
                variant="outlined"
                required
                onChange={(event) => handleFieldChange(
                  'type',
                  event.target.value
                )}
                select
                SelectProps={{ native: true }}
              >
              <option value=''></option>
              {types.map(option => (
                <option
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
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
                label="Project Manager"
                name="manager"
                value={values.manager}
                InputLabelProps={{ shrink: !!values.manager }}
                variant="outlined"
                required
                onChange={(event) => handleFieldChange(
                  'manager',
                  event.target.value
                )}
                select
                SelectProps={{ native: true }}
              >
              <option value=''></option>
              {managers.map(option => (
                <option
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
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
              margin="dense"
              label="Start Date"
              name="startDate"
              onClick={() => handleCalendarOpen('startDate')}
              value={moment(values.startDate).format('DD/MM/YYYY')}
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
              value={moment(values.endDate).format('DD/MM/YYYY')}
              variant="outlined"
            />
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
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  project: PropTypes.object.isRequired
};

export default AboutProject;
