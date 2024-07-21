// src/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock data (replace with real data in your case)
const accounts = [
  { acId: '123', acNm: 'John Doe', balance: 1000 },
  { acId: '124', acNm: 'Jane Smith', balance: 2000 },
  { acId: '125', acNm: 'Mike Johnson', balance: 1500 }
];

app.get('/accounts', (req, res) => {
  res.json({ accounts });
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
