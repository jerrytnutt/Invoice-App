import '../../styles/invoices.css';
import { useState } from 'react';

import FilterDropDown from './filterdropdown';
import NewInvoiceForm from './NewInvoiceForm';
import CompletedinvoicePage from './CompletedInvoice';
import DarkInvoiceTable from './InvoiceTable';
function Invoices() {
  const [invoiceContent, setinvoiceContent] = useState({
    type: null,
    data: {},
  });

  if (invoiceContent.type === 'New') {
    return (
      <div className="invoiceContainer">
        <NewInvoiceForm
          setinvoiceContent={setinvoiceContent}
          invoiceContent={invoiceContent}
        />
      </div>
    );
  }
  if (invoiceContent.type === 'Complete') {
    return (
      <div className="invoiceContainer">
        <CompletedinvoicePage
          setinvoiceContent={setinvoiceContent}
          invoiceContent={invoiceContent}
        />
      </div>
    );
  }
  return (
    <div className="invoiceContainer">
      <div className="containerHeader">
        <p>Invoices</p>
        <div className="buttonContainer">
          <FilterDropDown />
          <button
            className="newButton"
            onClick={() => {
              setinvoiceContent({
                type: 'New',
                data: {},
              });
            }}
          >
            New Invoice Button
          </button>
        </div>
      </div>
      <div className="invoiceList">
        <DarkInvoiceTable setinvoiceContent={setinvoiceContent} />
      </div>
    </div>
  );
}

export default Invoices;
