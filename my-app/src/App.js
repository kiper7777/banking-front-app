// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './dashboard/dashboard';
import { NewCustomer } from './new-customer/new-customer';
import { Deposit } from './deposit/deposit';
import { Transactions } from './transactions/transactions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/create' element={<NewCustomer />} />
        <Route path='/deposit' element={<Deposit />} />
        <Route path='/transactions' element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
