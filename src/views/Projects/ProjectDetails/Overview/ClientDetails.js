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
  client: 'WEL',
  location: '',
  campaign: '0',
  projectNumber: '',
  clientContact: ''
};

function ClientDetails({ project, onSubmit, className, ...rest }) {
  const classes = useStyles();
  const [clientContacts, setClientContacts] = useState([]);
  const [filteredClientContacts, setFilteredClientContacts] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [values, setValues] = useState({
    client: project.client,
    location: project.location,
    campaign: project.campaign,
    projectNumber: project.projectNumber,
    clientContact: project.clientContact
  });

  useEffect(() => {
    let mounted = true;

    const fetchFacilities = () => {
      axios.get('/clients/facilities').then((response) => {
        if (mounted) {
          setFilteredFacilities(response.data.filter(function (facility) {
            return project.client === facility.client
          }));
        }
      }).catch(error => {
        console.log(error)
      });
    };

    const fetchClientContacts = () => {
      axios.get('/clients/contacts').then((response) => {
        if (mounted) {
          setClientContacts(response.data);
          setFilteredClientContacts(response.data.filter(function (contact) {
            return project.client === contact.client && values.location === contact.location
          }));
        }
      }).catch(error => {
        console.log(error)
      });
    };

    const fetchCampaigns = () => {
      axios.get('/campaigns').then((response) => {
        if (mounted) {
          setFilteredCampaigns(response.data.filter(function (campaign) {
            return project.client === campaign.client
          }));
        }
      }).catch(error => {
        console.log(error)
      });
    };

    fetchFacilities();
    fetchClientContacts();
    fetchCampaigns();

    onSubmit(values);

    return () => {
      mounted = false;
    };
  }, []);

  const handleFieldChange = (field, value) => {

    if (field === 'location')
    {
      setFilteredClientContacts(clientContacts.filter(function (contact) {
        return project.client === contact.client && value === contact.location
      }));
    }

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
                disabled
                margin="dense"
                // eslint-disable-next-line react/jsx-sort-props
                value={project.clientName}
                variant="outlined"
              />
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
                InputLabelProps={{ shrink: !!values.location }}
                onChange={(event) => handleFieldChange(
                  'location',
                  event.target.value
                )}
                value={values.location}
                variant="outlined"
              >
                {filteredFacilities.map(option => (
                  <option
                    key={option.location}
                    value={option.location}
                  >
                    {option.location}
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
                label="Client Contact"
                name="clientContact"
                value={values.clientContact}
                InputLabelProps={{ shrink: !!values.clientContact }}
                variant="outlined"
                required
                onChange={(event) => handleFieldChange(
                  'clientContact',
                  event.target.value
                )}
                select
                SelectProps={{ native: true }}
              >
              <option value=''></option>
              {filteredClientContacts.map(option => (
                <option
                  key={option.client + ' - ' + option.location + ' - ' + option.id}
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
                label="Campaign"
                name="campaign"
                select
                margin="dense"
                InputLabelProps={{ shrink: !!values.campaign }}
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                onChange={(event) => handleFieldChange(
                  'campaign',
                  event.target.value
                )}
                value={values.campaign}
                variant="outlined"
              >
                <option value=''></option>
                {filteredCampaigns.map(option => (
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
                label="Client Reference Number"
                name="projectNumber"
                value={values.projectNumber}
                onChange={(event) => handleFieldChange(
                  'projectNumber',
                  event.target.value
                )}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

ClientDetails.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  project: PropTypes.object.isRequired
};

export default ClientDetails;
