import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './dashboard/dashboard';
import { NewCustomer } from './new-customer/new-customer';
import {Deposit} from './deposit/deposit';
import {Withdraw} from './withdraw/withdraw';
import {Transfer} from './transfer/transfer';
import {Balance} from './balance/balance';

import './index.css';

// function Dashboard() {
//   return <h1>Dashboard</h1>;
// }

// function NewCustomer() {
//   return <h1>New Customer</h1>;
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/new' element={<NewCustomer />} />
        <Route path='/deposit' element={<Deposit />} />
        <Route path='/withdraw' element={<Withdraw />} />
        <Route path='/transfer' element={<Transfer />} />
        <Route path='/balance' element={<Balance />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

