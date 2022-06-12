import React from "react";

const NewPayment = ({ isError, arrSetValue, onNewPaymentSubmit, onChange, onReset, onSetValue, appState}) => {
  const message = !appState.isCalcOver
    ? (`In order to be debt free you need to make a minimum monthly payment of <span>$${appState.minPayment}</span>`)
    : (`<h2>You are now debt free!</h2>`)
  return (
    <>
      <div id="calcGeneralInfo" className="payment-info-message payment-info-item" dangerouslySetInnerHTML={{__html: message}}/>
      {!appState.isCalcOver ? (
        <form className="payment-info-form payment-info-item">
          <div id="paymentContainer" className={`payment-amount ${isError}`}>
            <input
              id="paymentAmount"
              type="number"
              min="0"
              placeholder={`not less than ${appState.minPayment}`}
              step="100"
              defaultValue="0"
              value={appState.payment}
              onChange={onChange}/>
            <div id="errorMessage" className="errorMessage">{appState.inputError}</div>
            <div id="setValueLinks" className="setValueLinks">
              {Object.entries(arrSetValue).map(([key, val]) => (
                <a href="/#" onClick={() => onSetValue(key)}>{val}</a>
              ))}
            </div>
          </div>
          <input
            id="paymentSubmit"
            type="button"
            className="submit-button"
            onClick={onNewPaymentSubmit}
            value="Submit payment"
            disabled={appState.isPaymentBlocked}
          />
        </form>
      ) : (
        <form className="payment-info-form payment-info-item">
          <input
            id="resetCalc"
            type="button"
            className="submit-button invisible"
            onClick={onReset}
            value="New Loan"
          />
        </form>
      ) }
    </>

  )
}

export default NewPayment;
