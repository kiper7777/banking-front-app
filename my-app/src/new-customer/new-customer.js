// src/new-customer/new-customer.js
import React, { useState } from 'react';
import styles from './new-customer.module.css';

export function NewCustomer() {
  const [acId, setAcId] = useState('');
  const [acNm, setAcNm] = useState('');
  const [balance, setBalance] = useState('');
  const [message, setMessage] = useState('');

  const onCreateAccount = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ acId, acNm, balance })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => { throw new Error(error.error) });
        }
        return res.json();
      })
      .then(json => {
        setMessage('Account created successfully');
      })
      .catch(error => {
        setMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div className={styles.custCont}>
      <h1>Create New Account</h1>
      <form onSubmit={onCreateAccount}>
        <input
          type="text"
          placeholder="Account ID"
          value={acId}
          onChange={(e) => setAcId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Account Name"
          value={acNm}
          onChange={(e) => setAcNm(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Initial Balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          required
        />
        <input type="submit" value="Create" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
