import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { Topbar } from './components';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 0,
    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

const Signin = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Signin.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Signin;
