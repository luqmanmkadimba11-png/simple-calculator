const display = document.getElementById("display");

let current = "0";
let previous = null;
let operator = null;
let resetNext = false;

function updateDisplay() {
  display.textContent = current;
}

function inputNumber(num) {
  if (resetNext) {
    current = "0";
    resetNext = false;
  }
  if (num === "." && current.includes(".")) return;
  current = current === "0" && num !== "." ? num : current + num;
}

function calculate(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? "Error" : a / b;
  }
}

function chooseOperator(op) {
  if (operator && !resetNext) {
    equals();
    if (current === "Error") return;
  }
  previous = parseFloat(current);
  operator = op;
  resetNext = true;
}

function equals() {
  if (operator === null || previous === null) return;
  const result = calculate(previous, parseFloat(current), operator);
  current = result === "Error" ? "Error" : String(parseFloat(result.toFixed(10)));
  previous = null;
  operator = null;
  resetNext = true;
}

function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  resetNext = false;
}

function deleteLast() {
  if (resetNext || current === "Error") return;
  current = current.length > 1 ? current.slice(0, -1) : "0";
}

function percent() {
  if (current === "Error") return;
  current = String(parseFloat(current) / 100);
}

document.querySelector(".buttons").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (current === "Error" && btn.dataset.action !== "clear") clearAll();

  if (btn.dataset.num !== undefined) inputNumber(btn.dataset.num);
  else if (btn.dataset.op) chooseOperator(btn.dataset.op);
  else if (btn.dataset.action === "equals") equals();
  else if (btn.dataset.action === "clear") clearAll();
  else if (btn.dataset.action === "delete") deleteLast();
  else if (btn.dataset.action === "percent") percent();

  updateDisplay();
});