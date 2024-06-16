import React from "react";
import styles from './dashboard.module.css';

export function Dashboard() {
    return (
        <div className={styles.dashCont}>
          <div>
            <input type='button' value='Create New Customer' />
          </div>
          <div>
            <input type='button' value='Deposit' />
          </div>
          <div>
            <input type='button' value='Withdraw' />
          </div>
          <div>
            <input type='button' value='Transfer' />
          </div>
          <div>
            <input type='button' value='Balance' />
          </div>
        </div>
    )
}