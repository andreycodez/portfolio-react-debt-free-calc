import React from "react";
import CalculatorStats from "../calculatorStats/CalculatorStats";
import PaymentsList from "../paymentsList/PaymentsList";

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      loan: 0,
      balance: 0,
      interest: 0,
      interestUSD: 0,
      interestPaymentCur: 0,
      isCalcSet: false,
      isPaymentBlocked: true,
      isCalcOver: false,
      minPayment: 0,
      maxPayment: 0,
      payments: [],
      principalPaid: 0,
      interestPaid: 0,
    }
  }

  componentDidMount() {
    const amountLabel = document.getElementById('amountLabel');
    const interestLabel = document.getElementById('interestLabel');
    amountLabel.innerText = document.getElementById('amount').value;
    interestLabel.innerText = document.getElementById('interest').value;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.isCalcSet && this.state.isPaymentBlocked) {
      const paymentSubmitButton = document.getElementById('paymentSubmit')
      paymentSubmitButton.setAttribute('disabled', '');
    }
    if (this.state.isCalcOver) {
      const paymentField = document.getElementById('paymentAmount');
      paymentField.setAttribute('disabled', '');
    }
    console.log(this.state);
  }

  sliderHandle = (slider) => {
    slider.preventDefault();
    const sliderLabel = document.getElementById(slider.target.dataset.label);
    sliderLabel.innerText = slider.target.value;
  }

  minPaymentClick = () => {
    const paymentField = document.getElementById('paymentAmount');
    paymentField.setAttribute('value', this.state.minPayment);
    paymentField.value = this.state.minPayment;
    this.setCheckFieldValue(paymentField.value)
  }

  finalPaymentClick = () => {
    const paymentField = document.getElementById('paymentAmount');
    paymentField.setAttribute('value', this.state.maxPayment);
    paymentField.value = this.state.maxPayment;
    this.setCheckFieldValue(paymentField.value)
  }

  setCheckFieldValue = (value) => {
    const errorMessage = document.getElementById('errorMessage');
    const paymentContainer = document.getElementById('paymentContainer');
    const paymentButton = document.getElementById('paymentSubmit');
    const paymentField = document.getElementById('paymentAmount');

    const paymentButtonStateChange = (someValue) => {
      if (someValue === 'disabled') {
        paymentButton.setAttribute('disabled','');
      } else {
        paymentButton.removeAttribute('disabled');
      }
    }

    const setErrorFieldState = () => {
      paymentContainer.classList.remove('correct');
      paymentContainer.classList.add('incorrect');
      this.setState({
        isPaymentBlocked: true,
      })
      paymentButtonStateChange('disabled');
    }

    const setValidFieldState = () => {
      this.setState({
        isPaymentBlocked: false,
      })
      paymentButtonStateChange('enabled');
      if (paymentContainer.classList.contains('incorrect')) {
        paymentContainer.classList.remove('incorrect');
        paymentContainer.classList.add('correct');
      }
    }

    if (value < this.state.minPayment) {
      setErrorFieldState();
      errorMessage.innerHTML = "The value is less than a least monthly payment";
    } else if (value > this.state.maxPayment) {
      setErrorFieldState();
      errorMessage.innerHTML = "The value is higher than the final payment";
    } else if (value === 0 && this.state.isCalcOver) {
      setErrorFieldState();
      console.log('Loan Closed')
      errorMessage.innerHTML = "Loan Closed";
      paymentField.setAttribute('disabled','')
    } else {
      setValidFieldState();
      errorMessage.innerHTML = '';
    }
  }

  paymentFieldValueHandle = (e) => {
    this.setCheckFieldValue(e.target.value);
  }

  submitSlidersClickHandle = () => {
    const balance = +document.getElementById('amount').value || +document.getElementById('amountInput').defaultValue;
    const interest = +document.getElementById('interest').value || +document.getElementById('interestInput').defaultValue;
    const interestUSD = balance * interest / 100;
    const interestPaymentCur = this.roundValue(interestUSD / 12);
    const minPayment = Math.round(((balance / 100) + (interestUSD / 12))*100)/100;
    const maxPayment = Math.round(((balance) + (interestUSD / 12))*100)/100;

    this.setState( {
        loan: balance,
        balance: balance,
        interest: interest,
        interestUSD: interestUSD,
        interestPaymentCur: interestPaymentCur,
        minPayment: minPayment,
        maxPayment: maxPayment,
        isCalcSet: true,
      }
    )
  }

  roundValue = (value) => {
    return Math.round(value * 100) / 100;
  }

  submitPaymentClickHandle = () => {
    const paymentField = document.getElementById('paymentAmount');
    const payment = +paymentField.value;
    const principalPaid = this.roundValue(payment - this.state.interestPaymentCur);
    const interestPaid = this.state.interestPaymentCur;
    const oldBalance = this.state.balance
    const balance = this.roundValue(oldBalance - payment + this.state.interestPaymentCur);
    const interestUSD = balance * this.state.interest / 100;
    const minPayment = Math.round(((balance / 100) + (interestUSD / 12)) * 100) / 100;
    const newInterestPaymentCur = this.roundValue(balance * (this.state.interest / 100 / 12));
    let calcIsOver = false;
    if (balance <= 0) {
      calcIsOver = true;
    }

    const newPayment = {
      date: new Date().toLocaleDateString(),
      amount: payment,
      principal: principalPaid,
      interest: interestPaid,
    }
    this.setState({
      balance: this.roundValue(balance),
      interestUSD: this.roundValue(interestUSD),
      minPayment: this.roundValue(minPayment),
      payments: [...this.state.payments, newPayment],
      interestPaymentCur: newInterestPaymentCur,
      principalPaid: this.roundValue(this.state.principalPaid + principalPaid),
      interestPaid: this.roundValue(this.state.interestPaid + interestPaid),
      isCalcOver: calcIsOver,
    })
    paymentField.value = this.roundValue(minPayment);
  }

  render() {
    const appState = this.state
    if (appState.isCalcSet) {
      return (
          <div className="calculator-body">
            <div className="calculator-left">
              <div className="payment-info  calculator-left-item">
                <div className="payment-info-message payment-info-item">
                  In order to be debt free you need to make a minimum monthly payment of <span>${appState.minPayment}</span>
                </div>
                <form className="payment-info-form payment-info-item">
                  <div id="paymentContainer" className="payment-amount">
                    <input
                        id="paymentAmount"
                        type="number"
                        min="0"
                        placeholder={`not less than ${this.state.minPayment}`}
                        step="100"
                        defaultValue="0"
                        onChange={this.paymentFieldValueHandle}/>
                    <div id="errorMessage" className="errorMessage"></div>
                    <div className="setValueLinks">
                      <a href="#" onClick={this.minPaymentClick}>Pay min amount</a>
                      <a href="#" onClick={this.finalPaymentClick}>Close loan</a>
                    </div>
                  </div>
                  <input
                      id="paymentSubmit"
                      type="button"
                      className="submit-button"
                      onClick={this.submitPaymentClickHandle}
                      value="Submit payment"
                  />
                </form>
                <PaymentsList payments={appState.payments} />
              </div>
            </div>
            <CalculatorStats appState={appState} />
          </div>
      );
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
                    <input id="amount" type="range" min="10000" max="250000" onChange={this.sliderHandle} data-label={'amountLabel'} defaultValue="38000" step="1000" />
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
                    <input id="interest" type="range" min="0.1" max="15" onChange={this.sliderHandle} data-label={'interestLabel'} defaultValue="9.50" step="0.01" />
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