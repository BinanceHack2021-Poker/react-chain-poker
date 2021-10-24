import { Magic } from 'magic-sdk';
import Web3 from 'web3';

const REACT_APP_MAGIC_KEY = process.env.REACT_APP_MAGIC_KEY || "foo";

const BSCOptions = {
  /* Smart Chain Testnet RPC URL */
  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/", // todo: to env
  chainId: 97 // Smart Chain Testnet Chain ID
};
/* Configure Binance Smart Chain provider */
const magic = new Magic(REACT_APP_MAGIC_KEY, {
  network: BSCOptions
});
export const web3 = new Web3(magic.rpcProvider);


export const checkUser = async (cb) => {
  const isLoggedIn = await magic.user.isLoggedIn();
  if (isLoggedIn) {
    const user = await magic.user.getMetadata();
    const network = await web3.eth.net.getNetworkType();
    const userAddress = (await web3.eth.getAccounts())[0];
    const userBalance = web3.utils.fromWei(
      await web3.eth.getBalance(userAddress) // Balance is in wei
    );
    return cb({
      isLoggedIn: true,
      email: user.email,
      web3: web3,
      userBalance: userBalance,
      userAddress: userAddress,
      network: network,
    });
  }
  return cb({ isLoggedIn: false, web3: null });
};

export const loginUser = async (email, cb) => {
  await magic.auth.loginWithMagicLink({ email });
  return cb({ isLoggedIn: true });
};

export const logoutUser = async () => {
  await magic.user.logout();
};
