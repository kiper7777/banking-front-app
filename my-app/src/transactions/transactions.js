import React, { useEffect, useState } from 'react';
import styles from './transactions.module.css';

export function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data.transactions))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className={styles.transCont}>
      <h1>Transactions</h1>
      <table className={styles.transTable}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Account ID</th>
            <th>To Account ID</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.type}</td>
              <td>{transaction.accountId || transaction.fromAccountId}</td>
              <td>{transaction.toAccountId || 'N/A'}</td>
              <td>{transaction.amount}</td>
              <td>{new Date(transaction.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
