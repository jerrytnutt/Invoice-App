import ProgressBar from 'react-bootstrap/ProgressBar';

function Progress(props) {
  //  console.log(props.invoiceData.invoiceList);
  const now = 60;
  return <ProgressBar now={now} label={`${now}%`} />;
}

export default Progress;
