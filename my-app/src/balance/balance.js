import { useState } from "react";
import styles from './balance.module.css';

export function Balance() {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  const onBalance = (e) => {
    e.preventDefault();

    const acId = e.target.acId.value;
    
    console.log(`Id ${acId}`);

    fetch(`http://localhost:5000/balance/${acId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Account not found');
        }
        return res.json();
      })
      .then(data => {
        setBalance(data.balance);
        setError('');
      })
      .catch(error => {
        console.error('Error fetching balance:', error);
        setError(error.message);
      });
  };

  return (
    <div className={styles.balanceCont}>
      <h1>Balance is : INR. {balance}</h1>
      <form onSubmit={onBalance}>
        <input type="number" placeholder="Account Id" name="acId" />
        <input type="submit" value="Check Balance" />
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
