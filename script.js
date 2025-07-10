// Select elements
const transactionForm = document.getElementById("transactionForm");
const transactionName = document.getElementById("transactionName");
const transactionAmount = document.getElementById("transactionAmount");
const transactionType = document.getElementById("transactionType");
const transactionList = document.getElementById("transactionList");
const balanceDisplay = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Function to update local storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Function to update the balance
function updateBalance() {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const total = income - expense;
  balanceDisplay.textContent = total.toFixed(2);
}

// Function to render transaction list
function renderTransactions() {
  transactionList.innerHTML = "";

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.className = `transaction-item ${t.type}`;
    li.innerHTML = `
      ${t.name} - $${t.amount.toFixed(2)}
      <button class="delete-btn" onclick="deleteTransaction(${index})">X</button>
    `;
    transactionList.appendChild(li);
  });

  updateBalance();
}

// Function to add a transaction
transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = transactionName.value.trim();
  const amountValue = parseFloat(transactionAmount.value);
  const type = transactionType.value;

  if (!name || isNaN(amountValue) || amountValue <= 0) {
    alert("Please enter a valid name and amount greater than 0.");
    return;
  }

  const amount = Math.abs(amountValue); // Ensure positive amount

  transactions.push({ name, amount, type });
  updateLocalStorage();
  renderTransactions();

  transactionForm.reset();
});

// Function to delete a transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateLocalStorage();
  renderTransactions();
}

// Initial render on load
renderTransactions();
