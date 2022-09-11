import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { createTheme, Link } from '@mui/material';
import { NavLink, Routes, useLocation, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

ProductMenu.propTypes = {};

const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    listStyleType: 'none',
    '&>li': {
      padding: theme.spacing(2, 4),
    },
    '&>li>a.active': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      fontWeight: 'bold',
    },
  },
}));

function ProductMenu(props) {
  const classes = useStyles();
  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to="" exact="true">
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to="additional" exact="true">
          Additional Information
        </Link>
      </li>
      <li>
        <Link component={NavLink} to="reviews" exact="true">
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
