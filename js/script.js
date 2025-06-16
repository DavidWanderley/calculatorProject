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
    if (digit === "." && this.currentOperation.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  processOperation(operation) {
    if (this.currentOperationsText.innerText === "") {
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
    console.log(operationValue, operation, current, previous);

    if (operationValue === null) {
      this.currentOperationsText.innerText += this.currentOperation;
    } else {
      if (previous === 0) {
        operationValue = current;
      }

      this.previousOperationsText.innerText = `${operationValue} ${operation}`;
      this.currentOperationsText.innerText = "";
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
