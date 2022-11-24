import '../styles/invoices.css';
import { useState } from 'react';
import FilterDropDown from './filterdropdown';
import InvoicePage from './invoicepage';
function Invoices() {
  const [invoicePage, setinvoicePage] = useState(false);
  const handleClick = (event) => {
    event.preventDefault();
    let obj = event.target.getAttribute('data');
    console.log(JSON.parse(obj));
    setinvoicePage(true);
  };
  let arr = [{ name: 'john' }, { name: 'mike' }];
  const CreateInvoiceList = () => {
    let content = arr.map((element, index) => {
      let nameOf = arr[index].name;
      let name = JSON.stringify(arr[index]);

      return (
        <div key={index}>
          <div className="name">{nameOf}</div>
          <button data={name} onClick={handleClick}></button>
        </div>
      );
    });
    return <div>{content}</div>;
  };
  if (invoicePage) {
    return (
      <div className="invoiceContainer">
        <InvoicePage setinvoicePage={setinvoicePage} />
      </div>
    );
  }
  return (
    <div className="invoiceContainer">
      <div className="containerHeader">
        <p>Invoices</p>
        <div className="buttonContainer">
          <FilterDropDown />
          <button className="newButton">New Invoice Button</button>
        </div>
      </div>
      <div className="invoiceList">
        <CreateInvoiceList />
      </div>
    </div>
  );
}

export default Invoices;
