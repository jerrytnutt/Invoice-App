import '../styles/invoices.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

//import { useDispatch } from 'react-redux';
import FilterDropDown from './filterdropdown';
import InvoiceGridTemplate from './InvoiceGridTemplate';
import CompletedinvoicePage from './CompletedInvoice';
function Invoices() {
  const invoiceList = useSelector((state) => state.invoiceList.value);
  console.log(invoiceList);
  const [showinvoicePage, setshowinvoicePage] = useState(false);
  const [newInvoiceTemplate, setnewInvoiveTemplate] = useState(false);

  const handleClick = (event) => {
    //  event.preventDefault();
    // let obj = event.target.getAttribute('data');
    // console.log(JSON.parse(obj));
    // setshowinvoicePage(true);
  };
  ///
  const openBlankInvoice = () => {
    setnewInvoiveTemplate(true);
  };

  ///
  //let arr = { 100: { name: 'tom' }, 200: { name: 'mike' } };
  const CreateInvoiceList = () => {
    let content = invoiceList.map((element, index) => {
      let name = element.billto.name;

      return (
        <div key={index}>
          <div className="name">{name}</div>
          <button data={2} onClick={handleClick}></button>
        </div>
      );
    });
    return <div>{content}</div>;
  };

  if (newInvoiceTemplate) {
    return (
      <div className="invoiceContainer">
        <InvoiceGridTemplate setnewInvoiveTemplate={setnewInvoiveTemplate} />
      </div>
    );
  }
  if (showinvoicePage) {
    return (
      <div className="invoiceContainer">
        <CompletedinvoicePage setshowinvoicePage={setshowinvoicePage} />
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
              openBlankInvoice();
            }}
          >
            New Invoice Button
          </button>
        </div>
      </div>
      <div className="invoiceList">
        <CreateInvoiceList />
      </div>
    </div>
  );
}

export default Invoices;
