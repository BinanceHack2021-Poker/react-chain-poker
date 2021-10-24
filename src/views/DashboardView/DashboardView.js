import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { UserContext } from '../../context/UserContext';
import {logoutUser, web3} from '../../services/magic';
import UserInfo from "./Components/UserInfo";
import SendTransaction from "./Components/SendTransaction";

const DashboardView = () => {
  const { email, web3 } = useContext(UserContext);
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
    <div className="p-2">

      <div className="d-flex justify-content-end">
        <Button
            variant="contained"
            color="primary"
            onClick={handleLogOut}>
          Sign Out
        </Button>
      </div>

      <UserInfo/>
      <SendTransaction/>

    </div>
  );
};

export default DashboardView;
