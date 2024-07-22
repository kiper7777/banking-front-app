// src/transactions/transactions.js
import React, { useState, useEffect } from 'react';
import styles from './transactions.module.css';

export function Transactions({ updatedAccount }) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/accounts')
      .then(res => res.json())
      .then(data => setAccounts(data))
      .catch(error => console.error('Error fetching accounts:', error));
  }, []);

  useEffect(() => {
    if (updatedAccount) {
      setAccounts(prevAccounts => 
        prevAccounts.map(account =>
          account.acId === updatedAccount.acId ? updatedAccount : account
        )
      );
    }
  }, [updatedAccount]);

  return (
    <div className={styles.transCont}>
      <h1>Transactions</h1>
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.acId}>
              <td>{account.acId}</td>
              <td>{account.acNm}</td>
              <td>{account.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// // src/transactions/transactions.js
// import React, { useState, useEffect } from 'react';
// import styles from './transactions.module.css';

// export function Transactions({ updatedAccount }) {
//   const [accounts, setAccounts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/accounts')
//       .then(res => res.json())
//       .then(data => setAccounts(data))
//       .catch(error => console.error('Error fetching accounts:', error));
//   }, []);

//   useEffect(() => {
//     if (updatedAccount) {
//       setAccounts(prevAccounts => 
//         prevAccounts.map(account =>
//           account.acId === updatedAccount.acId ? updatedAccount : account
//         )
//       );
//     }
//   }, [updatedAccount]);

//   return (
//     <div className={styles.transCont}>
//       <h1>Transactions</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Account ID</th>
//             <th>Account Name</th>
//             <th>Balance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {accounts.map((account) => (
//             <tr key={account.acId}>
//               <td>{account.acId}</td>
//               <td>{account.acNm}</td>
//               <td>{account.balance}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
