import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CodeIcon from '@mui/icons-material/Code';
import { Link, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Register from 'feature/Auth/components/Register';
import { Avatar, Badge, createTheme, Icon, IconButton, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import Login from 'feature/Auth/components/Login';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from 'feature/Auth/userSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { cartItemsCountSelector } from 'feature/Cart/selector';

const theme = createTheme();
const useStyles = makeStyles({
  closeButton: {
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
    marginLeft: 'auto',
  },
  box: {
    marginLeft: 'auto',
  },
});
export default function Header() {
  // * Form Dialog
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    console.log(reason);
    if (reason && reason === 'backdropClick') return;
    setOpen(false);
  };

  // Menu
  const [anchorEl, setAnchorEL] = React.useState(null);
  const dispatch = useDispatch();
  const handleUserClick = (e) => {
    setAnchorEL(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEL(null);
  };
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };

  const MODE = {
    LOGIN: 'login',
    REGISTER: 'regiter',
  };
  const [mode, setMode] = React.useState(MODE.LOGIN);

  const loggedInUser = useSelector((state) => state.user.current);
  // N???u loggedInUser c?? id t???c l?? n?? ???? ????ng nh???p r???i c??n n???u kh??ng c?? id t???c l?? n?? ch??a ????ng nh???p
  const isLoggedIn = !!loggedInUser.id;

  const cartItemsCount = useSelector(cartItemsCountSelector);
  const navigate = useNavigate();
  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <CodeIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ marginLeft: '25px' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                {' '}
                EZ SHOP
              </Link>
            </Typography>

            {/* N???u ch??a ????ng nh???p show c??i Login */}
            {!isLoggedIn && (
              <Button color="inherit" onClick={handleClickOpen}>
                Login
              </Button>
            )}
            <IconButton color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={cartItemsCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* N???u ???? ????ng nh???p r???i th?? show c??i icon */}
            {isLoggedIn && (
              <IconButton color="inherit" onClick={handleUserClick}>
                <AccountCircleIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {/* //* Form dialog*/}
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <Box className={classes.box}>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Dont have an account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
      {/* //* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleLogoutClick}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
