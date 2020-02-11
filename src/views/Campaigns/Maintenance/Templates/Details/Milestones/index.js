import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Container } from '@material-ui/core';
import MilestoneCard from './MilestoneCard';
import Header from './Header';
import axios from 'src/utils/axios';

const useStyles = makeStyles((theme) => ({
  root: {},
  results: {
    marginTop: theme.spacing(3)
  }
}));

function Milestones({ template, className, ...rest }) {
  const classes = useStyles();
  const [milestones, setMilestones] = useState([])
  const [phases, setPhases] = useState([])

  useEffect(() => {
    let mounted = true;

    const fetchMilestones = () => {
      axios.get('/campaigns/maintenance/templates/milestones/?id=' + template).then((response) => {
        if (mounted) {
          setMilestones(response.data);
        }
      });
    };

    const fetchPhases = () => {
      axios.get('/campaigns/maintenance/templates/phases/?id=' + template).then((response) => {
        if (mounted) {
          setPhases(response.data);
        }
      });
    };

    fetchPhases();
    fetchMilestones();

    return () => {
      mounted = false;
    };
  }, []);

  const handleCreate = () => {
    let data = {
      id : template,
      name : ''
    }

    axios.post('/campaigns/maintenance/templates/milestones/create', data).then((response) => {
      axios.get('/campaigns/maintenance/templates/milestones/?id=' + template).then((response) => {
          setMilestones(response.data);
      });
    }).catch(error => {
      console.log(error)
    });
  }

  const handleUpdate = data => {
    axios.post('/campaigns/maintenance/templates/milestones/update', data).then((response) => {
      axios.get('/campaigns/maintenance/templates/milestones/?id=' + template).then((response) => {
          setMilestones(response.data);
      });
    }).catch(error => {
      console.log(error)
    });
  }

  return (
    <Container
      {...rest}
      className={clsx(classes.root, className)}
      maxWidth={false}>
      <Header onCreate={handleCreate} />
      <div className={classes.results}>
        {
          milestones.map((milestone) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              onUpdate={handleUpdate}
              phases={phases}
            />
          ))
        }
      </div>
    </Container>
  );
}

Milestones.propTypes = {
  className: PropTypes.string,
  template: PropTypes.number.isRequired
};

export default Milestones;
