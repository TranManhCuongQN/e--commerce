import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { useState } from 'react';

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};

function PasswordField(props) {
  const { form, name, label, disable } = props;
  const { control } = form;

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    // x là giá trị trước đó
    setShowPassword((x) => !x);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isTouched, error } }) => (
        <>
          <FormControl error={isTouched && invalid} fullWidth margin="normal" variant="outlined">
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
              id={name}
              error={invalid}
              type={showPassword ? 'text' : 'password'}
              label={label}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
              labelwidth={70}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          </FormControl>
          <FormHelperText error={invalid}>{error?.message}</FormHelperText>
        </>
      )}
    />
  );
}

export default PasswordField;
