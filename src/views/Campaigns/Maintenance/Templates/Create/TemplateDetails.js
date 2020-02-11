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
  client: 'WEL'
};

function TemplateDetails({ onSubmit, className, ...rest }) {
  const classes = useStyles();
  const [clients, setClients] = useState([]);
  const [values, setValues] = useState({ ...initialValues });

  useEffect(() => {
    let mounted = true;

    const fetchClients = () => {
      axios.get('/clients').then((response) => {
        if (mounted) {
          setClients(response.data)
        }
      }).catch(error => {
        console.log(error)
      });
    };

    fetchClients();

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
      <CardHeader title="Template Details" />
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
                helperText=""
                margin="dense"
                label="Template Name"
                name="name"
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
                label="Client"
                name="client"
                required
                InputLabelProps={{ shrink: !!values.client }}
                select
                margin="dense"
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                onChange={(event) => handleFieldChange(
                  'client',
                  event.target.value
                )}
                value={values.client}
                variant="outlined"
              >
                {clients.map(option => (
                  <option
                    key={option.id}
                    value={option.id}
                  >
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

TemplateDetails.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func
};

export default TemplateDetails;
