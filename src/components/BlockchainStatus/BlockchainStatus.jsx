import { useLanguage } from "../../context/LanguageContext";
import "./BlockchainStatus.css";

const BlockchainStatus = ({
  connected = true,
  network = "Local Test Network",
  blockNumber = "—",
  contractAddress,
}) => {
  const { t } = useLanguage();
  const displayContractAddress = contractAddress || t('bcNotConnected');

  return (
    <section className="blockchain-status">
      <div className="blockchain-status__header">
        <div className="blockchain-status__icon">⬡</div>

        <div>
          <span>{t('bcStatusNetwork')}</span>
          <h3>{connected ? t('bcStatusConnected') : t('bcStatusDisconnected')}</h3>
        </div>

        <span
          className={`blockchain-status__indicator ${
            connected ? "is-connected" : "is-disconnected"
          }`}
        >
          <span />
          {connected ? t('bcIndicatorConnected') : t('bcIndicatorOffline')}
        </span>
      </div>

      <div className="blockchain-status__details">
        <div>
          <span>{t('bcNetworkLabel')}</span>
          <strong>{network}</strong>
        </div>

        <div>
          <span>{t('bcLatestBlockLabel')}</span>
          <strong>{blockNumber}</strong>
        </div>

        <div>
          <span>{t('bcSmartContractLabel')}</span>
          <strong title={displayContractAddress}>
            {displayContractAddress.length > 25
              ? `${displayContractAddress.slice(0, 12)}...${displayContractAddress.slice(-8)}`
              : displayContractAddress}
          </strong>
        </div>
      </div>
    </section>
  );
};

export default BlockchainStatus;