import styles from './deposit.module.css';

export function Deposit() {
  const onDeposit = (e) => {
    e.preventDefault();

    console.log(e.target)

    const acId = e.target.acId.value;
    const amount = e.target.amount.value;

    console.log(`Id ${acId} Amount ${amount}`);

    fetch('http://localhost:5000/deposit', {
      method: 'POST',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accountId: acId, amount: parseFloat(amount) })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(json => console.log(json))
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className={styles.depCont}>
      <h1>Deposit Amount</h1>
      <form onSubmit={onDeposit}>
        <input type="number" placeholder="Account Id" name="acId" required />
        <input type="number" step="0.01" placeholder="Amount" name="amount" required />
        <input type="submit" value="Deposit" />
      </form>
    </div>
  );
}
