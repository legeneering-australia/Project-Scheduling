import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Typography } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import Paginate from 'src/components/Paginate';
import SearchBar from 'src/components/SearchBar';
import Header from './Header';
import CampaignCard from './CampaignCard';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));

function CampaignManagementList() {
  const classes = useStyles();
  const [rowsPerPage] = useState(10);
  const [page] = useState(0);
  const [campaigns, setCampaigns] = useState([]);

  const handleFilter = () => {};

  const handleSearch = () => {};

  useEffect(() => {
    let mounted = true;

    const fetchCampaigns = () => {
      axios.get('/api/campaigns').then((response) => {
        if (mounted) {
          setCampaigns(response.data.campaigns);
        }
      });
    };

    fetchCampaigns();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page
      className={classes.root}
      title="Campaigns"
    >
      <Container maxWidth={false}>
        <Header />
        <SearchBar
          onFilter={handleFilter}
          onSearch={handleSearch}
        />
        <div className={classes.results}>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
          >
            {`${campaigns.length} Records found. Page ${page + 1} of ${Math.ceil(campaigns.length / rowsPerPage)}`}
          </Typography>
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
            />
          ))}
        </div>
        <div className={classes.paginate}>
          <Paginate pageCount={3} />
        </div>
      </Container>
    </Page>
  );
}

export default CampaignManagementList;
