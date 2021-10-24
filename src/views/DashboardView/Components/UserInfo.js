import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';


const UserInfo = () => {
  const { email, userAddress, userBalance, network } = useContext(UserContext);

  return (
    <div className="p-2">
        <h1 className="h1">User: {email}</h1>
        <a className="a" href="https://testnet.bscscan.com/address/{{userAddress}}" target="_blank">{userAddress}</a> // todo
        <h2 className="h2">Balance: {userBalance} BNB</h2>
        <h2 className="h2">Network: {network}</h2>

        <div className="d-flex justify-content-end">
        </div>

        <a href="https://testnet.binance.org/faucet-smart" target="_blank">Get Test BNB</a>

    </div>
  );
};

export default UserInfo;
