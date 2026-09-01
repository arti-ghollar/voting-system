import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const BlockchainContext = createContext(null);

export const BlockchainProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState("Ethereum");
  const [transactions, setTransactions] = useState([]);

  const connectWallet = useCallback(async () => {
    try {
      if (
        typeof window !== "undefined" &&
        window.ethereum &&
        typeof window.ethereum.request === "function"
      ) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const selectedAccount = accounts?.[0] || null;

        setAccount(selectedAccount);
        setConnected(Boolean(selectedAccount));

        return selectedAccount;
      }

      const demoAccount = "0xDemoWallet000000000000000000000000000000";

      setAccount(demoAccount);
      setConnected(true);

      return demoAccount;
    } catch (error) {
      setConnected(false);
      setAccount(null);
      throw error;
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setConnected(false);
    setAccount(null);
  }, []);

  const addTransaction = useCallback((transaction) => {
    setTransactions((previous) => [transaction, ...previous]);
  }, []);

  const value = useMemo(
    () => ({
      connected,
      account,
      network,
      transactions,
      connectWallet,
      disconnectWallet,
      addTransaction,
      setNetwork,
    }),
    [
      connected,
      account,
      network,
      transactions,
      connectWallet,
      disconnectWallet,
      addTransaction,
    ]
  );

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);

  if (!context) {
    throw new Error(
      "useBlockchain must be used inside BlockchainProvider"
    );
  }

  return context;
};

export default BlockchainContext;