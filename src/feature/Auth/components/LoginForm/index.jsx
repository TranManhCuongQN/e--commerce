import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, createTheme, LinearProgress, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import InputField from 'components/FormControl/InputField';
import PasswordField from 'components/FormControl/PassWordField';
LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};
const theme = createTheme();
const useStyles = makeStyles({
  title: {
    margin: theme.spacing(2, 0, 2, 0),
    textAlign: 'center',
  },
  avatar: {
    margin: '0 auto',
  },
  root: {
    paddingTop: theme.spacing(1),
    position: 'relative',
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
});

function LoginForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    identifier: yup.string().required('PLease enter your email.').email('Please enter a valid email address.'),
    password: yup.string().required('Please enter your password'),
  });
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      // mình sẽ đợi onSubmit chạy xong luôn rồi mình mới reset
      // khi đó nó sẽ chạy hết đống lệnh trong handleSubmit mới hết isSubmitting
      await onSubmit(values);
    }
  };
  return (
    <div className={classes.root}>
      {/* Mình sẽ show cái linearProgress khi nó submit */}
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h3" variant="h5" className={classes.title}>
        Sign in
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        {/* Trong lúc submit mình sẽ disabled cái nút đi  */}
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          type="submit"
          disabled={isSubmitting}
          fullWidth
          size="large"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
