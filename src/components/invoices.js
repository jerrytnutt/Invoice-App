import '../styles/invoices.css';
import { useState } from 'react';

import FilterDropDown from './filterdropdown';
import InvoiceGridTemplate from './InvoiceGridTemplate';
import CompletedinvoicePage from './completedInvoice';
import DarkInvoiceTable from './darkinvoicetable';
function Invoices() {
  //const [showinvoicePage, setshowinvoicePage] = useState(false);
  //const [newInvoiceTemplate, setnewInvoiveTemplate] = useState(false);
  const [invoicePageType, setinvoicePageType] = useState({
    type: null,
    data: {},
  });
  //const openInvoiceCompletedPage = (obj) => {
  //console.log(obj);
  //setinvoicePageType('Complete');
  //return null;
  //};

  if (invoicePageType.type === 'New') {
    return (
      <div className="invoiceContainer">
        <InvoiceGridTemplate />
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
              setinvoicePageType('New');
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
