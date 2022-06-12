const CalculatorSettings = ({onSubmit, onSliderChange, loan, interest}) => {
  const sliders = [
    {
      id: 'loan',
      label: 'Loan amount',
      valueIcon: '$',
      min: '5000',
      max: '250000',
      step: '1000',
      value: loan,
    },
    {
      id: 'interest',
      label: 'Interest',
      valueIcon: '$',
      min: '0.1',
      max: '15',
      step: '0.01',
      value: interest,
    },
  ];

  return (
    <form className="slider-group calculator-left-item">
      {sliders.map(slider => {
        const { id, label, valueIcon, min, max, step, value } = slider;
        return (
          <div className="slider-parameter">
            <div className="slider-title">{label}</div>
            <div className="slider-price">
              <span className="measure">{valueIcon}</span><span id={id + 'Label'} className="value">{value}</span>
            </div>
            <div className="slider">
              <input
                id={id}
                type="range"
                min={min}
                max={max}
                onChange={onSliderChange}
                data-label={id + 'Label'}
                defaultValue={[id]}
                step={step} />
              <div className="range-values">
                <div className="minimal">{slider.id === 'loan' ? (min.slice(-3) + ' K') : min}</div>
                <div className="maximal">{slider.id === 'loan' ? (max.slice(-3) + ' K') : max}</div>
              </div>
            </div>
          </div>
        )
      })}
      <input type="button" onClick={onSubmit} className="submit-button" value="Submit for calculation" />
    </form>
  )
}

export default CalculatorSettings;
