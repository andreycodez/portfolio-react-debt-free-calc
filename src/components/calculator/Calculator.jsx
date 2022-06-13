import React from "react";
import CalculatorStats from "../calculatorStats/CalculatorStats";
import PaymentsList from "../paymentsList/PaymentsList";
import CalculatorSettings from "../calculatorSettings/CalculatorSettings";
import NewPayment from "../newPayment/NewPayment";

const INIT_STATE = {
  loan: 10000,
  balance: 0,
  interest: 6,
  interestUSD: () => ((this.state.interest / 100 * this.state.loan) / 12),
  interestPaymentCur: 0,
  isCalcSet: false,
  isPaymentBlocked: true,
  isCalcOver: false,
  minPayment: 0,
  maxPayment: () => (this.balance + this.interestPaymentCur),
  normalPayment: 0,
  payment: 0,
  payments: [],
  normalPayments: 0,
  principalPaid: 0,
  interestPaid: 0,
  inputError: '',
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  resetCalc = () => {
    this.setState(INIT_STATE);
  }

  normalPayment = (loan, interest) => {
    let isPaid = false;
    let balance = loan;
    let newBalance = 0;
    let newInterest = 0;
    let normalPayment = (loan / 100) + (interest / 100 / 12) * loan;
    let arrNormalPayments = [normalPayment];
    while (!isPaid) {
      newInterest = +(((interest / 100 / 12) * balance).toFixed(2));
      newBalance = +((balance - normalPayment + newInterest).toFixed(2));
      arrNormalPayments.push(newBalance);
      balance = newBalance;
      if ((balance < 0)) {
        isPaid = true;
      }
    }
    this.setState({
      normalPayments: arrNormalPayments.length,
      normalPayment: normalPayment,
    })
  }

  sliderHandle = (slider) => {
    slider.preventDefault();
    this.setState({
      [slider.target.id]: +slider.target.value,
    })
  }

  checkInputField = (targetValue) => {
    let errorText = '';
    let isBlocked = true;
    if (+targetValue < this.state.minPayment) {
      errorText = `The value is less than a minimum payment of $${this.state.minPayment}`;
    } else if (+targetValue > this.state.maxPayment) {
      errorText = `The value is higher than a maximum payment of $${this.state.maxPayment}`;
    } else {
      isBlocked = false
    }
    return {errorText: errorText, isBlocked: isBlocked}
  }

  inputHandleChange = (input) => {
    input.preventDefault();
    const checks = this.checkInputField(input.target.value)
    this.setState({
      inputError: checks.errorText,
      isPaymentBlocked: checks.isBlocked,
      payment: +input.target.value,
    })
  }

  easyPaymentClick = (value) => {
    this.setState({
      payment: this.state[`${value}Payment`],
      isPaymentBlocked: false,
      inputError: '',
    })
  }

  submitSlidersClickHandle = () => {
    const balance = this.state.loan;
    const interest = this.state.interest;
    const interestUSD = this.roundValue(balance * interest / 100);
    const principalPaymentCyr = this.roundValue(balance / 100);
    const interestPaymentCur = this.roundValue(interestUSD / 12);
    const minPayment = this.roundValue((balance / 100) + (interestUSD / 12));
    const maxPayment = this.roundValue((balance) + (interestUSD / 12));
    this.normalPayment(this.state.loan, this.state.interest);

    this.setState( {
        balance: balance,
        interest: interest,
        interestUSD: interestUSD,
        interestPaymentCur: interestPaymentCur,
        principalPaymentCur: principalPaymentCyr,
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
    const payment = this.roundValue(this.state.payment);
    const principalPaid = this.roundValue(payment - this.state.interestPaymentCur);
    const interestPaid = this.roundValue(this.state.interestPaymentCur);
    const oldBalance = this.state.balance
    const balance = this.roundValue(oldBalance - payment + this.state.interestPaymentCur);
    const interestUSD = balance * this.state.interest / 100;
    const minPayment = Math.round(((balance / 100) + (interestUSD / 12)) * 100) / 100;
    const newInterestPaymentCur = this.roundValue(balance * (this.state.interest / 100 / 12));
    const principalPaymentCyr = this.roundValue(balance / 100);
    const maxPayment = this.roundValue(balance + newInterestPaymentCur);
    const calcIsOver = (balance < 1);
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
      maxPayment: maxPayment,
      payment: this.roundValue(minPayment),
      payments: [...this.state.payments, newPayment],
      interestPaymentCur: newInterestPaymentCur,
      principalPaymentCur: principalPaymentCyr,
      principalPaid: this.roundValue(this.state.principalPaid + principalPaid),
      interestPaid: this.roundValue(this.state.interestPaid + interestPaid),
      isCalcOver: calcIsOver,
    })
  }

  render() {
    const appState = this.state
    const isError = appState.inputError.length ? 'incorrect' : '';
    const arrSetValue = {'min': 'Pay min amount', 'normal': 'Make normal payment', 'max': 'Close loan'};
      return (
        <div className="calculator-body">
          <div className="calculator-left">
            {appState.isCalcSet ? (
              <div className="payment-info  calculator-left-item">
                <NewPayment
                  isError={isError}
                  arrSetValue={arrSetValue}
                  onChange={this.inputHandleChange}
                  onNewPaymentSubmit={this.submitPaymentClickHandle}
                  onReset={this.resetCalc}
                  onSetValue={this.easyPaymentClick}
                  appState={appState} />
                <PaymentsList payments={appState.payments} />
              </div>
            ) : (
              <CalculatorSettings
                loan={appState.loan}
                interest={appState.interest}
                onSubmit={this.submitSlidersClickHandle}
                onSliderChange={this.sliderHandle}/>
            )}
          </div>
          <CalculatorStats appState={appState} />
        </div>
    )
  }
}

export default Calculator;
