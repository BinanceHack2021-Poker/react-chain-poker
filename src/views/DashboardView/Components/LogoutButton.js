import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import {logoutUser} from '../../../services/magic';


const LogoutButton = () => {
  const history = useHistory();
  const handleLogOut = async () => {
    try {
      await logoutUser();
      history.replace('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
        variant="contained"
        color="primary"
        onClick={handleLogOut}>
      Sign Out
    </Button>
  );
};

export default LogoutButton;
