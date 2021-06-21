//Needs to be minimized
const display = document.querySelector(".display span");
const button = document.querySelector(".buttons");
const clear = document.querySelector(".clear");
let buffer = "0";
let runningTotal = 0;
let previousOperator = null;

function clickHandler() {
    button.addEventListener("click", event => {
        buttonClick(event.target.innerText);
        render();
    });
}

function buttonClick(value) {
    if (isNaN(parseFloat(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            previousOperator = null;
            runningTotal = 0;
            break;
        case "=":
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case "backspace":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function render() {
    display.innerText = buffer;
}

function handleMath(value) {
    const intBuffer = parseFloat(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}
clickHandler();
