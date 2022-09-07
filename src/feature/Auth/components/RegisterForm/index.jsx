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
RegisterForm.propTypes = {
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

function RegisterForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name.')
      .test('Should has at least two words', 'Please enter at least two words.', (value) => {
        console.log('Value', value);
        return value.split(' ').length >= 2;
      }),
    email: yup.string().required('PLease enter your email.').email('Please enter a valid email address.'),
    password: yup.string().required('Please enter your password').min(6, 'Please your at least 6 character.'),
    // oneof: là một trong những giá trị mình định nghĩa trong mảng này
    // và mình sử dụng là nó phải giống giá trị fieldPassword
    retypePassword: yup
      .string()
      .required('Please retype your password.')
      .oneOf([yup.ref('password')], 'Password does not match'),
  });
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
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
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />
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
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
