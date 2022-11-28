import '../styles/invoices.css';

function CompletedInvoice(props) {
  console.log(props);
  return (
    <div>
      Edit
      <button
        onClick={() => {
          props.setinvoicePageType(false);
        }}
      ></button>
    </div>
  );
}

export default CompletedInvoice;
