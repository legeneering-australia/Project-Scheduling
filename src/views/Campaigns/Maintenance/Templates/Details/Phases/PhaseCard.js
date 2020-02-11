import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardContent,
  Link,
  Typography,
  colors,
  Grid,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap'
    },
    '&:last-child': {
      paddingBottom: theme.spacing(2)
    }
  },
  header: {
    maxWidth: '100%',
    width: 240,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
      flexBasis: '100%'
    }
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  stats: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  },
  actions: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  }
}));

function PhaseCard({ onUpdate, phase, className, ...rest }) {
  const classes = useStyles();
  const [values, setValues] = useState({ ...phase });

  const statusColors = {
    'In progress': colors.orange[600],
    Canceled: colors.grey[600],
    Completed: colors.green[600]
  };

  const handleFieldChange = (field, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }));
  }

  const handleUpdate = () => {
    values['inactive'] = 0
    values['order'] = parseInt(values.order, 10)

    if (onUpdate)
      onUpdate(values);
  }

  const handleRemove = () => {
    values['inactive'] = 1
    values['inactiveDate'] = moment()
    values['order'] = parseInt(values.order, 10)

    if (onUpdate)
      onUpdate(values);
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
       <CardContent className={classes.content}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={4}
          >
            <TextField
              fullWidth
              label="Phase Description"
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
            xs={1}
          >
            <TextField
              fullWidth
              label="Order"
              margin="dense"
              name="name"
              type="number"
              required
              InputProps={{ inputProps: { min: 1, max: 100 } }}
              // eslint-disable-next-line react/jsx-sort-props
              value={values.order}
              onChange={(event) => handleFieldChange(
                'order',
                event.target.value
              )}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <div className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
        <div className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={handleRemove}
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

PhaseCard.propTypes = {
  className: PropTypes.string,
  phase: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default PhaseCard;
