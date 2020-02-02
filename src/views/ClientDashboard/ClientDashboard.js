import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import mockData from './data';

import {
  WorkRequestToolbar,
  WorkRequestTable
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [requests] = useState(mockData);

  return (
    <div className={classes.root}>
      <WorkRequestToolbar />
      <div className={classes.content}>
        <WorkRequestTable requests={requests} />
      </div>
    </div>
  );
};

export default Dashboard;
