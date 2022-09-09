import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Button, Checkbox, createTheme, FormControlLabel, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};
const theme = createTheme();
const useStyles = makeStyles({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.gray}`,
  },
  list: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '&>li': {
      margin: 0,
    },
  },
});

function FilterByService({ filters = {}, onChange }) {
  const classes = useStyles();

  const handleChange = (e) => {
    if (!onChange) return;
    // Mình sẽ lấy trước 2 biến e.target.name và e.target.value và mình lưu vào 2 cái biến tạm name và value
    const { name, checked } = e.target;
    // Báo lên ProductFilter có cái filter với cái name này (isPromotion,isFreeShip) nó thay đổi giá trị true hoặc false
    onChange({ [name]: checked });
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Dịch vụ</Typography>
      <ul className={classes.list}>
        {[
          { value: 'isPromotion', label: 'Có khuyến mãi' },
          { value: 'isFreeShip', label: 'Vận chuyển miễn phí' },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
