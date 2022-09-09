import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Pagination, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { makeStyles } from '@mui/styles';
import productApi from 'api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/ProductFilters';
import FilterViewer from '../components/Filters/FilterViewer';
import { createBrowserHistory } from 'history';
import queryString from 'query-string';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();
  // đưa nó vào là 1 chuỗi nó parse thành ra 1 object
  // Bạn có 1 object queryParams object này sẽ được tính toán lại khi và chỉ khi location.search nó thay đổi
  const queryParams = useMemo(() => {
    // Đầu tiên parse ra object params
    const params = queryString.parse(location.search);
    //{isPromotion: "true"}
    return {
      // sau đó lấy tất cả giá trị của nó (trừ 3 thằng _page,_limit,_sort) phải check thử có hay ko nếu ko có thì lấy default
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 120,
    page: 10,
  });

  const handlePageChange = (e, page) => {
    // Mỗi lần page change tôi lấy param hiện tại đổi cái page thôi sau đó push vào cái history của mình (với location pathname hiện tại ) và queryString là chuỗi object filter mới
    const filters = {
      ...queryParams,
      _page: page,
    };
    navigate({
      pathname: '/products',
      // search là phần đằng sau dấu chấm hỏi (đưa nó vào 1 object nó ra chuỗi)
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    navigate({
      pathname: '/products',
      // search là phần đằng sau dấu chấm hỏi (đưa nó vào 1 object nó ra chuỗi)
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    navigate({
      pathname: '/products',
      // search là phần đằng sau dấu chấm hỏi (đưa nó vào 1 object nó ra chuỗi)
      search: queryString.stringify(filters),
    });
  };

  useEffect(() => {
    (async () => {
      // gọi Api
      try {
        // trên component khi nó truyền xuống chỉ cần truyền cho mình trang bao nhiêu và mỗi trang bao nhiêu item xuống Api mình sẽ tự động tính
        const response = await productApi.getAll(queryParams);
        const { data, pagination } = response;
        console.log('Response:', { data, pagination });
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  const setNewFilters = (newFilters) => {
    navigate({
      pathname: '/products',
      // search là phần đằng sau dấu chấm hỏi (đưa nó vào 1 object nó ra chuỗi)
      search: queryString.stringify(newFilters),
    });
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              {/* Có nhiều filters trong product nếu 1 trong những filter thay đổi thì báo lên thằng cha */}
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />
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
