import React from "react";

class PaymentsList extends React.Component {
  render() {
    const payments = this.props.payments;
    if (payments.length > 0) {
      return (
          <div className="payments-list payment-info-item">
            <div className="payments-table-heading">
              <div className="payment-table-item">Date</div>
              <div className="payment-table-item">Amount</div>
              <div className="payment-table-item">Interest</div>
              <div className="payment-table-item">Principal</div>
            </div>
            <div className="payments">
              {
                payments.map(function(payment, index) {
                  return (
                      [
                        <div key={ index } id={ index } className="payment-detail">
                          <div className="payment-date">{ payment.date }</div>
                          <div className="payment-amount">${ payment.amount }</div>
                          <div className="payment-interest">${ payment.interest }</div>
                          <div className="payment-principal">${ payment.principal }</div>
                        </div>,
                      ]
                  )
                })
              }
            </div>
          </div>
      )
    } else {
      return (
        <div className="payments-list payment-info-item"> </div>
      )
    }




  }
}

export default PaymentsList