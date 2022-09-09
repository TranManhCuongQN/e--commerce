import React from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton, Typography } from '@mui/material';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from 'utils';

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  {
    /* ?. ý nghĩa nếu thumbnail bị null thì thôi còn không bị null thì nó lấy url  */
  }
  const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to detail page: /products/:productId
    navigate(`/products/${product.id}`);
  };
  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
          {' '}
          {formatPrice(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default Product;
