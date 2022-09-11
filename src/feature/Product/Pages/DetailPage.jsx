import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container } from '@mui/system';
import { createTheme, Grid, LinearProgress, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductThumbnail from '../components/ProductThumbnail';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';
import AddToCartForm from '../components/AddToCartForm';
import ProductMenu from '../components/ProductMenu';
import ProductDescription from '../components/ProductDescription';
import ProductAdditional from '../components/ProductAdditional';
import ProductReview from '../components/ProductReview';
import { useDispatch } from 'react-redux';
import { addToCart } from 'feature/Cart/cartSlice';

DetailPage.propTypes = {};
const theme = createTheme();
const useStyles = makeStyles({
  root: {
    paddingBottom: theme.spacing(3),
  },
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    // chiếm hết độ rộng thằng cha luôn
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '20px',
  },
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
});

function DetailPage(props) {
  const classes = useStyles();
  const params = useParams();
  const productId = params.productId;
  const dispatch = useDispatch();
  console.log('ProductId:  ', productId);

  // trả về cho mình thông tin product nó có đang loading hay không
  // Viết ra 1 customhook useProductDetail nhận vào productId khi mà productId thay đổi mình phải fetch lại dữ liệu
  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCartSubmit = (formValues) => {
    console.log('Form submit', formValues);
    const action = addToCart({
      id: product.id,
      product,
      quantity: formValues.quantity,
    });
    console.log('Action:', action);
    dispatch(action);
  };

  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
        <Outlet />
        <Routes>
          <Route path="" element={<ProductDescription product={product} />} exact="true"></Route>
          <Route path="additional" element={<ProductAdditional />} exact="true"></Route>
          <Route path="reviews" element={<ProductReview />} exact="true"></Route>
        </Routes>
      </Container>
    </Box>
  );
}

export default DetailPage;
