import '../../styles/invoices.css';
import { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import FilterDropDown from './filterdropdown';
import NewInvoiceForm from './NewInvoiceForm';
import CompletedinvoicePage from './CompletedInvoice';
import InvoiceTable from './InvoiceTable';
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
      <div className="invoiceHeader">
        <p>Invoices</p>
        <div className="invoiceHeaderButtons">
          <FilterDropDown />
          <button
            className="newInvoiceButton"
            onClick={() => {
              setinvoiceContent({
                type: 'New',
                data: {},
              });
            }}
          >
            New <AiOutlinePlusCircle />
          </button>
        </div>
      </div>
      <div className="invoiceTableContainer">
        <InvoiceTable setinvoiceContent={setinvoiceContent} />
      </div>
    </div>
  );
}

export default Invoices;
