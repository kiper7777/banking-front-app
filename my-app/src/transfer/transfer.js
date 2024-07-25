import { useState } from "react";
import styles from './transfer.module.css';

export function Transfer({ onAccountUpdate }) {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const onTransfer = (e) => {
    e.preventDefault();

    const fromAcId = e.target.fromAcId.value;
    const toAcId = e.target.toAcId.value;
    const amount = e.target.amount.value;

    fetch('http://localhost:5000/transfer', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fromAcId, toAcId, amount }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.sts === 'success') {
          setStatus(json.msg);
          setError('');
          // Если onAccountUpdate не передан, не выполняем его
          if (typeof onAccountUpdate === 'function') {
            onAccountUpdate(json.fromAccount); // Update sender's account information
            onAccountUpdate(json.toAccount); // Update receiver's account information
          }
        } else {
          setError(json.msg);
          setStatus('');
        }
      })
      .catch(error => {
        console.error('Error during transfer:', error);
        setError('An error occurred during the transfer.');
      });
  };

  return (
    <div className={styles.transferCont}>
      <h1>Transfer Funds</h1>
      <form onSubmit={onTransfer}>
        <input type="number" placeholder="From Account Id" name="fromAcId" required />
        <input type="number" placeholder="To Account Id" name="toAcId" required />
        <input type="number" placeholder="Amount" name="amount" required />
        <input type="submit" value="Transfer" />
      </form>
      {status && <p style={{ color: 'green' }}>{status}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
