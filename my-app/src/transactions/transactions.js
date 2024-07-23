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
      setAccounts((prevAccounts) => {
        const newAccounts = [...prevAccounts];
        if (updatedAccount.fromAccount) {
          const fromIndex = newAccounts.findIndex(acc => acc.acId === updatedAccount.fromAccount.acId);
          if (fromIndex !== -1) {
            newAccounts[fromIndex] = updatedAccount.fromAccount;
          }
        }
        if (updatedAccount.toAccount) {
          const toIndex = newAccounts.findIndex(acc => acc.acId === updatedAccount.toAccount.acId);
          if (toIndex !== -1) {
            newAccounts[toIndex] = updatedAccount.toAccount;
          }
        }
        return newAccounts;
      });
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
