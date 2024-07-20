import styles from './deposit.module.css'

export function Deposit() {
    return (
      <div className={styles.depCont}>
      <h1>Deposit Amount</h1>
      <form >
        <input type="number" placeholder="Account Id" name="acId"/>
        <input type="text" placeholder="Amount" name="amount"/>
        <input type="submit" value="Deposit" />
      </form>
    </div>
    )
}