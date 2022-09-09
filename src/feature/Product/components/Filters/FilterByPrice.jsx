import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Button, createTheme, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};
const theme = createTheme();
const useStyles = makeStyles({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.gray}`,
  },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '&>span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
});

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });
  const handleSubmit = () => {
    if (onChange) {
      onChange(values);
    }

    // Sau khi submit xong xét nó về lại số không
    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };
  const handleChange = (e) => {
    // Mình sẽ lấy trước 2 biến e.target.name và e.target.value và mình lưu vào 2 cái biến tạm name và value
    const { name, value } = e.target;
    // => ({}) return về 1 object
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Chọn khoảng giá</Typography>
      <Box className={classes.range}>
        <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} variant="standard" />
        <span>-</span>
        <TextField name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} variant="standard" />
      </Box>
      <Button variant="outlined" color="primary" onClick={handleSubmit} size="small">
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
