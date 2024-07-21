// src/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initial data (empty to start with)
const accounts = [];

// Helper function to find account by ID
function findAccountById(acId) {
  return accounts.find(account => account.acId === acId);
}

// Route to get all accounts
app.get('/accounts', (req, res) => {
  res.json({ accounts });
});

// Route to create a new account
app.post('/create', (req, res) => {
  const { acId, acNm, balance } = req.body;
  if (findAccountById(acId)) {
    return res.status(400).json({ error: 'Account ID already exists' });
  }
  const newAccount = { acId, acNm, balance: Number(balance) };
  accounts.push(newAccount);
  res.json({ status: 'success', account: newAccount });
});

// Route to deposit amount
app.put('/deposit', (req, res) => {
  const { acId, amount } = req.body;
  const account = findAccountById(acId);
  if (account) {
    account.balance += Number(amount);
    res.json({ status: 'success', account });
  } else {
    res.status(404).json({ error: 'Account not found' });
  }
});

// Route to withdraw amount
app.put('/withdraw', (req, res) => {
  const { acId, amount } = req.body;
  const account = findAccountById(acId);
  if (account) {
    if (account.balance >= amount) {
      account.balance -= Number(amount);
      res.json({ status: 'success', account });
    } else {
      res.status(400).json({ error: 'Insufficient funds' });
    }
  } else {
    res.status(404).json({ error: 'Account not found' });
  }
});

// Route to transfer amount
app.put('/transfer', (req, res) => {
  const { fromAcId, toAcId, amount } = req.body;
  const fromAccount = findAccountById(fromAcId);
  const toAccount = findAccountById(toAcId);
  if (fromAccount && toAccount) {
    if (fromAccount.balance >= amount) {
      fromAccount.balance -= Number(amount);
      toAccount.balance += Number(amount);
      res.json({ status: 'success', fromAccount, toAccount });
    } else {
      res.status(400).json({ error: 'Insufficient funds' });
    }
  } else {
    res.status(404).json({ error: 'One or both accounts not found' });
  }
});

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
