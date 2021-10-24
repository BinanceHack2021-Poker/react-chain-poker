import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import Button from '@material-ui/core/Button';


const SendTransaction = () => {
  const { web3 } = useContext(UserContext);

  const handleSendTxn = async (e) => {
    e.preventDefault();
    const destination = new FormData(e.target).get("destination");
    const amount = new FormData(e.target).get("amount");
    if (destination && amount) {
      const btnSendTxn = document.getElementById("btn-send-txn");
      btnSendTxn.disabled = true;
      btnSendTxn.innerText = "Sending...";
      const fromAddress = (await web3.eth.getAccounts())[0];
      // Submit transaction to the blockchain and wait for it to be mined
      const receipt = await web3.eth.sendTransaction({
        from: fromAddress,
        to: destination,
        value: web3.utils.toWei(amount)
      });
      console.log("Completed:", receipt);
      btnSendTxn.disabled = false;
      btnSendTxn.innerText = "Send Transaction";
    }
  };

  return (
    <div className="container">
    <h1>Send Transaction</h1>
    <form onSubmit={handleSendTxn}>
        <input type="text" name="destination" className="full-width" required="required"
               placeholder="Destination address"/>
        <input type="text" name="amount" className="full-width" required="required" placeholder="Amount in BNB"/>

        <Button
            id="btn-send-txn"
            type="submit"
            variant="contained"
            color="primary"
        >Send Transaction</Button>
    </form>
    </div>
  );
};

export default SendTransaction;
