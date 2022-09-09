import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container } from '@mui/system';
import { createTheme, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductThumbnail from '../components/ProductThumbnail';
import { useParams } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';
import AddToCartForm from '../components/AddToCartForm';

DetailPage.propTypes = {};
const theme = createTheme();
const useStyles = makeStyles({
  root: {},
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
});

function DetailPage(props) {
  const classes = useStyles();
  const params = useParams();
  const productId = params.productId;
  console.log('ProductId:  ', productId);

  // trả về cho mình thông tin product nó có đang loading hay không
  // Viết ra 1 customhook useProductDetail nhận vào productId khi mà productId thay đổi mình phải fetch lại dữ liệu
  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return <Box>Loading</Box>;
  }

  const handleAddToCartSubmit = (formValues) => {
    console.log('Form submit', formValues);
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
      </Container>
    </Box>
  );
}

export default DetailPage;
