import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Typography } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import Paginate from 'src/components/Paginate';
import SearchBar from 'src/components/SearchBar';
import Header from './Header';
import ProjectCard from './ProjectCard';

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

function ProjectManagementList() {
  const classes = useStyles();
  const [rowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchedProjects, setSearchedProjects] = useState([]);

  const handleFilter = data => {

    if (data.campaign !== '')
    {
      setFilteredProjects(projects.filter(function(project) {
        return project.client.includes(data.client) && project.facility.includes(data.facility) && project.campaign === data.campaign && project.manager.includes(data.projectManager) && project.value >= data.amount[0] * 1000 && project.value <= data.amount[1] * 1000 && project.type.includes(data.projectType) && project.status === data.projectStatus
      }));
  
      setSearchedProjects(projects.filter(function(project) {
        return project.client.includes(data.client) && project.facility.includes(data.facility) && project.manager.includes(data.projectManager) && project.value >= data.amount[0] * 1000 && project.value <= data.amount[1] * 1000 && project.type.includes(data.projectType) && project.statusName.includes(data.projectStatus) && project.campaign === data.campaign
      }).filter(function(project) {
        return project.id.toLowerCase().includes(searchInput.toLowerCase()) || project.name.toLowerCase().includes(searchInput.toLowerCase());
      }))
    }
    else
    {
      setFilteredProjects(projects.filter(function(project) {
        return project.client.includes(data.client) && project.facility.includes(data.facility) && project.manager.includes(data.projectManager) && project.value >= data.amount[0] * 1000 && project.value <= data.amount[1] * 1000 && project.type.includes(data.projectType) && project.status === data.projectStatus
      }));
  
      setSearchedProjects(projects.filter(function(project) {
        return project.client.includes(data.client) && project.facility.includes(data.facility) && project.manager.includes(data.projectManager) && project.value >= data.amount[0] * 1000 && project.value <= data.amount[1] * 1000 && project.type.includes(data.projectType) && project.statusName.includes(data.projectStatus)
      }).filter(function(project) {
        return project.id.toLowerCase().includes(searchInput.toLowerCase()) || project.name.toLowerCase().includes(searchInput.toLowerCase());
      }))
    }

}

  const handleSearch = e => {
    setSearchInput(e);
    setSearchedProjects(filteredProjects.filter(function(project) {
      return project.id.toLowerCase().includes(searchInput.toLowerCase()) || project.name.toLowerCase().includes(searchInput.toLowerCase());
    }));

  }

  const handlePageClicked = data => {
    setPage(data.selected); 
  };

  useEffect(() => {
    let mounted = true;

    const fetchProjects = () => {
      axios.get('/projects/browse').then((response) => {
        if (mounted) {
          setProjects(response.data);
          setFilteredProjects(response.data);
          setSearchedProjects(response.data);
          setPage(0);
        }
      }).catch(error => {
        console.log(error)
      });
    };

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page
      className={classes.root}
      title="Project Management List"
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
            {`${searchedProjects.length} Records found. Page ${page + 1} of ${Math.ceil(searchedProjects.length / rowsPerPage)}`}
          </Typography>
          {
          searchedProjects.slice((page * rowsPerPage), ((page * rowsPerPage) + rowsPerPage)).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))
          }
        </div>
        <div className={classes.paginate}>
          <Paginate pageCount={Math.ceil(searchedProjects.length / rowsPerPage)} onPageChange={handlePageClicked} />
        </div>
      </Container>
    </Page>
  );
}

export default ProjectManagementList;
