import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Container } from '@material-ui/core';
import PhaseCard from './PhaseCard';
import Header from './Header';
import axios from 'src/utils/axios';

const useStyles = makeStyles((theme) => ({
  root: {},
  results: {
    marginTop: theme.spacing(3)
  }
}));

function Phases({ template, className, ...rest }) {
  const classes = useStyles();
  const [phases, setPhases] = useState([])

  useEffect(() => {
    let mounted = true;

    const fetchPhases = () => {
      axios.get('/campaigns/maintenance/templates/phases/?id=' + template).then((response) => {
        if (mounted) {
          setPhases(response.data);
        }
      });
    };

    fetchPhases();

    return () => {
      mounted = false;
    };
  }, []);

  const handleCreate = () => {
    let data = {
      id : template,
      name : ''
    }

    axios.post('/campaigns/maintenance/templates/phases/create', data).then((response) => {
      axios.get('/campaigns/maintenance/templates/phases/?id=' + template).then((response) => {
          setPhases(response.data);
      });
    }).catch(error => {
      console.log(error)
    });
  }

  const handleUpdate = data => {
    axios.post('/campaigns/maintenance/templates/phases/update', data).then((response) => {
      axios.get('/campaigns/maintenance/templates/phases/?id=' + template).then((response) => {
          setPhases(response.data);
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
          phases.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              onUpdate={handleUpdate}
            />
          ))
        }
      </div>
    </Container>
  );
}

Phases.propTypes = {
  className: PropTypes.string,
  template: PropTypes.number.isRequired
};

export default Phases;
