import { createContext } from 'react';

export const UserContext = createContext({
    user: null,
    web3: null,
    userBalance: null,
    userAddress: null,
    network: null,
});
