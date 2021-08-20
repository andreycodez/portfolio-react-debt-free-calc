// import logo from './logo.svg';
import './App.css';
import Calculator from "./components/calculator/Calculator";

function App() {
  return (
    <div className="App">
      <div className="content-wrapper">
        <div className="calculator-wrapper">
          <div className="calculator-header">
            Debt free calculator
          </div>
          <div className="heading">
            Calculate your payments with a debt-free calculator
            <span>The tool is free to use, no payments are required!</span>
          </div>
          <Calculator />
        </div>
        <div className="divider">&nbsp;</div>
      </div>
    </div>
  );
}

export default App;
