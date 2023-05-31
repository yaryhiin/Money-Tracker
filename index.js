const accNameEl = document.querySelector('#acc-name');
const accBalEl = document.querySelector('#acc-bal');
const accCurEl = document.querySelector('#acc-cur');
const accIconEl = document.querySelector('#acc-icon');
const saveAccBtn = document.querySelector('#save-acc-btn');

const changeNameEl = document.querySelector('#change-name');
const changeBalEl = document.querySelector('#change-bal');
const changeCurEl = document.querySelector('#change-cur');
const changeIconEl = document.querySelector('#change-icon');
const changeAccBtn = document.querySelector('#change-acc-btn');

const incomeAmountEl = document.querySelector('#income-amount');
const incomeCategoryEl = document.querySelector('#income-category');
const incomeMethodEl = document.querySelector('#income-method');
const incomeDateEl = document.querySelector('#income-date');
const saveIncomeBtn = document.querySelector('#save-income-btn');

const expenseAmountEl = document.querySelector('#expense-amount');
const expenseCategoryEl = document.querySelector('#expense-category');
const expenseMethodEl = document.querySelector('#expense-method');
const expenseDateEl = document.querySelector('#expense-date');
const saveExpenseBtn = document.querySelector('#save-expense-btn');

const transferAmountEl = document.querySelector('#transfer-amount');
const transferMethodFromEl = document.querySelector('#transfer-method-from');
const transferMethodToEl = document.querySelector('#transfer-method-to');
const transferDateEl = document.querySelector('#transfer-date');
const saveTransferBtn = document.querySelector('#save-transfer-btn');

const incomeBtn = document.querySelector('#income-btn');
const expenseBtn = document.querySelector('#expense-btn');
const transferBtn = document.querySelector('#transfer-btn');

const deleteAccBtn = document.querySelector('#delete-acc-btn');
const deleteTransBtn = document.querySelector('#delete-trans-btn');

const changeTransTypeEl = document.querySelector('#trans-change-type');
const changeTransAmountEl = document.querySelector('#trans-change-amount');
const changeTransCategoryEl = document.querySelector('#trans-change-category');
const changeTransMethodEl = document.querySelector('#trans-change-method');
const changeTransDateEl = document.querySelector('#trans-change-date');
const changeTransBtn = document.querySelector('#trans-change-btn');

const accountsListEl = document.querySelector('#accounts');
const transactionsListEl = document.querySelector('#transactions')
let list = "";
let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let accNumber = JSON.parse(localStorage.getItem('accNumber'));
let transNumber = JSON.parse(localStorage.getItem('transNumber'));
let transType = JSON.parse(localStorage.getItem('transType'));

function mainPageLoaded() {
    if (accounts.length < 1) {
        incomeBtn.addEventListener('click', function () {
            alert("First of all, you need to have at least 1 account to add income");
        })
        expenseBtn.addEventListener('click', function () {
            alert("First of all, you need to have at least 1 account to add expense");
        })
        transferBtn.addEventListener('click', function () {
            alert("First of all, you need to have at least 2 accounts to make transfer");
        })
    } else {
        if (accounts.length < 2) {
            transferBtn.addEventListener('click', function () {
                alert("First of all, you need to have at least 2 accounts to make transfer");
            })
        } else {
            transferBtn.addEventListener('click', function () {
                loadPage('transfer.html');
            })
        }
        incomeBtn.addEventListener('click', function () {
            loadPage('income.html');
        })
        expenseBtn.addEventListener('click', function () {
            loadPage('expense.html');
        })
    }
}

function addAccountLoaded() {
    saveAccBtn.addEventListener('click', function () {
        if (accounts.length > 0) {
            accNumber++;
        }
        else {
            accNumber = 1;
        }
        const accName = accNameEl.value;
        const accBal = parseInt(accBalEl.value);
        const accCur = accCurEl.value;
        const accIcon = accIconEl.value;

        if (accName && !isNaN(accBal)) {
            const account = {
                name: accName,
                balance: accBal,
                currency: accCur,
                icon: accIcon,
                number: accNumber
            };

            accounts.push(account);
            saveAccounts();
            saveAccNumber();
        }
    })
}

function accountsLoaded() {
    changeAccBtn.addEventListener('click', function () {
        const accName = changeNameEl.value;
        const accBal = parseInt(changeBalEl.value);
        const accCur = changeCurEl.value;
        const accIcon = changeIconEl.value;
        if (accName && !isNaN(accBal)) {
            const account = {
                name: accName,
                balance: accBal,
                currency: accCur,
                icon: accIcon,
                number: accNumber
            };
            accounts[accNumber - 1] = account;
            saveAccounts();
            saveAccNumber();
        }
    })
    deleteAccBtn.addEventListener('click', function () {
        if (transactions.length > 0) {
            let i = 0;
            while (i < transactions.length) {
                if (transactions[i].method == accNumber) {
                    transactions.splice(i, 1);
                } else {
                    i++;
                }
                if (transactions.length == 0) {
                    break;
                }
            }
            saveTransactions();
        }
        if (transactions.length > 0) {
            for (let i = 0; i < transactions.length; i++) {
                if (accounts[accNumber - 1].number < transactions[i].method) {
                    transactions[i].method--;
                }
            }
        }
        accounts.splice(accNumber - 1, 1);
        if (accounts.length > 0) {
            for (let i = 0; i < accounts.length; i++) {
                accounts[i].number = i + 1;
            }
        }
        if (transactions.length > 0) {
            for (let i = 0; i < transactions.length; i++) {
                transactions[i].number = i + 1;
            }
            transNumber = transactions[transactions.length - 1].number;
            saveTransactions();
            saveTransNumber();
        }
        if (accounts.length > 0) {
            accNumber = accounts[accounts.length - 1].number;
        } else {
            accNumber = 1;
        }
        saveAccounts();
        saveAccNumber();
    })
}

function incomeLoaded() {
    saveIncomeBtn.addEventListener('click', function () {
        if (transactions.length > 0) {
            transNumber++;
        }
        else {
            transNumber = 1;
        }
        const incomeAmount = parseInt(incomeAmountEl.value);
        const incomeCategory = incomeCategoryEl.value;
        const incomeMethod = parseInt(incomeMethodEl.value);
        const transType = 'Income';
        const incomeDate = incomeDateEl.value;
        const income = {
            amount: incomeAmount,
            category: incomeCategory,
            method: incomeMethod,
            number: transNumber,
            type: transType,
            date: incomeDate
        };
        accounts[incomeMethod - 1].balance += incomeAmount;
        transactions.push(income);
        saveAccounts();
        saveTransactions();
        saveTransNumber();
    })
}

function expenseLoaded() {
    saveExpenseBtn.addEventListener('click', function () {
        transNumber++;
        const expenseAmount = parseInt(-expenseAmountEl.value);
        const expenseCategory = expenseCategoryEl.value;
        const expenseMethod = parseInt(expenseMethodEl.value);
        const transType = 'Expense';
        const expenseDate = expenseDateEl.value;
        const expense = {
            amount: expenseAmount,
            category: expenseCategory,
            method: expenseMethod,
            number: transNumber,
            type: transType,
            date: expenseDate
        };
        accounts[expenseMethod - 1].balance += expenseAmount;
        transactions.push(expense);
        saveAccounts();
        saveTransactions();
        saveTransNumber();
    })
}

function transferLoaded() {
    saveTransferBtn.addEventListener('click', function () {
        const transferAmount = parseInt(transferAmountEl.value);
        const transferMethodFrom = parseInt(transferMethodFromEl.value);
        const transferMethodTo = parseInt(transferMethodToEl.value);
        accounts[transferMethodFrom - 1].balance -= transferAmount;
        accounts[transferMethodTo - 1].balance += transferAmount;
        saveAccounts();
    })
}

function transactionChangeLoaded() {
    changeTransBtn.addEventListener('click', function () {
        let previousTransType = JSON.parse(localStorage.getItem("transType"));
        const transType = changeTransTypeEl.value;
        let transAmount = 0;
        if (transType == 'Income') {
            transAmount = parseInt(changeTransAmountEl.value);
        } else {
            transAmount = parseInt(-changeTransAmountEl.value);
        }
        const transCategory = changeTransCategoryEl.value;
        const transMethod = parseInt(changeTransMethodEl.value);
        const transDate = changeTransDateEl.value;
        const change = {
            amount: transAmount,
            category: transCategory,
            method: transMethod,
            number: transNumber,
            type: transType,
            date: transDate
        };
        transactions[transNumber - 1] = change;
        if (previousTransType != transType) {
            transAmount *= 2;
        }
        accounts[accNumber - 1].balance += transAmount;
        saveAccounts();
        saveAccNumber();
        saveTransactions();
        saveTransNumber();
    })
    deleteTransBtn.addEventListener('click', function () {
        transactions.splice(transNumber - 1, 1);
        for (let i = transNumber - 1; i < transactions.length; i++) {
            transactions[i].number--;
            transNumber++;
        }
        saveTransactions();
        const transType = changeTransTypeEl.value;
        if (transType == 'Income') {
            transAmount = parseInt(-changeTransAmountEl.value);
        } else {
            transAmount = parseInt(changeTransAmountEl.value);
        }
        accounts[accNumber - 1].balance += transAmount;
        saveAccounts();
        transNumber--;
        saveTransNumber();
    })
}

function saveAccounts() {
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

function saveAccNumber() {
    localStorage.setItem('accNumber', JSON.stringify(accNumber));
}

function saveTransNumber() {
    localStorage.setItem('transNumber', JSON.stringify(transNumber));
}

function saveTransType() {
    localStorage.setItem('transType', JSON.stringify(transType));
}

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function displayAccInfo() {
    changeNameEl.value = accounts[accNumber - 1].name;
    changeBalEl.value = accounts[accNumber - 1].balance;
    changeCurEl.value = accounts[accNumber - 1].currency;
    changeIconEl.value = accounts[accNumber - 1].icon;
}

function giveAccInfo(number) {
    number = parseInt(number);
    localStorage.setItem("accNumber", JSON.stringify(number));
}

function displayTransInfo() {
    changeTransTypeEl.value = transactions[transNumber - 1].type;
    if (transactions[transNumber - 1].type == "Expense") {
        changeTransAmountEl.value = -transactions[transNumber - 1].amount;
    } else {
        changeTransAmountEl.value = transactions[transNumber - 1].amount;
    }
    changeTransCategoryEl.value = transactions[transNumber - 1].category;
    changeTransMethodEl.value = transactions[transNumber - 1].method;
    changeTransDateEl.value = transactions[transNumber - 1].date;
}

function giveTransInfo(number, type) {
    number = parseInt(number);
    localStorage.setItem("transNumber", JSON.stringify(number));
    localStorage.setItem("transType", JSON.stringify(type));
}

function displayAccounts() {
    accountsListEl.innerHTML = '';
    list = "";
    for (let i = 0; i < accounts.length; i++) {
        list += `
        <div class="account" onclick="loadPage('accounts.html'); giveAccInfo('${accounts[i].number}')">
            <img class="acc-icon" src="images/accounts/${accounts[i].icon}.png">
            <p class="acc-name">
                ${accounts[i].name}
            </p>
            <p class="acc-amount">
                ${accounts[i].balance}
            </p>
            <p class="acc-currency">
                ${accounts[i].currency}
            </p>
        </div>
        `
    }
    if (accounts.length < 4) {
        list += `
        <div class="account" onclick="loadPage('addAccount.html')">
            <img style="position:relative; top: 25%" src="images/buttons/add_btn.png">
        </div>
        `
    }
    accountsListEl.innerHTML = list;
}

function displayTransactions() {
    transactionsListEl.innerHTML = '';
    list = "";
    for (let i = transactions.length - 1; i >= 0; i--) {
        const transaction = transactions[i];
        if (transactions.length - i <= 3) {
            if (transaction.amount >= 0) {
                list += `
                <div class="transaction" onclick="loadPage('transaction-change.html'); giveTransInfo('${transaction.number}', '${transaction.type}'); giveAccInfo('${transaction.method}')">
                <div class="transaction-details">
                  <div class="left-details">
                    <p class="trans-name">${transaction.category}</p>
                    <p class="trans-method">${accounts[transaction.method - 1].name}</p>
                  </div>
                  <div class="right-details">
                    <p class="trans-amount-income">${transaction.amount}</p>
                    <p class="trans-currency-income">${accounts[transaction.method - 1].currency}</p>
                    <p class="trans-date">${transaction.date}</p>
                  </div>
                </div>
              </div>
          `;
            } else {
                list += `
                <div class="transaction" onclick="loadPage('transaction-change.html'); giveTransInfo('${transaction.number}', '${transaction.type}'); giveAccInfo('${transaction.method}')">
                <div class="transaction-details">
                  <div class="left-details">
                    <p class="trans-name">${transaction.category}</p>
                    <p class="trans-method">${accounts[transaction.method - 1].name}</p>
                  </div>
                  <div class="right-details">
                    <p class="trans-amount-expense">${transaction.amount}</p>
                    <p class="trans-currency-expense">${accounts[transaction.method - 1].currency}</p>
                    <p class="trans-date">${transaction.date}</p>
                  </div>
                </div>
              </div>
          `;
            }
        } else {
            break;
        }
    }
    transactionsListEl.innerHTML = list;
}

function displayAllTransactions() {
    transactionsListEl.innerHTML = '';
    list = "";
    if (transactions.length > 0) {
        for (let i = transactions.length - 1; i >= 0; i--) {
            const transaction = transactions[i];

            if (transaction.amount >= 0) {
                list += `
                <div class="transaction" onclick="loadPage('transaction-change.html'); giveTransInfo('${transaction.number}', '${transaction.type}'); giveAccInfo('${transaction.method}')">
                <div class="transaction-details">
                  <div class="left-details">
                    <p class="trans-name">${transaction.category}</p>
                    <p class="trans-method">${accounts[transaction.method - 1].name}</p>
                  </div>
                  <div class="right-details">
                    <p class="trans-amount-income">${transaction.amount}</p>
                    <p class="trans-currency-income">${accounts[transaction.method - 1].currency}</p>
                    <p class="trans-date">${transaction.date}</p>
                  </div>
                </div>
              </div>
              
          `;
            } else {
                list += `
                <div class="transaction" onclick="loadPage('transaction-change.html'); giveTransInfo('${transaction.number}', '${transaction.type}'); giveAccInfo('${transaction.method}')">
                <div class="transaction-details">
                  <div class="left-details">
                    <p class="trans-name">${transaction.category}</p>
                    <p class="trans-method">${accounts[transaction.method - 1].name}</p>
                  </div>
                  <div class="right-details">
                    <p class="trans-amount-expense">${transaction.amount}</p>
                    <p class="trans-currency-expense">${accounts[transaction.method - 1].currency}</p>
                    <p class="trans-date">${transaction.date}</p>
                  </div>
                </div>
              </div>
              
          `;
            }
        }
    } else {
        list = "You don't have any transactions yet";
    }
    transactionsListEl.innerHTML = list;
}

function loadPage(link) {
    window.location = link;
}

const fileName = window.location.pathname;
const currentPath = fileName.substring(fileName.lastIndexOf('/') + 1);

if (currentPath === 'index.html') {
    mainPageLoaded();
}

if (currentPath === 'addAccount.html') {
    addAccountLoaded();
}

if (currentPath === 'accounts.html') {
    accountsLoaded();
}

if (currentPath === 'income.html') {
    incomeLoaded();
}

if (currentPath === 'expense.html') {
    expenseLoaded();
}

if (currentPath === 'transfer.html') {
    transferLoaded();
}

if (currentPath === 'transaction-change.html') {
    transactionChangeLoaded();
}

function clearLocalStorage() {
    let result = window.confirm("Are you sure you want to delete everything?")
    if (result) {
        localStorage.clear();
        window.location = 'index.html';
    }
}
