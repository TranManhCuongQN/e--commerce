import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Box,
  createTheme,
  FormControl,
  FormHelperText,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { makeStyles } from '@mui/styles';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};
const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {},
  box: {
    maxWidth: '200px',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    margin: theme.spacing(1),
  },
}));

function QuantityField(props) {
  const { form, name, label, disable } = props;
  const { setValue } = form;
  const classes = useStyles();

  return (
    <FormControl fullWidth margin="normal" variant="outlined" size="small">
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value = 1, name }) => (
          <Box className={classes.box}>
            <IconButton
              onClick={() => {
                setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1);
              }}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>

            <OutlinedInput id={name} type="number" value={value} onBlur={onBlur} onChange={onChange} readOnly />

            <IconButton
              onClick={() => {
                setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1);
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
        )}
      />
    </FormControl>
  );
}

export default QuantityField;
