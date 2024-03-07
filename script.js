const expenseForm = document.getElementById("expense-form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const balanceElement = document.getElementById("balance");
const expenseList = document.getElementById("expense-list");

let balance = 0;
let expenses = [];

function addExpense(description, amount) {
  const expense = {
    id: Math.floor(Math.random() * 1000000),
    description,
    amount: +amount,
  };
  expenses.push(expense);
  updateLocalStorage();
  updateUI();
}

function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  updateLocalStorage();
  updateUI();
}

function updateLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateUI() {
  balance = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  balanceElement.textContent = balance.toFixed(2);
  expenseList.innerHTML = expenses
    .map(
      (expense) =>
        `<li class="expense-item">
            <span>${expense.description}</span>
            <span>Rs.${expense.amount.toFixed(2)}</span>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
        </li>`
    )
    .join("");
}

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = textInput.value.trim();
  const amount = amountInput.value.trim();
  if (description && amount) {
    addExpense(description, amount);
    textInput.value = "";
    amountInput.value = "";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  updateUI();
});
