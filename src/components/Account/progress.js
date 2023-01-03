import ProgressBar from 'react-bootstrap/ProgressBar';

function Progress(props) {
  const invoiceList = props.invoiceData.invoiceList.value;
  let paid = 0;
  let total = 0;
  invoiceList.map((item) => {
    total = total + parseInt(item.service.amount);
    if (item.paidStatus) {
      paid = paid + parseInt(item.service.amount);
    }
    return item;
  });

  const now = Math.floor((paid / total) * 100);

  return (
    <div>
      <h3>Percentage of invoices paid</h3>
      <ProgressBar now={now} label={`${now}%`} />
    </div>
  );
}

export default Progress;
