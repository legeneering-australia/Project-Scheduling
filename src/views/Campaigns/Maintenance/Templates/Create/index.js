import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Button } from '@material-ui/core';
import moment from 'moment';
import Page from 'src/components/Page';
import Header from './Header';
import axios from 'src/utils/axios';
import TemplateDetails from './TemplateDetails';
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

function ProjectCreate() {
  const classes = useStyles();
  const [template, setTemplate] = useState('');
  const [data, setData] = useState([]);

  const handleDataChanged = data => {
    setData(data);
  }

  const handleSubmit = () => {
    axios.post('/campaigns/maintenance/templates/create', data).then((response) => {
      console.log('campaigns/maintenance/templates/details/' + response.data[0].id + '/overview')
      setTemplate(response.data[0].id);
    }).catch(error => {
      console.log(error)
    });
  }

  if (template !== '')
  {
    return <Redirect push to={'/campaigns/maintenance/templates/details/' + template + '/overview'} />;
  }

  return (
    <Page
      className={classes.root}
      title="Campaign Template Creation"
    >
      <Container maxWidth="lg">
        <Header />
        <TemplateDetails className={classes.clientDetails} onSubmit={handleDataChanged} />
        <div className={classes.actions}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Create Template
          </Button>
        </div>
      </Container>
    </Page>
  );
}

export default ProjectCreate;
