import React from 'react';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'feature/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      //auto set  username=email
      values.username = values.email;

      console.log('Form submit: ', values);

      // values là những giá trị trên form value
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      // do something here on register successfully
      enqueueSnackbar('Register successfully!!! ', { variant: 'success' });
      console.log('New user', user);

      //close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      console.log('Failed to register:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
