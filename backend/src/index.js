// backend/src/index.js
const express = require('express');
const cors = require('cors');
const { createNewAccount, deposit, withdraw, getAccounts } = require('./handlers');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/create', (req, res) => {
  createNewAccount(req.body, (msg) => {
    res.json({ 'sts': 'success', msg });
  });
});

app.put('/deposit', (req, res) => {
  deposit(req.body, (msg, account) => {
    if (account) {
      res.json({ 'sts': 'success', msg, account });
    } else {
      res.status(404).json({ 'sts': 'fail', msg });
    }
  });
});

app.put('/withdraw', (req, res) => {
  withdraw(req.body, (msg, account) => {
    if (account) {
      res.json({ 'sts': 'success', msg, account });
    } else {
      res.status(404).json({ 'sts': 'fail', msg });
    }
  });
});

app.get('/accounts', (req, res) => {
  getAccounts(req, res);
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// const express = require('express');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const accounts = [];

// // Route to create a new account
// app.post('/create', (req, res) => {
//   const { acId, acNm, balance } = req.body;

//   if (!acId || !acNm || balance === undefined) {
//     return res.status(400).json({ error: 'All fields are required: acId, acNm, balance' });
//   }

//   const accountExists = accounts.some(account => account.acId === acId);

//   if (accountExists) {
//     return res.status(400).json({ error: 'Account ID already exists' });
//   }

//   const newAccount = { acId, acNm, balance: Number(balance) };
//   accounts.push(newAccount);
//   res.json({ status: 'success', account: newAccount });
// });

// // Route to deposit amount
// app.put('/deposit', (req, res) => {
//   const { acId, amount } = req.body;

//   if (!acId || amount === undefined) {
//     return res.status(400).json({ error: 'All fields are required: acId, amount' });
//   }

//   const account = accounts.find(account => account.acId === acId);

//   if (!account) {
//     return res.status(404).json({ error: 'Account not found' });
//   }

//   account.balance += Number(amount);
//   res.json({ status: 'success', account });
// });

// // Route to withdraw amount
// app.put('/withdraw', (req, res) => {
//   const { acId, amount } = req.body;

//   if (!acId || amount === undefined) {
//     return res.status(400).json({ error: 'All fields are required: acId, amount' });
//   }

//   const account = accounts.find(account => account.acId === acId);

//   if (!account) {
//     return res.status(404).json({ error: 'Account not found' });
//   }

//   if (account.balance < Number(amount)) {
//     return res.status(400).json({ error: 'Insufficient balance' });
//   }

//   account.balance -= Number(amount);
//   res.json({ status: 'success', account });
// });

// // Route to get all accounts
// app.get('/accounts', (req, res) => {
//   res.json(accounts);
// });

// // Sample route
// app.get('/', (req, res) => {
//   res.send('Hello from the backend!');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
