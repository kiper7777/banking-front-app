// src/index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './dashboard/dashboard';
import { NewCustomer } from './new-customer/new-customer';
import { Transactions } from './transactions/transactions';
import { Withdraw } from './withdraw/withdraw';
import { Transfer } from './transfer/transfer';
import { Balance } from './balance/balance';

const App = () => {
  const [updatedAccount, setUpdatedAccount] = useState(null);

  const handleAccountUpdate = (fromAccount, toAccount) => {
    console.log('Accounts updated:', fromAccount, toAccount);
    setUpdatedAccount({ fromAccount, toAccount });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/create' element={<NewCustomer />} />
        <Route path='/transactions' element={<Transactions updatedAccount={updatedAccount} />} />
        <Route path='/withdraw' element={<Withdraw onAccountUpdate={handleAccountUpdate} />} />
        <Route path='/transfer' element={<Transfer onAccountUpdate={handleAccountUpdate} />} />
        <Route path='/balance' element={<Balance />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
