import '../styles/invoices.css';

function InvoicePage(props) {
  return (
    <div>
      Create New Invoice
      <button
        onClick={() => {
          return props.setinvoicePage(false);
        }}
      ></button>
    </div>
  );
}

export default InvoicePage;
