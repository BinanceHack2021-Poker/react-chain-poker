import React from 'react';
import UserInfo from "./Components/UserInfo";
import SendTransaction from "./Components/SendTransaction";
import LogoutButton from "./Components/LogoutButton";

const DashboardView = () => {
  return (
    <div className="p-2">

      <div className="d-flex justify-content-end">
        <LogoutButton/>
      </div>

      <UserInfo/>
      <SendTransaction/>

    </div>
  );
};

export default DashboardView;
