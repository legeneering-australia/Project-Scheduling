import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const WorkRequestTable = props => {
  const { className, requests, ...rest } = props;

  const classes = useStyles();

  const [selectedrequests, setSelectedrequests] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { requests } = props;

    let selectedrequests;

    if (event.target.checked) {
      selectedrequests = requests.map(request => request.id);
    } else {
      selectedrequests = [];
    }

    setSelectedrequests(selectedrequests);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedrequests.indexOf(id);
    let newSelectedrequests = [];

    if (selectedIndex === -1) {
      newSelectedrequests = newSelectedrequests.concat(selectedrequests, id);
    } else if (selectedIndex === 0) {
      newSelectedrequests = newSelectedrequests.concat(selectedrequests.slice(1));
    } else if (selectedIndex === selectedrequests.length - 1) {
      newSelectedrequests = newSelectedrequests.concat(selectedrequests.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedrequests = newSelectedrequests.concat(
        selectedrequests.slice(0, selectedIndex),
        selectedrequests.slice(selectedIndex + 1)
      );
    }

    setSelectedrequests(newSelectedrequests);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedrequests.length === requests.length}
                      color="primary"
                      indeterminate={
                        selectedrequests.length > 0 &&
                        selectedrequests.length < requests.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Request Number</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Asset</TableCell>
                  <TableCell>Campaign</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.slice(0, rowsPerPage).map(request => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={request.id}
                    selected={selectedrequests.indexOf(request.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedrequests.indexOf(request.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, request.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>{request.requestNumber}</TableCell>
                    <TableCell>{request.name}</TableCell>
                    <TableCell>{request.asset}</TableCell>
                    <TableCell>{request.campaign}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>
                      {moment(request.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={requests.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10]}
        />
      </CardActions>
    </Card>
  );
};

WorkRequestTable.propTypes = {
  className: PropTypes.string,
  requests: PropTypes.array.isRequired
};

export default WorkRequestTable;
