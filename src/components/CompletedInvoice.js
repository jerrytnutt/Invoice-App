import '../styles/invoices.css';

function CompletedInvoice(props) {
  return (
    <div>
      Create New Invoice
      <button
        onClick={() => {
          return props.setCompletedInvoice(false);
        }}
      ></button>
    </div>
  );
}

export default CompletedInvoice;
