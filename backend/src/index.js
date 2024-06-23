const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// const {createNewAccount, deposit, withdraw, balance, transfer}

app.post('/create', express.json(), (req, res) => {
  createNewAccount(req.body, (msg) => {
    res.json({'sts' : 'success', msg})
  })
})

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// // this code will help you to create web app
// const {response} = require('express')
// const express = require('express');
// const app = express();
// const PORT = 5000

// const {createNewAccount, deposit, withdraw, balance, transfer}

// app.post('/create', express.json(), (req, res) => {
//   createNewAccount(req.body, (msg) => {
//     res.json({'sts' : 'success', msg})
//   })
// })

// app.put('/transfer', express.json(), (req, res) => {
//   transfer(req.body, msg => {
//     res.json({'sts' : 'success', msg})
//   })
// })