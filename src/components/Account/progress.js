import ProgressBar from 'react-bootstrap/ProgressBar';

function Progress(props) {
  //const arr = props.invoiceData.invoiceList.value;
  //console.log(arr);
  // let paid = 0;
  // let total = 0;
  // arr.map((item) => {
  // total = total + parseInt(item.service.amount);
  //if (item.paidStatus) {
  //paid = paid + parseInt(item.service.amount);
  //return item;
  //}
  //});
  //console.log(total, paid);
  //const now = Math.floor((paid / total) * 100);
  let now = 50;
  //console.log(now);
  return (
    <div>
      <h3>Percentage of invoices paid</h3>
      <ProgressBar now={now} label={`${now}%`} />
    </div>
  );
}

export default Progress;
