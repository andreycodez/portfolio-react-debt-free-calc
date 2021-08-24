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
      isCalcSet: false,
      minPayment: 0,
      paymentsAmount: 0,
      payments: [],
    }
  }

  componentDidMount() {
    const amountLabel = document.getElementById('amountLabel');
    const interestLabel = document.getElementById('interestLabel');
    amountLabel.innerText = document.getElementById('amount').value;
    interestLabel.innerText = document.getElementById('interest').value;
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  amountSliderHandle = (slider) => {
    slider.preventDefault();
    const sliderLabel = document.getElementById('amountLabel');
    sliderLabel.innerText = slider.target.value;
  }

  interestSliderHandle = (slider) => {
    slider.preventDefault();
    const sliderLabel = document.getElementById('interestLabel');
    sliderLabel.innerText = slider.target.value;
  }

  minPaymentClick = () => {
    const paymentField = document.getElementById('paymentAmount');
    paymentField.setAttribute('value', this.state.minPayment);
  }

  finalPaymentClick = () => {
    const paymentField = document.getElementById('paymentAmount');
    paymentField.setAttribute('value', this.state.balance + this.state.interestUSD / 12);
  }

  paymentFieldValueHandle = (e) => {
    e.preventDefault();
    const paymentField = document.getElementById('paymentAmount');
    const errorMessage = document.getElementById('errorMessage');
    const setErrorFieldState = function() {
      paymentField.classList.remove('correct');
      paymentField.classList.add('incorrect');
    }
    const setValidFieldState = function() {
      if (paymentField.classList.contains('incorrect')) {
        paymentField.classList.remove('incorrect');
        paymentField.classList.add('correct');
      } else { return }
    }
    if (e.target.value < this.state.minPayment) {
      setErrorFieldState();
      errorMessage.innerHTML = `The value is less than a least monthly payment <br/><a href="#" onClick="${this.state.minPaymentClick}">Pay min amount</a>`
    } else if (e.target.value > (this.balance + this.interestUSD)) {
      setErrorFieldState();
      errorMessage.innerHTML = `The value is higher than the final payment. <br/><a href="#" onClick="${this.state.finalPaymentClick}">Pay final payment</a>`
    } else {
      setValidFieldState();
    }
  }

  submitSlidersClickHandle = () => {
    const balance = +document.getElementById('amount').value || +document.getElementById('amountInput').defaultValue;
    const interest = +document.getElementById('interest').value || +document.getElementById('interestInput').defaultValue;
    const interestUSD = balance * interest / 100;
    const minPayment = Math.round(((balance / 100) + (interestUSD / 12))*100)/100;
    console.log(Math.round((balance / 100)));
    console.log(interestUSD / 12)
    const paymentsAmount = (balance + interestUSD) / minPayment

    this.setState( {
        balance: balance,
        interest: interest,
        interestUSD: interestUSD,
        minPayment: minPayment,
        paymentsAmount: Math.floor(paymentsAmount) + 1,
        isCalcSet: true,
      }
    )
  }

  roundValue = (value) => {
    return Math.round(value * 100) / 100;
  }

  submitPaymentClickHandle = () => {
    const paymentField = document.getElementById('paymentAmount');
    const payment = paymentField.value;
    const balance = this.state.balance - payment
    const interestUSD = balance * this.state.interest / 100;
    const minPayment = Math.round(((balance / 100) + (interestUSD / 12)) * 100) / 100;
    const paymentsAmount = (balance + interestUSD) / minPayment
    const newPayment = {
      date: new Date().toLocaleDateString(),
      amount: payment,
      interest: Math.round(interestUSD / 12 * 100) / 100,
      principal: Math.round((balance / 100) * 100) /100,
    }
    this.setState({
      balance: this.roundValue(balance),
      interestUSD: this.roundValue(interestUSD),
      minPayment: this.roundValue(minPayment),
      paymentsAmount: Math.floor(this.roundValue(paymentsAmount)) + 1,
      payments: [...this.state.payments, newPayment],
    })
  }

  render() {
    const appState = this.state
    console.log(appState.payments)
    if (appState.isCalcSet) {
      return (
          <div className="calculator-body">
            <div className="calculator-left">
              <div className="payment-info  calculator-left-item">
                <div className="payment-info-message payment-info-item">
                  In order to be debt free you need to make a minimum monthly payment of <span>${appState.minPayment}</span> during
                  next <span>{appState.paymentsAmount}</span> months
                </div>
                <form className="payment-info-form payment-info-item">
                  <div className="payment-amount incorrect">
                    <input id="paymentAmount" type="number" min="0" placeholder="0,00" step=".05" dafaultvalue="214.30" onChange={this.paymentFieldValueHandle}/>
                    <span id="errorMessage"></span>
                  </div>
                  <input type="button" className="submit-button" onClick={this.submitPaymentClickHandle} value="Submit payment" />
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
                    <span className="measure">$</span><span id="amountLabel" className="value">120000</span>
                  </div>
                  <div className="slider">
                    <input id="amount" type="range" min="10000" max="250000" onChange={this.amountSliderHandle} defaultValue="38000" step="1000" />
                    <div className="range-values">
                      <div className="minimal">50 K</div>
                      <div className="maximal">250 K</div>
                    </div>
                  </div>
                </form>
                <div className="slider-parameter">
                  <div className="slider-title">Interest</div>
                  <div className="slider-price">
                    <span className="measure">%</span><span id="interestLabel" className="value">9.35</span>
                  </div>
                  <div className="slider">
                    <input id="interest" type="range" min="0.1" max="15" onChange={this.interestSliderHandle} defaultValue="9.50" step="0.01" />
                    <div className="range-values">
                      <div className="minimal">0.1</div>
                      <div className="maximal">15</div>
                    </div>
                  </div>
                </div>
                <input type="button" onClick={this.submitSlidersClickHandle} className="submit-button" value="Submit for calculation" />
              </div>
            </div>
            <CalculatorStats appState={appState}/>
          </div>
      )
    }
  }
}

export default Calculator;