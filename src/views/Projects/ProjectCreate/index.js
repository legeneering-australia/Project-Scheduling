import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Button } from '@material-ui/core';
import moment from 'moment';
import Page from 'src/components/Page';
import Header from './Header';
import axios from 'src/utils/axios';
import AboutProject from './AboutProject';
import ClientDetails from './ClientDetails';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  aboutAuthor: {
    marginTop: theme.spacing(3)
  },
  aboutProject: {
    marginTop: theme.spacing(3)
  },
  clientDetails: {
    marginTop: theme.spacing(3)
  },
  projectCover: {
    marginTop: theme.spacing(3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  preferences: {
    marginTop: theme.spacing(3)
  },
  actions: {
    marginTop: theme.spacing(3)
  }
}));

const initialValues = {
  client: 'WEL',
  location: '',
  campaign: '',
  projectNumber: '',
  clientContact: '',
  campaign: '',
  name: '',
  type: '',
  manager: '',
  startDate: moment(),
  endDate: moment().add(1, 'day')
};

function ProjectCreate() {
  const classes = useStyles();
  const [values, setValues] = useState({ ...initialValues });
  const [project, setProject] = useState('');

  const handleClientDetailsChange = data => {
    setValues((prevValues) => ({
      ...prevValues,
      client: data.client,
      location: data.location,
      campaign: data.campaign,
      projectNumber: data.projectNumber,
      clientContact: data.clientContact
    }));
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
  }

  const handleSubmit = () => {
    axios.post('/projects/createnew', values).then((response) => {
      setProject(response.data[0].prpProjectID);
    }).catch(error => {
      console.log(error)
    });
  }

  if (project !== '')
  {
    return <Redirect push to={'/projects/details/' + project + '/overview'} />;
  }

  return (
    <Page
      className={classes.root}
      title="Project Create"
    >
      <Container maxWidth="lg">
        <Header />
        <ClientDetails className={classes.clientDetails} onSubmit={handleClientDetailsChange} />
        <AboutProject className={classes.aboutProject} onSubmit={handleProjectDetailsChange} />
        <div className={classes.actions}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Create project
          </Button>
        </div>
      </Container>
    </Page>
  );
}

export default ProjectCreate;
