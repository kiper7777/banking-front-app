import React, { useEffect } from 'react';
import styles from './transfer.module.css';

export function Transfer() {

    const onTransfer = (e) => {
        e.preventDefault();
    
        const fromAccountId = e.target.fromAccountId.value;
        const toAccountId = e.target.toAccountId.value;
        const amount = e.target.amount.value;
    
        fetch('http://localhost:5000/transfer', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fromAccountId, toAccountId, amount })
        })
        .then(res => res.json())
        .then(json => console.log(json))
    }    

    return (
        <>
        <div className={styles.transferCont}>
            <h1>Transfer Amount</h1>
            <form onSubmit={onTransfer}>
            <input type="number" placeholder="fromAccountId" name="fromAccountId" />
            <input type="number" placeholder="toAccountId" name="toAccountId" />
            <input type="number" placeholder="Amount" name="amount" />
            <input type="submit" value="Transfer" />
            </form>
        </div>
        </>
    );
}
