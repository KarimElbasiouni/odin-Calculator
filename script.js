class Calculator {
    constructor(display){
        this.display = display;
        this.clear();
    }

    appendNum(number) {
        if (this.operator === undefined) {
            if (this.firstNumber === '0') {
                this.firstNumber = number;
            } else if (number === '.' && !this.firstNumber.includes('.')) {
                this.firstNumber += '.';
            } else if (number !== '.' && this.firstNumber.length <= 8) {
                this.firstNumber += number;
            }
        } else {
            if (this.secondNumber === '' || this.secondNumber === '.') {
                this.secondNumber = number;
            } else if (number === '.' && !this.secondNumber.includes('.')) {
                this.secondNumber += '.';
            } else if (number !== '.' && this.secondNumber.length <= 8) {
                this.secondNumber += number;
            }
        }
    }

    clear(){
        this.result = 0;
        this.firstNumber = '0';
        this.secondNumber = '';
        this.operator = undefined;

        
    }

    chooseOperation(operator){
        if (this.secondNumber !== '') {
            this.calculate();
            this.updateDisplay();
        }
        this.operator = operator;
    }

    percent(){
        if (this.secondNumber !== '') {
            this.calculate();
            this.updateDisplay();
        }
        this.firstNumber = (parseFloat(this.firstNumber) / 100).toString();
        this.firstNumber = this.limitToNineDigits(this.firstNumber);
        this.operator = undefined;
    }

    sign(){
        if(this.firstNumber == '0') return;
        if(this.operator == undefined){
            this.firstNumber = -parseFloat(this.firstNumber);
        }else if(this.secondNumber!== ''){
            this.secondNumber = -parseFloat(this.secondNumber);
        } 
    }

    limitToNineDigits(number) {
        let numStr = number.toString();
        let [integerPart, fractionalPart] = numStr.split('.');
    
        if (integerPart.length > 9) {
            return 'ERR';
        } 
        
        if (fractionalPart) {
            fractionalPart = fractionalPart.replace(/0+$/, '');
            if(integerPart.length + fractionalPart.length <= 9){
                return numStr;
            }
            fractionalPart = fractionalPart.slice(0, 9 - integerPart.length);

            if (fractionalPart === '') {
                return integerPart;
            } else {
                return integerPart + '.' + fractionalPart;
            }
        }
        return numStr;
    }

    calculate(){
        switch (this.operator){
            case '+':{
                this.result = parseFloat(this.firstNumber) + parseFloat(this.secondNumber);
                break;
            }
            case '-':{
                this.result = parseFloat(this.firstNumber) - parseFloat(this.secondNumber);
                break;
            }
            case '*':{
                this.result = parseFloat(this.firstNumber) * parseFloat(this.secondNumber);
                break;
            }
            case '/':{
                this.result = parseFloat(this.firstNumber) / parseFloat(this.secondNumber);
                break;
            }
            default:{
                return;
            }
        }
        this.firstNumber = this.limitToNineDigits(this.result);
        this.secondNumber = '';
        this.operator = undefined;
    }

    updateDisplay(){
        if(this.operator == undefined){
            this.display.innerText = this.firstNumber;
        }else if(this.secondNumber!== ''){
            this.display.innerText = this.secondNumber;
        }
    }
}




let currentInput = '';

const display = document.querySelector('.display');

const numberButtons = document.querySelectorAll('button.numbers');
const operatorButtons = document.querySelectorAll('button.operator');
const signButton = document.querySelector('button.sign');
const percentButton = document.querySelector('button.percent');
const equalsButton = document.querySelector('button.equals');
const decimalButton = document.querySelector('button.decimal');
const clearButton = document.querySelector('button.clear');


const calc = new Calculator(display);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNum(button.innerText);
        calc.updateDisplay();
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText);
        calc.updateDisplay();
    
    })
})

clearButton.addEventListener('click', () => {
    calc.clear();
    calc.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calc.calculate();
    calc.updateDisplay();
})

signButton.addEventListener('click', () => {
    calc.sign();
    calc.updateDisplay();
})
percentButton.addEventListener('click', () => {
    calc.percent();
    calc.updateDisplay();
})

decimalButton.addEventListener('click', () => {
    calc.appendNum(decimalButton.innerText);
    calc.updateDisplay();
})

function handleKeyboardInput(event){
    const key = event.key;
    
    if(!isNaN(parseInt(key)) || key === '.'){
        calc.appendNum(key);
    } else if(key === '+' || key === '-' || key === '/' || key === '*'){
        calc.chooseOperation(key);
    } else if(key === 'Enter' || key === '='){
        calc.calculate();
    } else if(key === 'Backspace'){
        calc.clear();
    } else if (key === 'S' || key === 's'){
        calc.sign();
    }else if(key === '%'){
        calc.percent();
    }
    calc.updateDisplay();

}
document.addEventListener('keyup', handleKeyboardInput);
