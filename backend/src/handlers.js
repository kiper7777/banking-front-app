// backend/src/handlers.js
let accounts = [];

const createNewAccount = (data, callback) => {
  const newAccount = {
    acId: data.acId,
    acNm: data.acNm,
    balance: data.balance || 0,
  };
  accounts.push(newAccount);
  callback('Account created successfully');
};

const deposit = (data, callback) => {
  const account = accounts.find(acc => acc.acId === data.acId);
  if (account) {
    account.balance += parseFloat(data.amount);
    callback('Deposit successful', account);
  } else {
    callback('Account not found');
  }
};

const withdraw = (data, callback) => {
  const account = accounts.find(acc => acc.acId === data.acId);
  if (account) {
    if (account.balance >= parseFloat(data.amount)) {
      account.balance -= parseFloat(data.amount);
      callback('Withdraw successful', account);
    } else {
      callback('Insufficient funds');
    }
  } else {
    callback('Account not found');
  }
};

const getAccounts = (req, res) => {
  res.json(accounts);
};

module.exports = { createNewAccount, deposit, withdraw, getAccounts };


// // src/handlers.js

// let accounts = {};  // In-memory storage for accounts
// let transactions = [];  // In-memory storage for transactions
// let nextAccountId = 1;

// function createNewAccount(data, callback) {
//   const { name } = data;
//   const accountId = nextAccountId++;
//   accounts[accountId] = { name, balance: 0 };
//   callback(`Account created for ${name} with ID ${accountId}`);
// }

// function deposit(data, callback) {
//   const { accountId, amount } = data;
//   if (accounts[accountId]) {
//     accounts[accountId].balance += amount;
//     transactions.push({ type: 'deposit', accountId, amount, date: new Date() });
//     callback(`Deposited $${amount} to account ID ${accountId}`);
//   } else {
//     callback(`Account ID ${accountId} not found`);
//   }
// }

// function withdraw(data, callback) {
//   const { accountId, amount } = data;
//   if (accounts[accountId]) {
//     if (accounts[accountId].balance >= amount) {
//       accounts[accountId].balance -= amount;
//       transactions.push({ type: 'withdraw', accountId, amount, date: new Date() });
//       callback(`Withdrew $${amount} from account ID ${accountId}`);
//     } else {
//       callback(`Insufficient funds in account ID ${accountId}`);
//     }
//   } else {
//     callback(`Account ID ${accountId} not found`);
//   }
// }

// function balance(data, callback) {
//   const { accountId } = data;
//   if (accounts[accountId]) {
//     callback(`Balance for account ID ${accountId} is $${accounts[accountId].balance}`);
//   } else {
//     callback(`Account ID ${accountId} not found`);
//   }
// }

// function transfer(data, callback) {
//   const { fromAccountId, toAccountId, amount } = data;
//   if (accounts[fromAccountId] && accounts[toAccountId]) {
//     if (accounts[fromAccountId].balance >= amount) {
//       accounts[fromAccountId].balance -= amount;
//       accounts[toAccountId].balance += amount;
//       transactions.push({ type: 'transfer', fromAccountId, toAccountId, amount, date: new Date() });
//       callback(`Transferred $${amount} from account ID ${fromAccountId} to account ID ${toAccountId}`);
//     } else {
//       callback(`Insufficient funds in account ID ${fromAccountId}`);
//     }
//   } else {
//     callback(`One or both account IDs not found`);
//   }
// }

// function getTransactions(callback) {
//   callback(transactions);
// }

// module.exports = { createNewAccount, deposit, withdraw, balance, transfer, getTransactions };
