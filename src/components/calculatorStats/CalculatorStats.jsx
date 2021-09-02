import React from "react";

class CalculatorStats extends React.Component {
  render() {
    const appState = this.props.appState;
    if (appState.isCalcSet) {
      return (
          <div className="calculator-right">
            <div className="info-group">
              <div className="data-info info-group-item">
                <div className="data-info-message data-info-item">
                  Your next payment is (not less than)
                </div>
                <div className="data-info-payment data-info-item">
                  <span>$</span>
                  {appState.minPayment}
                </div>
                <div className="data-info-stats data-info-item">
                  <div className="stats-item">
                    <div className="stats-item-header">
                      Balance
                    </div>
                    <div className="stats-item-value">
                      {appState.balance}
                    </div>
                  </div>
                  <div className="stats-item">
                    <div className="stats-item-header">
                      Principal, paid
                    </div>
                    <div className="stats-item-value">
                      {appState.principalPaid}
                    </div>
                  </div>
                  <div className="stats-item">
                    <div className="stats-item-header">
                      Interest, paid
                    </div>
                    <div className="stats-item-value">
                      {appState.interestPaid}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )
    } else {
      return (
          <div className="calculator-right">
            <div className="info-group">
              <div className="no-data-info info-group-item">
                <i className="fas fa-arrow-left"></i>
                Choose and submit parameters on the sliders first, please
              </div>
            </div>
          </div>
      )
    }

  }
}

export default CalculatorStats;