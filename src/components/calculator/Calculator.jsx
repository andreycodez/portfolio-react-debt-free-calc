import React from "react";
import CalculatorStats from "../calculatorStats/CalculatorStats";
import PaymentsList from "../paymentsList/PaymentsList";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      interest: 0,
      interestUSD: 0,
      paymentsAmount: 0,
    }
  }

  get interestUSD() {return this.interestUSD}
  get paymentsAmount() {return this.paymentsAmount}


  componentDidMount() {
    this.setState( (state) => (
        {
          amount: 100000,
          interest: 9.35,
          balance: 100000,
          minPayment: 0,
          isCalcSet: true,
          payments: [
              {
                date: '17.08.2021',
                amount: 800,
                interest: 245.37,
                principal: 554.63,
              },
              {
                date: '17.08.2021',
                amount: 800,
                interest: 245.37,
                principal: 554.63,
              },
              {
                date: '17.08.2021',
                amount: 800,
                interest: 245.37,
                principal: 554.63,
              },
          ],
          interestUSD: this.balance * this.interest / 100,
          paymentsAmount: this.balance / (this.amount * 0.1),
        }
      )
    )
  }


  render() {
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
                <PaymentsList payments={appState.payments} />
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