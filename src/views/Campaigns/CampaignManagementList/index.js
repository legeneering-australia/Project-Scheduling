import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Typography } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import Paginate from 'src/components/Paginate';
import SearchBar from 'src/components/CampaignSearchBar';
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
  const [page, setPage] = useState(0);
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchedCampaigns, setSearchedCampaigns] = useState([]);

  const handleFilter = data => {

    if (data.template !== '')
    {
      setFilteredCampaigns(campaigns.filter(function(campaign) {
        return campaign.client.includes(data.client) && campaign.facility.includes(data.facility) && campaign.value >= data.amount[0] * 1000 && campaign.value <= data.amount[1] * 1000 && campaign.template === data.template
      }));
  
      setSearchedCampaigns(campaigns.filter(function(campaign) {
        return campaign.client.includes(data.client) && campaign.facility.includes(data.facility) && campaign.value >= data.amount[0] * 1000 && campaign.value <= data.amount[1] * 1000 && campaign.template === data.template
      }).filter(function(campaign) {
        return campaign.name.toLowerCase().includes(searchInput.toLowerCase());
      }))
    }
    else
    {
      setFilteredCampaigns(campaigns.filter(function(campaign) {
        return campaign.client.includes(data.client) && campaign.facility.includes(data.facility) && campaign.value >= data.amount[0] * 1000 && campaign.value <= data.amount[1] * 1000
      }));
  
      setSearchedCampaigns(campaigns.filter(function(campaign) {
        return campaign.client.includes(data.client) && campaign.facility.includes(data.facility) && campaign.value >= data.amount[0] * 1000 && campaign.value <= data.amount[1] * 1000
      }).filter(function(campaign) {
        return campaign.name.toLowerCase().includes(searchInput.toLowerCase());
      }))
    }

}

  const handleSearch = e => {
    setSearchInput(e);
    setSearchedCampaigns(filteredCampaigns.filter(function(campaign) {
      return campaign.name.toLowerCase().includes(searchInput.toLowerCase());
    }));
  }

  const handlePageClicked = data => {
    setPage(data.selected); 
  };

  useEffect(() => {
    let mounted = true;

    const fetchCampaigns = () => {
      axios.get('/campaigns').then((response) => {
        if (mounted) {
          setCampaigns(response.data);
          setFilteredCampaigns(response.data);
          setSearchedCampaigns(response.data);
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
            {`${campaigns.length} Records found. Page ${page + 1} of ${Math.ceil(searchedCampaigns.length / rowsPerPage)}`}
          </Typography>
          {
          searchedCampaigns.slice((page * rowsPerPage), ((page * rowsPerPage) + rowsPerPage)).map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
            />
          ))
          }
        </div>
        <div className={classes.paginate}>
          <Paginate pageCount={Math.ceil(searchedCampaigns.length / rowsPerPage)} onPageChange={handlePageClicked} />
        </div>
      </Container>
    </Page>
  );
}

export default CampaignManagementList;
