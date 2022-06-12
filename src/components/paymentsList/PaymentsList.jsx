const PaymentsList = ({payments}) => {
  const dataCols = ['Date', 'Amount', 'Interest', 'Principal'];
  return (
    <div className="payments-list payment-info-item">
      {(payments.length > 0) && (
        <>
          <div className="payments-table-heading">
            {dataCols.map(item => (<div key={item} className="payment-table-item">{item}</div>))}
          </div>
          <div className="payments">
            {payments.map((payment, index) => (
              <div key={payment.date + index} className="payment-detail">
                <div className="payment-date">{payment.date}</div>
                <div className="payment-amount">${payment.amount}</div>
                <div className="payment-interest">${payment.interest}</div>
                <div className="payment-principal">${payment.principal}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}


export default PaymentsList;
