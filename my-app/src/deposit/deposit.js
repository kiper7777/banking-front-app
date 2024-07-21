import React from 'react';
import styles from './deposit.module.css';

export function Deposit() {

  const onDeposit = (e) => {
    e.preventDefault();

    const acId = e.target.acId.value;
    const amount = e.target.amount.value;

    fetch('http://localhost:5000/deposit', {
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
      console.log('Deposit successful:', json);
    })
    .catch(error => {
      console.error('Error during deposit:', error.message);
    });
  }

  return (
    <div className={styles.depCont}>
      <h1>Deposit Amount</h1>
      <form onSubmit={onDeposit}>
        <input type="text" placeholder="Account Id" name="acId" />
        <input type="number" placeholder="Amount" name="amount" />
        <input type="submit" value="Deposit" />
      </form>
    </div>
  );
}
