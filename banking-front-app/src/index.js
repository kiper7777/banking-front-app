import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Dashboard} from './dashboard/dashboard';
import {NewCustomer} from './new-customer/new-customer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/create' element={<NewCustomer />} />
    </Routes>
  </BrowserRouter>

  // <h1>
  //   This Banking App
  // </h1>
);


 