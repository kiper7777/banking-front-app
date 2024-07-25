import { useState } from "react";
import styles from './withdraw.module.css';

export function Withdraw({ onAccountUpdate }) {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const onWithdraw = (e) => {
    e.preventDefault();

    const acId = e.target.acId.value;
    const amount = e.target.amount.value;

    fetch('http://localhost:5000/withdraw', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ acId, amount }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'success') {
          setStatus(json.msg);
          setError('');
          console.log('Success status:', json.msg);
          // Если onAccountUpdate не передан, не выполняем его
          if (typeof onAccountUpdate === 'function') {
            onAccountUpdate(json.account); // Update account information
          }
        } else {
          setError(json.error);
          setStatus('');
          console.log('Error message:', json.error);
        }
      })
      .catch(error => {
        console.error('Error during withdrawal:', error);
        setError('An error occurred during the withdrawal');
      });
  };

  console.log("Status:", status); // Добавьте это для отладки
  console.log("Error:", error);   // Добавьте это для отладки

  return (
    <div className={styles.withdrawCont}>
      <h1>Withdraw Funds</h1>
      <form onSubmit={onWithdraw}>
        <input type="number" placeholder="Account Id" name="acId" required />
        <input type="number" placeholder="Amount" name="amount" required />
        <input type="submit" value="Withdraw" />
      </form>
      {status && <p style={{ color: 'green' }}>{status}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
