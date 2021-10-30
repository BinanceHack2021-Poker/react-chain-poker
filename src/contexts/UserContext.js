import { createContext } from 'react';
// todo: to redux
export const UserContext = createContext({
    user: null,
    web3: null,
    userBalance: null,
    userAddress: null,
    network: null,
});
