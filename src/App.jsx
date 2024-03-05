import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const operations = ['/', 'x', '-', '+'];

  const [numberOnScreen, setNumberOnScreen] = useState('');
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operationSign, setOperationSign] = useState('');

  const handleButtonClick = (num) => {
    if (num === '.') {
      // Handle dot separately
      if (!numberOnScreen.includes('.')) {
        setNumberOnScreen((numberOnScreen) => numberOnScreen + num);
      }
    } else {
      if (numberOnScreen === '0') {
        setNumberOnScreen(num.toString());
      } else {
        setNumberOnScreen((numberOnScreen) => numberOnScreen + num);
      }
    }
  };

  const clearScreen = () => {
    setNumberOnScreen('');
    setNum1(0);
    setNum2(0);
  };

  const changeSign = () => {
    setNumberOnScreen((numberOnScreen) =>
      numberOnScreen.charAt(0) === '-' ? numberOnScreen.slice(1) : '-' + numberOnScreen
    );
  };

  const operationFunction = (op) => {
    setNumberOnScreen('');
    setNum1(parseFloat(numberOnScreen));
    setOperationSign(op);
  };

  const equalFunction = () => {
    let result = 0;
    setNumberOnScreen('');

    const parsedNum1 = parseFloat(num1);
    const parsedNum2 = parseFloat(numberOnScreen);

    if (!isNaN(parsedNum1) && !isNaN(parsedNum2)) {
      switch (operationSign) {
        case '+':
          result = Math.round((parsedNum1 + parsedNum2) * 10000) / 10000;
          setNumberOnScreen(result.toString());
          break;
        case '-':
          result = Math.round((parsedNum1 - parsedNum2) * 10000) / 10000;
          setNumberOnScreen(result.toString());
          break;
        case 'x':
          result = Math.round(parsedNum1 * parsedNum2 * 10000) / 10000;
          setNumberOnScreen(result.toString());
          break;
        case '/':
          if (parsedNum2 !== 0) {
            result = Math.round((parsedNum1 / parsedNum2) * 10000) / 10000;
            setNumberOnScreen(result.toString());
          } else {
            console.log('Error: División por cero');
          }
          break;
        default:
          setNumberOnScreen('');
      }

      console.log('El resultado de la operación es: ', result);
    }
  };

  return (
    <>
      <div className='items-organization'>
        <div className='panel'>
          <div className='screen'>
            <h1 htmlFor=''>{numberOnScreen}</h1>
          </div>
          <div id='functions'>
            <div className='ac button color-fuctions' onClick={clearScreen}>
              <h2>AC</h2>
            </div>
            <div className='sign button color-fuctions' onClick={changeSign}>
              <h2>+/-</h2>
            </div>
            <div className='dot button color-fuctions' onClick={() => handleButtonClick('.')}>
              <h2>.</h2>
            </div>
            <div className='operators'>
              {operations.map((operation, index) => (
                <div
                  key={index}
                  className='button color-operations'
                  onClick={() => operationFunction(operation)}
                >
                  <h2>{operation}</h2>
                </div>
              ))}
            </div>
            <div className='nums'>
              {numbers.map((number, index) => (
                <div
                  key={index}
                  className='button color-numbers'
                  onClick={() => handleButtonClick(number)}
                >
                  <h2>{number}</h2>
                </div>
              ))}
            </div>
            <div className='equal button color-operations' onClick={() => equalFunction()}>
              <h2>=</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
