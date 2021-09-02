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
      isPaymentBlocked: true,
      minPayment: 0,
      maxPayment: 0,
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.isCalcSet && this.state.isPaymentBlocked) {
      const paymentSubmitButton = document.getElementById('paymentSubmit')
      paymentSubmitButton.setAttribute('disabled', '');
    }
  }

  sliderHandle = (slider) => {
    slider.preventDefault();
    const sliderLabel = document.getElementById(slider.target.dataset.label);
    sliderLabel.innerText = slider.target.value;
  }

  minPaymentClick = function() {
    const paymentField = document.getElementById('paymentAmount');
    paymentField.setAttribute('value', this.state.minPayment);
  }

  finalPaymentClick = function() {
    const paymentField = document.getElementById('paymentAmount');
    paymentField.setAttribute('value', this.state.balance + this.state.interestUSD / 12);
  }

  paymentFieldValueHandle = (e) => {
    e.preventDefault();
    const errorMessage = document.getElementById('errorMessage');
    const paymentContainer = document.getElementById('paymentContainer');
    const paymentButton = document.getElementById('paymentSubmit');

    const paymentButtonStateChange = (value) => {
      if (value === 'disabled') {
        paymentButton.setAttribute('disabled','');
        console.log('Button disabled');
      } else {
        paymentButton.removeAttribute('disabled');
        console.log('Button Enabled');
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

    const fieldValue = e.target.value;

    if (fieldValue < this.state.minPayment) {
      setErrorFieldState();
      errorMessage.innerHTML = `The value is less than a least monthly payment <br/><a href="#" onClick=${this.minPaymentClick}">Pay min amount</a>`
    } else if (fieldValue > this.state.maxPayment) {
      setErrorFieldState();
      errorMessage.innerHTML = `The value is higher than the final payment. <br/><a href="#" onClick=${this.finalPaymentClick}>Pay final payment</a>`
    } else {
      setValidFieldState();
      errorMessage.innerHTML = '';
    }
  }

  submitSlidersClickHandle = () => {
    const balance = +document.getElementById('amount').value || +document.getElementById('amountInput').defaultValue;
    const interest = +document.getElementById('interest').value || +document.getElementById('interestInput').defaultValue;
    const interestUSD = balance * interest / 100;
    const minPayment = Math.round(((balance / 100) + (interestUSD / 12))*100)/100;
    const maxPayment = Math.round(((balance) + (interestUSD / 12))*100)/100;
    const paymentsAmount = (balance + interestUSD) / minPayment;

    this.setState( {
        balance: balance,
        interest: interest,
        interestUSD: interestUSD,
        minPayment: minPayment,
        maxPayment: maxPayment,
        paymentsAmount: Math.floor(paymentsAmount) + 1,
        isCalcSet: true,
      }
    )
  }

  roundValue = (value) => {
    return Math.round(value * 100) / 100;
  }

  submitPaymentClickHandle = () => {
    console.log('submit button clicked');
    const paymentField = document.getElementById('paymentAmount');
    const payment = paymentField.value;
    const balance = this.state.balance - payment
    const interestUSD = balance * this.state.interest / 100;
    const minPayment = Math.round(((balance / 100) + (interestUSD / 12)) * 100) / 100;
    const paymentsAmount = (balance + interestUSD) / minPayment
    const interest = Math.round(interestUSD / 12 * 100) / 100;
    const principal = Math.round((payment - interest) * 100) /100
    const newPayment = {
      date: new Date().toLocaleDateString(),
      amount: payment,
      interest: interest,
      principal: principal,
    }
    this.setState((prevState) => ({
      ...prevState,
      balance: this.roundValue(balance),
      interestUSD: this.roundValue(interestUSD),
      minPayment: this.roundValue(minPayment),
      paymentsAmount: Math.floor(this.roundValue(paymentsAmount)) + 1,
      payments: [...this.state.payments, newPayment],
    }))
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
                    <span id="errorMessage"></span>
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