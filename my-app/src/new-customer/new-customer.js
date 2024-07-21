// import React from "react";
// import styles from "./new-customer.module.css";
// // import { json } from "react-router-dom";

// export function NewCustomer() {

// 	const onNewCustomer = e => {
// 		e.preventDefault()

// 		console.log(e.target)
// 		const acId = e.target.acId.value
// 		const acNm = e.target.acNm.value
// 		const balance = e.target.balance.value

// 		console.log(`Id ${acId} Name ${acNm} Bal ${balance}`)

// 		fetch('http://localhost:5000/create', {
// 			method: 'POST',
// 			headers: {
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({acId, acNm, balance})
// 		}).then(res => res.json())
// 		.then(json => console.log(json))
// 	}

//   return (
//     <div className={styles.custCont}>
//       <h1>Create New Customer</h1>
//       <form onSubmit={onNewCustomer}>
//         <input type="number" placeholder="Account Id" name="acId"/>
//         <input type="text" placeholder="Account Name" name="acNm"/>
//         <input type="number" placeholder="Balance" name="balance"/>
//         <input type="submit" value="Create" />
//       </form>
//     </div>
//   );
// }

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
    }).then(res => res.json())
      .then(json => {
        if (json.error) {
          setMessage(`Error: ${json.error}`);
        } else {
          setMessage('Account created successfully');
        }
      });
  };

  return (
    <div className={styles.newCustCont}>
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
