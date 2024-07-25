const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const accounts = [];

// Route to create a new account
app.post('/create', (req, res) => {
  const { acId, acNm, balance } = req.body;

  if (!acId || !acNm || balance === undefined) {
    return res.status(400).json({ error: 'All fields are required: acId, acNm, balance' });
  }

  const accountExists = accounts.some(account => account.acId === acId);

  if (accountExists) {
    return res.status(400).json({ error: 'Account ID already exists' });
  }

  const newAccount = { acId, acNm, balance: Number(balance) };
  accounts.push(newAccount);
  res.json({ status: 'success', account: newAccount });
});

// Route to deposit amount
app.put('/deposit', (req, res) => {
  const { acId, amount } = req.body;

  if (!acId || amount === undefined) {
    return res.status(400).json({ error: 'All fields are required: acId, amount' });
  }

  const account = accounts.find(account => account.acId === acId);

  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }

  account.balance += Number(amount);
  res.json({ status: 'success', account });
});

// Route to handle transfer
app.put('/transfer', (req, res) => {
  const { fromAcId, toAcId, amount } = req.body;

  const fromAccount = accounts.find(acc => acc.acId === fromAcId);
  const toAccount = accounts.find(acc => acc.acId === toAcId);

  if (!fromAccount || !toAccount) {
    return res.status(404).json({ sts: 'failure', msg: 'One or both accounts not found' });
  }

  if (fromAccount.balance < amount) {
    return res.status(400).json({ sts: 'failure', msg: 'Insufficient balance in source account' });
  }

  fromAccount.balance -= Number(amount);
  toAccount.balance += Number(amount);
  res.json({ sts: 'success', msg: 'Transfer successful', fromAccount, toAccount });
});

// Route to withdraw amount
app.put('/withdraw', (req, res) => {
  const { acId, amount } = req.body;

  if (!acId || amount === undefined) {
    return res.status(400).json({ error: 'All fields are required: acId, amount' });
  }

  const account = accounts.find(account => account.acId === acId);

  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }

  if (account.balance < Number(amount)) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  account.balance -= Number(amount);
  res.json({ status: 'success', account });
});

// Route to get balance for a specific account
app.get('/balance/:acId', (req, res) => {
  const { acId } = req.params;
  const account = accounts.find(account => account.acId === acId);

  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }

  res.json({ balance: account.balance });
});

// Route to get all accounts
app.get('/accounts', (req, res) => {
  res.json(accounts);
});

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
