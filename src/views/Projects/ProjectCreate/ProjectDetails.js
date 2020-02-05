import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import RichEditor from 'src/components/RichEditor';

const useStyles = makeStyles((theme) => ({
  root: {},
  formGroup: {
    marginBottom: theme.spacing(3)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
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

function ProjectDetails({ className, ...rest }) {
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

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Project Details" />
      <CardContent>
        <RichEditor placeholder="Say something about the product..." />
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

ProjectDetails.propTypes = {
  className: PropTypes.string
};

export default ProjectDetails;
