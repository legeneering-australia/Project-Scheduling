import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import axios from 'src/utils/axios';
import {
  Button,
  Collapse,
  Divider,
  Drawer,
  Slider,
  TextField,
  Typography
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  drawer: {
    width: 420,
    maxWidth: '100%'
  },
  header: {
    padding: theme.spacing(2, 1),
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  content: {
    padding: theme.spacing(0, 3),
    flexGrow: 1
  },
  contentSection: {
    padding: theme.spacing(2, 0)
  },
  contentSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
  contentSectionContent: {},
  formGroup: {
    padding: theme.spacing(2, 0)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  field: {
    marginTop: 0,
    marginBottom: 0
  },
  flexGrow: {
    flexGrow: 1
  },
  addButton: {
    marginLeft: theme.spacing(1)
  },
  tags: {
    marginTop: theme.spacing(1)
  },
  minAmount: {
    marginRight: theme.spacing(3)
  },
  maxAmount: {
    marginLeft: theme.spacing(3)
  },
  radioGroup: {},
  actions: {
    padding: theme.spacing(3),
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const projectStatusOptions = ['Tender', 'In Progress', 'Alert', 'Overdue', 'Complete', 'Closed', 'Awaiting Retention'];

const initialValues = {
  projectStatus: '',
  amount: [0, 2000],
  client: '',
  projectManager: '',
  facility: '',
  campaign: '',
  type: ''
};

function Filter({
  open,
  onClose,
  onFilter,
  className,
  ...rest
}) {
  const classes = useStyles();
  const [expandProject, setExpandProject] = useState(true);
  const [values, setValues] = useState({ ...initialValues });
  const [clients, setClients] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilties, setFilteredFacilities] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchClients = () => {
      axios.get('/clients').then((response) => {
        if (mounted) {
          setClients(response.data);
        }
      }).catch(error => {
        console.log(error)
      });
    };

    const fetchFacilities = () => {
      axios.get('/facilities').then((response) => {
        if (mounted) {
          setFacilities(response.data);
        }
      }).catch(error => {
        console.log(error)
      });
    };

    const fetchProjectManagers = () => {
      axios.get('/employees/projectManagers').then((response) => {
        if (mounted) {
          setProjectManagers(response.data);
        }
      }).catch(error => {
        console.log(error)
      });
    };

    const fetchCampaigns = () => {
      axios.get('/campaigns').then((response) => {
        if (mounted) {
          setCampaigns(response.data);
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

    const fetchStatuses = () => {
      axios.get('/projects/statuses').then((response) => {
        if (mounted) {
          setStatuses(response.data);
        }
      }).catch(error => {
        console.log(error)
      });
    };

    fetchClients();
    fetchFacilities();
    fetchProjectManagers();
    fetchCampaigns();
    fetchTypes();
    fetchStatuses();

    return () => {
      mounted = false;
    };
  }, []);

  const handleClear = () => {
    setValues({ ...initialValues });
  };

  const handleFieldChange = (event, field, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }));
  };

  const handleClientFieldChange = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      'client': value
    }));
    
    setFilteredFacilities(facilities.filter(function(facility) {
      return facility.client == value;
    }));

    setFilteredCampaigns(campaigns.filter(function(campaign) {
      return campaign.client == value && campaign.facility.toLowerCase().includes(values.facility);
    }));
  }

  const handleFacilityFieldChange = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      'facility': value
    }));

    setFilteredCampaigns(campaigns.filter(function(campaign) {
      return campaign.client == values.client && campaign.facility.toLowerCase().includes(value.toLowerCase());
    }));
  }

  const handleToggleProject = () => {
    setExpandProject((prevExpandProject) => !prevExpandProject);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (onFilter) {
      onFilter(values);
    }
  };

  return (
    <Drawer
      anchor="right"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant="temporary"
    >
      <form
        {...rest}
        className={clsx(classes.root, className)}
        onSubmit={handleSubmit}
      >
        <div className={classes.header}>
          <Button
            onClick={onClose}
            size="small"
          >
            <CloseIcon className={classes.buttonIcon} />
            Close
          </Button>
        </div>
        <div className={classes.content}>
          <div className={classes.contentSection}>
            <div
              className={classes.contentSectionHeader}
              onClick={handleToggleProject}
            >
              <Typography variant="h5">Project</Typography>
              {expandProject ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <Divider />
            <Collapse in={expandProject}>
              <div className={classes.contentSectionContent}>
                <div className={classes.formGroup}>
                  <TextField
                    className={classes.field}
                    fullWidth
                    label="Project Status"
                    margin="dense"
                    name="projectStatus"
                    onChange={(event) => handleFieldChange(
                      event,
                      'projectStatus',
                      event.target.value
                    )}
                    value={values.status}
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    <option
                      value=""
                    />
                    {statuses.map((option) => (
                      <option
                        key={option.id}
                        value={option.id}
                      >
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    className={classes.field}
                    fullWidth
                    label="Project Type"
                    margin="dense"
                    name="projectType"
                    onChange={(event) => handleFieldChange(
                      event,
                      'projectType',
                      event.target.value
                    )}
                    value={values.type}
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    <option
                      value=""
                    />
                    {types.map((option) => (
                      <option
                        key={option.id}
                        value={option.id}
                      >
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    className={classes.field}
                    fullWidth
                    label="Project Manager"
                    margin="dense"
                    name="projectManager"
                    onChange={(event) => handleFieldChange(
                      event,
                      'projectManager',
                      event.target.value
                    )}
                    value={values.projectManager}
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    <option
                      value=""
                    />
                    {projectManagers.map((option) => (
                      <option
                        key={option.id}
                        value={option.id}
                      >
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    className={classes.field}
                    fullWidth
                    label="Client"
                    margin="dense"
                    name="client"
                    onChange={(event) => handleClientFieldChange(
                      event.target.value
                    )}
                    value={values.client}
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    <option
                      value=""
                    />
                    {clients.map((option) => (
                      <option
                        key={option.id}
                        value={option.id}
                      >
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    className={classes.field}
                    fullWidth
                    label="Facility"
                    margin="dense"
                    name="facility"
                    onChange={(event) => handleFacilityFieldChange(
                      event.target.value
                    )}
                    value={values.facility}
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    <option
                      disabled
                      value=""
                    />
                    {filteredFacilties.map((option) => (
                      <option
                        key={option.client + ' - ' + option.location}
                        value={option.location}
                      >
                        {option.location}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    className={classes.field}
                    fullWidth
                    label="Campaign"
                    margin="dense"
                    name="campaign"
                    onChange={(event) => handleFieldChange(
                      event,
                      'campaign',
                      event.target.value
                    )}
                    value={values.campaign}
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    <option
                      value=""
                    />
                    {filteredCampaigns.map((option) => (
                      <option
                        key={option.id}
                        value={option.id}
                      >
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div className={classes.formGroup}>
                  <Typography
                    component="p"
                    gutterBottom
                    variant="overline"
                  >
                    Project amount
                  </Typography>
                  <div className={classes.fieldGroup}>
                    <Typography
                      className={classes.minAmount}
                      variant="body1"
                    >
                      $
                      {values.amount[0]}
                      K
                    </Typography>
                    <Slider
                      className={classes.flexGrow}
                      max={2000}
                      min={0}
                      onChange={(event, value) => handleFieldChange(event, 'amount', value)}
                      value={values.amount}
                      valueLabelDisplay="auto"
                    />
                    <Typography
                      className={classes.maxAmount}
                      variant="body1"
                    >
                      $
                      {values.amount[1]}
                      K
                    </Typography>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
        <div className={classes.actions}>
          <Button
            fullWidth
            onClick={handleClear}
            variant="contained"
          >
            <DeleteIcon className={classes.buttonIcon} />
            Clear
          </Button>
          <Button
            color="primary"
            fullWidth
            type="submit"
            variant="contained"
            onClick={onClose}
          >
            Apply filters
          </Button>
        </div>
      </form>
    </Drawer>
  );
}

Filter.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  onFilter: PropTypes.func,
  open: PropTypes.bool.isRequired
};

export default Filter;
