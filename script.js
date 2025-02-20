const buttons = document.querySelectorAll('.button');
const display = document.getElementById('display');
const clearButton = document.getElementById('clear');
const clearEntryButton = document.getElementById('clear-entry');
const backspaceButton = document.getElementById('backspace');
const equalsButton = document.getElementById('equals');

let currentInput = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === undefined) return;

        if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

clearButton.addEventListener('click', clear);
clearEntryButton.addEventListener('click', clearEntry);
backspaceButton.addEventListener('click', backspace);
equalsButton.addEventListener('click', calculate);

function clear() {
    currentInput = '';
    firstOperand = '';
    secondOperand = '';
    operator = '';
    updateDisplay('');
}

function clearEntry() {
    currentInput = '';
    updateDisplay('');
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}

function calculate() {
    if (firstOperand && operator && currentInput) {
        secondOperand = currentInput;

        let result;
        switch (operator) {
            case '+':
                result = parseFloat(firstOperand) + parseFloat(secondOperand);
                break;
            case '-':
                result = parseFloat(firstOperand) - parseFloat(secondOperand);
                break;
            case '*':
                result = parseFloat(firstOperand) * parseFloat(secondOperand);
                break;
            case '/':
                result = parseFloat(firstOperand) / parseFloat(secondOperand);
                break;
            default:
                return;
        }

        updateDisplay(result);
        currentInput = result.toString();
        firstOperand = '';
        secondOperand = '';
        operator = '';
    }
}

function setOperator(op) {
    if (currentInput) {
        if (firstOperand && operator) {
            calculate();
        } else {
            firstOperand = currentInput;
        }
        operator = op;
        currentInput = '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay(currentInput);
}

function updateDisplay(value) {
    display.value = value;
}
