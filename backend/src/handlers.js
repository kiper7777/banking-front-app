// src/handlers.js

let accounts = {};  // In-memory storage for accounts
let nextAccountId = 1;

// Function to create a new account
function createNewAccount(data, callback) {
  const { name } = data;
  const accountId = nextAccountId++;
  accounts[accountId] = { name, balance: 0 };
  callback(`Account created for ${name} with ID ${accountId}`);
}

// Function to deposit money into an account
function deposit(data, callback) {
  const { accountId, amount } = data;
  if (accounts[accountId]) {
    accounts[accountId].balance += amount;
    callback(`Deposited $${amount} to account ID ${accountId}`);
  } else {
    callback(`Account ID ${accountId} not found`);
  }
}

// Function to withdraw money from an account
function withdraw(data, callback) {
  const { accountId, amount } = data;
  if (accounts[accountId]) {
    if (accounts[accountId].balance >= amount) {
      accounts[accountId].balance -= amount;
      callback(`Withdrew $${amount} from account ID ${accountId}`);
    } else {
      callback(`Insufficient funds in account ID ${accountId}`);
    }
  } else {
    callback(`Account ID ${accountId} not found`);
  }
}

// Function to check the balance of an account
function balance(data, callback) {
  const { accountId } = data;
  if (accounts[accountId]) {
    callback(`Balance for account ID ${accountId} is $${accounts[accountId].balance}`);
  } else {
    callback(`Account ID ${accountId} not found`);
  }
}

// Function to transfer money between accounts
function transfer(data, callback) {
  const { fromAccountId, toAccountId, amount } = data;
  if (accounts[fromAccountId] && accounts[toAccountId]) {
    if (accounts[fromAccountId].balance >= amount) {
      accounts[fromAccountId].balance -= amount;
      accounts[toAccountId].balance += amount;
      callback(`Transferred $${amount} from account ID ${fromAccountId} to account ID ${toAccountId}`);
    } else {
      callback(`Insufficient funds in account ID ${fromAccountId}`);
    }
  } else {
    callback(`One or both account IDs not found`);
  }
}

module.exports = { createNewAccount, deposit, withdraw, balance, transfer };
