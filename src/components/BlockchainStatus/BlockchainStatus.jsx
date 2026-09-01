import "./BlockchainStatus.css";

const BlockchainStatus = ({
  connected = true,
  network = "Local Test Network",
  blockNumber = "—",
  contractAddress = "Not connected",
}) => {
  return (
    <section className="blockchain-status">
      <div className="blockchain-status__header">
        <div className="blockchain-status__icon">⬡</div>

        <div>
          <span>BLOCKCHAIN NETWORK</span>
          <h3>{connected ? "Network Connected" : "Network Disconnected"}</h3>
        </div>

        <span
          className={`blockchain-status__indicator ${
            connected ? "is-connected" : "is-disconnected"
          }`}
        >
          <span />
          {connected ? "Connected" : "Offline"}
        </span>
      </div>

      <div className="blockchain-status__details">
        <div>
          <span>Network</span>
          <strong>{network}</strong>
        </div>

        <div>
          <span>Latest Block</span>
          <strong>{blockNumber}</strong>
        </div>

        <div>
          <span>Smart Contract</span>
          <strong title={contractAddress}>
            {contractAddress.length > 25
              ? `${contractAddress.slice(0, 12)}...${contractAddress.slice(-8)}`
              : contractAddress}
          </strong>
        </div>
      </div>
    </section>
  );
};

export default BlockchainStatus;