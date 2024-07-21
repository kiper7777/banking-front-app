// src/transactions/transactions.js
import React, { useEffect, useState } from 'react';
import styles from './transactions.module.css';

export function Transactions() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/accounts')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setAccounts(data.accounts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.transCont}>
      <h1>Account Balances</h1>
      {accounts.length === 0 ? (
        <div>No accounts found</div>
      ) : (
        <table className={styles.transTable}>
          <thead>
            <tr>
              <th>Account ID</th>
              <th>Account Name</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={index}>
                <td>{account.acId}</td>
                <td>{account.acNm}</td>
                <td>{account.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
