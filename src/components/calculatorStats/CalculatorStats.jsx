const CalculatorStats = ({appState: {isCalcSet, minPayment, balance, principalPaid, interestPaid}}) => {
  const data = {
    'Balance': balance,
    'Principal, paid': principalPaid,
    'Interest, paid': interestPaid,
  }
  return (
    <div className="calculator-right">
      <div className="info-group">
        {isCalcSet ? (
          <div className="data-info info-group-item">
            <div className="data-info-message data-info-item">
              Your next payment is (not less than)
            </div>
            <div className="data-info-payment data-info-item">
              <span>$</span>
              {minPayment}
            </div>
            <div className="data-info-stats data-info-item">
              {Object.entries(data).map(([key, value]) => (
                <div key={key} className="stats-item">
                  <div className="stats-item-header">
                    {key}
                  </div>
                  <div className="stats-item-value">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-data-info info-group-item">
            <i className="fas fa-arrow-left"></i>
            Choose and submit parameters on the sliders first, please
          </div>
        )}
      </div>
    </div>
  )
}

export default CalculatorStats;
