import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
    position: 'fixed',
    padding: 16
  },
  logo: {
    width: '260px' 
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (

      <div
      {...rest}
      className={clsx(classes.root, className)}>
        <RouterLink to="/">
          <img
            className={classes.logo}
            alt="Logo"
            src="/images/logos/LEG Logo White.png"
          />
        </RouterLink>
      </div>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
