import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters(props) {
  const { filters, onChange } = props;
  const handleCategoryChange = (newCategory) => {
    if (!onChange) return;
    const newFilters = {
      // nó sẽ lọc theo theo cái id
      'category.id': newCategory.id,
      'category.name': newCategory.name,
    };
    onChange(newFilters);
  };

  const handleChange = (values) => {
    if (onChange) {
      onChange(values);
    }
    console.log(values);
  };
  return (
    <Box>
      {/* ListPage nó đẩy xuống ProductFilter(sẽ quản lý 1 loạt các filter) */}
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handleChange} />
      {/* Mình truyền vào bộ filters hiện tại để biết rằng thằng nào được check hay không được check */}
      <FilterByService onChange={handleChange} filters={filters} />
    </Box>
  );
}

export default ProductFilters;
