import React from "react";
import CalculatorStats from "../calculatorStats/CalculatorStats";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 100000,
      interest: 9.35,
      balance: 0,
      minPayment: 0,
      isCalcSet: true,
    }
  }


  render() {
    this.state.interestUSD = this.state.amount * this.state.interest / 100
    this.state.paymentsAmount = this.state.amount / (this.state.amount * 0.1)
    const appState = this.state
    if (appState.isCalcSet) {
      return (
          <div className="calculator-body">
            <div className="calculator-left">
              <div className="payment-info  calculator-left-item">
                <div className="payment-info-message payment-info-item">
                  In order to be debt free you need to make a minimum monthly payment of <span>$654,40</span> during
                  next <span>74</span> months
                </div>
                <form className="payment-info-form payment-info-item">
                  <div className="payment-amount correct">
                    <input type="number" placeholder="0,00" min="0" step=".05" value="423.5" />
                  </div>
                  <div className="payment-amount incorrect">
                    <input type="number" min="0" placeholder="0,00" step=".05" value="214.30" />
                    <span>The value is less than a least monthly payment <br/><a href="#">Pay min amount</a></span>
                  </div>
                  <input type="button" className="submit-button" value="Submit payment" />
                </form>
                <div className="payments-list payment-info-item">
                  <div className="payments-table-heading">
                    <div className="payment-table-item">Date</div>
                    <div className="payment-table-item">Amount</div>
                    <div className="payment-table-item">Interest</div>
                    <div className="payment-table-item">Principal</div>
                  </div>
                  <div className="payments">
                    <div id="1" className="payment-detail">
                      <div className="payment-date">11.04.2021</div>
                      <div className="payment-amount">$800</div>
                      <div className="payment-interest">$245,37</div>
                      <div className="payment-principal">$554.63</div>
                    </div>
                    <div id="2" className="payment-detail">
                      <div className="payment-date">11.04.2021</div>
                      <div className="payment-amount">$800</div>
                      <div className="payment-interest">$245,37</div>
                      <div className="payment-principal">$554.63</div>
                    </div>
                    <div id="3" className="payment-detail">
                      <div className="payment-date">11.04.2021</div>
                      <div className="payment-amount">$800</div>
                      <div className="payment-interest">$245,37</div>
                      <div className="payment-principal">$554.63</div>
                    </div>
                    <div id="4" className="payment-detail">
                      <div className="payment-date">11.04.2021</div>
                      <div className="payment-amount">$800</div>
                      <div className="payment-interest">$245,37</div>
                      <div className="payment-principal">$554.63</div>
                    </div>
                    <div id="5" className="payment-detail">
                      <div className="payment-date">11.04.2021</div>
                      <div className="payment-amount">$800</div>
                      <div className="payment-interest">$1245,37</div>
                      <div className="payment-principal">$554.63</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CalculatorStats appState={appState} />
          </div>
      )
    } else {
      return (
          <div className="calculator-body">
            <div className="calculator-left">
              <div className="slider-group calculator-left-item">
                <form className="slider-parameter">
                  <div className="slider-title">Loan amount</div>
                  <div className="slider-price">
                    <span className="measure">$</span><span className="value">120000</span>
                  </div>
                  <div className="slider">
                    <input type="range" min="50000" max="250000" defaultValue={appState.amount} step="1000" />
                    <div className="range-values">
                      <div className="minimal">50 K</div>
                      <div className="maximal">250 K</div>
                    </div>
                  </div>
                </form>
                <div className="slider-parameter">
                  <div className="slider-title">Interest</div>
                  <div className="slider-price">
                    <span className="measure">%</span><span className="value">9.35</span>
                  </div>
                  <div className="slider">
                    <input type="range" min="0.1" max="15" defaultValue={appState.interest} step="0.01" />
                    <div className="range-values">
                      <div className="minimal">0.1</div>
                      <div className="maximal">15</div>
                    </div>
                  </div>
                </div>
                <input type="button" className="submit-button" value="Submit for calculation" />
              </div>
            </div>
            <CalculatorStats appState={appState}/>
          </div>
      )
    }

  }
}

export default Calculator;