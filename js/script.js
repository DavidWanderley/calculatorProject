const previousOperationsText = document.querySelector("#previous-operations");
const currentOperationsText = document.querySelector("#current-operations");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationsText, currentOperationsText) {
    this.previousOperationsText = previousOperationsText;
    this.currentOperationsText = currentOperationsText;
    this.currentOperation = "";
  }

  addDigit(digit) {
    if (digit === "." && this.currentOperationsText.innerText.includes(".")) {
      return;
    }

    this.currentOperation += digit;
    this.currentOperationsText.innerText = this.currentOperation;
  }

  processOperation(operation) {
    if (this.currentOperationsText.innerText === "" && operation !== "C") {
      if (this.previousOperationsText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    let operationValue;
    const previous = +this.previousOperationsText.innerText.split(" ")[0];
    const current = +this.currentOperationsText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperation();
        break;
      case "CE":
        this.processClearOperation();
        break;
      case "C":
        this.processClearAllOperation();
        break;
      case "=":
        this.processEqualOperator();
        break;
      case "+/-":
        this.toggleSign();
        break;
      default:
        return;
    }
  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      return;
    } else {
      if (previous === 0) {
        operationValue = current;
      }

      this.previousOperationsText.innerText = `${operationValue} ${operation}`;
      this.currentOperationsText.innerText = "";
      this.currentOperation = "";
    }
  }

  changeOperation(operation) {
    const mathOperations = ["+", "-", "*", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationsText.innerText =
      this.previousOperationsText.innerText.slice(0, -1) + operation;
  }

  processDelOperation() {
    this.currentOperationsText.innerText =
      this.currentOperationsText.innerText.slice(0, -1);
  }

  processClearOperation() {
    this.currentOperationsText.innerText = "";
  }

  processClearAllOperation() {
    this.currentOperationsText.innerText = "";
    this.previousOperationsText.innerText = "";
  }

  processEqualOperator() {
    const operation = previousOperationsText.innerText.split(" ")[1];

    this.processOperation(operation);
  }

  toggleSign() {
    if (this.currentOperationsText.innerText !== "") {
      let value = parseFloat(this.currentOperationsText.innerText);
      value *= -1;
      this.currentOperationsText.innerText = value.toString();
      this.currentOperation = value.toString();
    }
  }
}

const calculator = new Calculator(
  previousOperationsText,
  currentOperationsText
);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calculator.addDigit(value);
    } else {
      calculator.processOperation(value);
    }
  });
});
