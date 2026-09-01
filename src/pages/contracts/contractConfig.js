export const CONTRACT_CONFIG = {
  ethereum: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    contractAddress:
      import.meta.env.VITE_VOTING_CONTRACT_ADDRESS || "",
    rpcUrl:
      import.meta.env.VITE_ETHEREUM_RPC_URL || "",
    explorerUrl: "https://etherscan.io",
  },

  sepolia: {
    chainId: "0xaa36a7",
    chainName: "Sepolia Test Network",
    contractAddress:
      import.meta.env.VITE_VOTING_CONTRACT_ADDRESS || "",
    rpcUrl:
      import.meta.env.VITE_SEPOLIA_RPC_URL || "",
    explorerUrl: "https://sepolia.etherscan.io",
  },
};

export const DEFAULT_CONTRACT_NETWORK =
  import.meta.env.VITE_CONTRACT_NETWORK || "sepolia";

export const getContractConfig = (
  network = DEFAULT_CONTRACT_NETWORK
) => {
  const config = CONTRACT_CONFIG[network];

  if (!config) {
    throw new Error(`Unsupported blockchain network: ${network}`);
  }

  return config;
};

export default CONTRACT_CONFIG;