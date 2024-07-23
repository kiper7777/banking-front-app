import { useState } from "react";
import styles from './balance.module.css';
import { json } from "react-router-dom";

export function Balance() {

  const [balance, setBalance] = useState(0)

  const onBalance = (e) => {
    e.preventDefault();

    const acId = e.target.acId.value;
    
    console.log(`Id ${acId}`)

    fetch(`http://localhost:5000/balance/${acId}`)
    .then(res => res.json())
    .then(json => setBalance(json.balance))
  }

  return (
    <div className={styles.balanceCont}>
      <h1>Balance is : INR. {balance}</h1>
      <form onSubmit={onBalance}>
        <input type="number" placeholder="Account Id" name="acId" />
        <input type="submit" value="Balance" />
      </form>
    </div>
  );
}
