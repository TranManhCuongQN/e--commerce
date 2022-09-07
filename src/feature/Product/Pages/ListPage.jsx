import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Pagination, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { makeStyles } from '@mui/styles';
import productApi from 'api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';

ListPage.propTypes = {};
const useStyles = makeStyles({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    // chiếm hết độ rộng thằng cha luôn
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '20px',
  },
});

function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 12,
    _sort: 'salePrice:ASC',
  });
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 120,
  });

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      // Mình giữ tất cả giá trị filter trước đó sao đó mình đổi page
      ...prevFilters,
      _page: page,
    }));
  };

  const handleSortChange = (newSortValue) => {
    setFilters((prevFilters) => ({
      // Mình giữ tất cả giá trị filter trước đó sao đó mình đổi page
      ...prevFilters,
      _sort: newSortValue,
    }));
  };

  useEffect(() => {
    (async () => {
      // gọi Api
      try {
        // trên component khi nó truyền xuống chỉ cần truyền cho mình trang bao nhiêu và mỗi trang bao nhiêu item xuống Api mình sẽ tự động tính
        const response = await productApi.getAll(filters);
        const { data, pagination } = response;
        console.log({ data, pagination });
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }

      setLoading(false);
    })();
  }, [filters]);
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left Column</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
              {loading ? <ProductSkeletonList /> : <ProductList data={productList} />}
              <Box className={classes.pagination}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
