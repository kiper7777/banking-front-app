// src/transfer/transfer.js
import React from 'react';
import styles from './transfer.module.css';

export function Transfer({ onAccountUpdate }) {
  const onTransfer = (e) => {
    e.preventDefault();

    const fromAcId = e.target.fromAcId.value;
    const toAcId = e.target.toAcId.value;
    const amount = e.target.amount.value;

    fetch('http://localhost:5000/transfer', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fromAcId, toAcId, amount })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => { throw new Error(error.msg) });
      }
      return res.json();
    })
    .then(json => {
      console.log('Transfer successful:', json);
      if (typeof onAccountUpdate === 'function') {
        onAccountUpdate(json.fromAccount, json.toAccount); // Update account information
      } else {
        console.error('onAccountUpdate is not provided');
      }
    })
    .catch(error => {
      console.error('Error during transfer:', error.message);
    });
  }

  return (
    <div className={styles.transferCont}>
      <h1>Transfer Amount</h1>
      <form onSubmit={onTransfer}>
        <input type="text" placeholder="From Account Id" name="fromAcId" />
        <input type="text" placeholder="To Account Id" name="toAcId" />
        <input type="number" placeholder="Amount" name="amount" />
        <input type="submit" value="Transfer" />
      </form>
    </div>
  );
}
