import "./plasticCard.css";

const PlasticCard = ({
  cardTitle,
  amount,
  symbol,
  primary = false,
  handleOnClick = () => {},
}) => {
  return (
    <div
      className={primary ? "plastic-card" : "plastic-card not-primary-card"}
      onClick={handleOnClick}
    >
      <div className="plastic-card-specs-ctn">
        <span className="plastic-card-type">{cardTitle}</span>
        <span className="plastic-card-amount">{amount.toFixed(2)}</span>
      </div>
      <div className="plastic-card-symbol">{symbol}</div>
    </div>
  );
};

export default PlasticCard;
