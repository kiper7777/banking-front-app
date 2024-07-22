// src/withdraw/withdraw.js
import React from 'react';
import styles from './withdraw.module.css';

export function Withdraw({ onAccountUpdate }) {

  const onWithdraw = (e) => {
    e.preventDefault();

    const acId = e.target.acId.value;
    const amount = e.target.amount.value;

    fetch('http://localhost:5000/withdraw', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ acId, amount })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => { throw new Error(error.error) });
      }
      return res.json();
    })
    .then(json => {
      console.log('Withdraw successful:', json);
      onAccountUpdate(json.account); // Update account information
    })
    .catch(error => {
      console.error('Error during withdraw:', error.message);
    });
  }

  return (
    <>
      <div className={styles.withdrawCont}>
        <h1>Withdraw Amount</h1>
        <form onSubmit={onWithdraw}>
          <input type="text" placeholder="Account Id" name="acId" />
          <input type="number" placeholder="Amount" name="amount" />
          <input type="submit" value="Withdraw" />
        </form>
      </div>
    </>
  );
}
