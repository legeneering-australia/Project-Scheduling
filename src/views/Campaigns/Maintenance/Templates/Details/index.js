import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Tabs,
  Tab,
  Divider,
  colors
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import Header from './Header';
import Overview from './Overview';
import Phases from './Phases';
import Milestones from './Milestones';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  alert: {
    marginTop: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

function TemplateDetails({ match, history }) {
  const classes = useStyles();
  const { id, tab } = match.params;
  const [template, setTemplates] = useState(null);
  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'phases', label: 'Phases' },
    { value: 'milestones', label: 'Milestones' }
  ];

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  useEffect(() => {
    let mounted = true;
    
    console.log(id);

    const fetchTemplate = () => {
      axios.get('/campaigns/maintenance/templates/details/?id=' + id).then((response) => {
        if (mounted) {
            setTemplates(response.data);
        }
      });
    };

    fetchTemplate();

    return () => {
      mounted = false;
    };
  }, []);

  if (!tab) {
    return <Redirect to={`/campaigns/${id}/overview`} />;
  }

  if (!tabs.find((t) => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }

  if (!template) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Template Details"
    >
      <Container maxWidth="lg">
        <Header template={template[0]} />
        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={tab}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {tab === 'overview' && <Overview template={template[0]} />}
          {tab === 'phases' && <Phases template={template[0].id} />}
          {tab === 'milestones' && <Milestones template={template[0].id} />}
        </div>
      </Container>
    </Page>
  );
}

TemplateDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default TemplateDetails;
