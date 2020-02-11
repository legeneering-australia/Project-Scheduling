import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Typography } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import Paginate from 'src/components/Paginate';
import SearchBar from 'src/components/CampaignTemplateSearchBar';
import Header from './Header';
import TemplateCard from './TemplateCard';

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

function CampaignTemplateManagementList() {
  const classes = useStyles();
  const [rowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchedTemplates, setSearchedTemplates] = useState([]);

  const handleFilter = data => {

    setFilteredTemplates(templates.filter(function(template) {
        return (data.client === '' ? template.client.toLowerCase().includes(data.client.toLowerCase()) : template.client.toLowerCase() === data.client.toLowerCase()) && template.status === (data.status === 0 ? false : true)
    }));

    setSearchedTemplates(filteredTemplates.filter(function(template) {
        return (data.client === '' ? template.client.toLowerCase().includes(data.client.toLowerCase()) : template.client.toLowerCase() === data.client.toLowerCase()) && template.status === (data.status === 0 ? false : true)
    }).filter(function(template) {
        return template.name.toLowerCase().includes(searchInput.toLowerCase());
    }));

  }

  const handleSearch = e => {
    setSearchInput(e);
    setSearchedTemplates(filteredTemplates.filter(function(template) {
      return template.name.toLowerCase().includes(e.toLowerCase());
    }));
  }

  const handlePageClicked = data => {
    setPage(data.selected); 
  };

  useEffect(() => {
    let mounted = true;

    const fetchTemplates = () => {
      axios.get('/campaigns/maintenance/templates').then((response) => {
        if (mounted) {
          setTemplates(response.data);
          setFilteredTemplates(response.data.filter(function(template) {
              return template.status === false
          }));
          setSearchedTemplates(response.data.filter(function(template) {
            return template.status === false
            }));
        }
      });
    };

    fetchTemplates();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page
      className={classes.root}
      title="Templates"
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
            {`${searchedTemplates.length} Records found. Page ${page + 1} of ${Math.ceil(searchedTemplates.length / rowsPerPage)}`}
          </Typography>
          {
          searchedTemplates.slice((page * rowsPerPage), ((page * rowsPerPage) + rowsPerPage)).map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
            />
          ))
          }
        </div>
        <div className={classes.paginate}>
          <Paginate pageCount={Math.ceil(searchedTemplates.length / rowsPerPage)} onPageChange={handlePageClicked} />
        </div>
      </Container>
    </Page>
  );
}

export default CampaignTemplateManagementList;
