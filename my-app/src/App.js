import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './dashboard/dashboard';
import { NewCustomer } from './new-customer/new-customer';
import { Deposit } from './deposit/deposit';
import { Transactions } from './transactions/transactions';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/create' element={<NewCustomer />} />
      <Route path='/deposit' element={<Deposit />} />
      <Route path='/transactions' element={<Transactions />} />
    </Routes>
  </BrowserRouter>
);


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
