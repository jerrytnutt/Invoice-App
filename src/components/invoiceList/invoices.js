import '../../styles/invoices.css';
import { useState } from 'react';

import FilterDropDown from './filterdropdown';
import InvoiceGridTemplate from './InvoiceGridTemplate';
import CompletedinvoicePage from './completedInvoice';
import DarkInvoiceTable from './darkinvoicetable';
function Invoices() {
  const [invoicePageType, setinvoicePageType] = useState({
    type: null,
    data: {},
  });

  if (invoicePageType.type === 'New') {
    return (
      <div className="invoiceContainer">
        <InvoiceGridTemplate
          setinvoicePageType={setinvoicePageType}
          invoicePageType={invoicePageType}
        />
      </div>
    );
  }
  if (invoicePageType.type === 'Complete') {
    return (
      <div className="invoiceContainer">
        <CompletedinvoicePage
          setinvoicePageType={setinvoicePageType}
          invoicePageType={invoicePageType}
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
              setinvoicePageType({
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
        <DarkInvoiceTable setinvoicePageType={setinvoicePageType} />
      </div>
    </div>
  );
}

export default Invoices;
