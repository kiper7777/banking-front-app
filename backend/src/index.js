const express = require('express');
const cors = require('cors');
const { createNewAccount, deposit, withdraw, balance, transfer } = require('./handlers');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/create', (req, res) => {
  createNewAccount(req.body, (msg) => {
    res.json({ 'sts': 'success', msg });
  });
});

app.post('/deposit', (req, res) => {
  deposit(req.body, (msg) => {
    res.json({ 'sts': 'success', msg });
  });
});

app.put('/transfer', (req, res) => {
  transfer(req.body, (msg) => {
    res.json({ 'sts': 'success', msg });
  });
});

app.post('/withdraw', (req, res) => {
  withdraw(req.body, (msg) => {
    res.json({ 'sts': 'success', msg });
  });
});

app.post('/balance', (req, res) => {
  balance(req.body, (msg) => {
    res.json({ 'sts': 'success', msg });
  });
});

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
