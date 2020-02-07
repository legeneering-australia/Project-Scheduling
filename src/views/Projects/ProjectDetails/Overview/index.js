import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import ProjectInfo from './ProjectInfo';
import ClientDetails from './ClientDetails';

const useStyles = makeStyles((theme) => ({
  root: {},
  deliverables: {
    marginTop: theme.spacing(3)
  },
  members: {
    marginTop: theme.spacing(3)
  }
}));

function Overview({ project, onSubmit, className, ...rest }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    id: project.id,
    location: project.location,
    campaign: project.campaign,
    projectNumber: project.projectNumber,
    clientContact: project.clientContact,
    name: project.name,
    type: project.type,
    manager: project.manager,
    startDate: project.startDate,
    endDate: project.endDate
  });

  const handleClientDetailsChange = data => {
    setValues((prevValues) => ({
      ...prevValues,
      location: data.location,
      campaign: data.campaign,
      projectNumber: data.projectNumber,
      clientContact: data.clientContact
    }));

    if (onSubmit) {
      values['location'] = data.location
      values['campaign'] = data.campaign
      values['projectNumber'] = data.projectNumber
      values['clientContact'] = data.clientContact

      onSubmit(values);
    }
  }
  
  const handleProjectDetailsChange = data => {
    setValues((prevValues) => ({
      ...prevValues,
      name: data.name,
      type: data.type,
      manager: data.manager,
      startDate: data.startDate,
      endDate: data.endDate
    }));

    if (onSubmit) {
      values['name'] = data.name
      values['type'] = data.type
      values['manager'] = data.manager
      values['startDate'] = data.startDate
      values['endDate'] = data.endDate

      onSubmit(values);
    }
  }

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid
        item
        xs={12}
      >
        <ClientDetails project={project} onSubmit={handleClientDetailsChange}/>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <ProjectInfo project={project} onSubmit={handleProjectDetailsChange}/>
      </Grid>
    </Grid>
  );
}

Overview.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
};

export default Overview;
