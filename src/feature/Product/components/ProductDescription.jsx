import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import DOMPurify from 'dompurify';

ProductDescription.propTypes = {
  product: PropTypes.object,
};

function ProductDescription({ product = {} }) {
  // Loại bỏ scripts có khả năng liên quan đến xss
  const safeDescription = DOMPurify.sanitize(product.description);
  return (
    <Paper elevation={0} styles={{ padding: '15px' }}>
      {/* product.description: là một chuỗi html trong html thì có các thẻ liên quan đến scripts (trong scripts đó có đoạn code lấy localStorage của bạn gửi về server của nó là 1 kiểu tấn công xss) */}
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
    </Paper>
  );
}

export default ProductDescription;
