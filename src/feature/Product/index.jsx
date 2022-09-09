import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import ListPage from './Pages/ListPage';
import { Box } from '@mui/material';
import DetailPage from './Pages/DetailPage';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  return (
    <Box pt={4}>
      <Routes>
        <Route path="" element={<ListPage />} exact />
        <Route path="/:productId" element={<DetailPage />} />
      </Routes>
    </Box>
  );
}

export default ProductFeature;
