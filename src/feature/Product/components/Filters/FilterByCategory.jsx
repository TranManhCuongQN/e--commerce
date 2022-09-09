import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, createTheme, Typography } from '@mui/material';
import categoryApi from 'api/categoryApi';
import { makeStyles } from '@mui/styles';
import { hover } from '@testing-library/user-event/dist/hover';
import CategorySkeletonList from './CategorySkeletonList';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
  },
  item: {
    marginTop: theme.spacing(1),
    transition: 'all .25s',
    '&:hover': {
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
});
function FilterByCategory(props) {
  const { onChange } = props;
  const [categoryList, setCategoryList] = useState([]);
  const [Loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        console.log({ list });
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch category list', error);
      }
      setLoading(false);
    })();
  }, []);

  const handleCategoryClick = (category) => {
    // Báo lên thằng cha category này được click nek
    if (onChange) {
      // Báo lên cái id của category mới được Click là cái nào
      onChange(category);
    }
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
      {Loading ? (
        <CategorySkeletonList length={categoryList.length} />
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((category) => (
            <li className={classes.item} key={category.id} onClick={() => handleCategoryClick(category)}>
              <Typography variant="body2"> {category.name}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}

export default FilterByCategory;
