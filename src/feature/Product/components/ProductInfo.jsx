import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { createTheme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { formatPrice } from 'utils';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  description: {
    margin: theme.spacing(2, 0),
  },
  salePrice: {
    fontSize: theme.typography.h4.fontSize,
    marginRight: theme.spacing(3),
    fontWeight: 'bold',
  },
  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: 'line-through',
  },
  priceBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
});

function ProductInfo({ product = {} }) {
  const classes = useStyles();
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;
  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>

      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>

        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>

            <Box component="span">{` - ${promotionPercent}%`}</Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
