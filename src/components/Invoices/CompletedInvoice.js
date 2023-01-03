import '../../styles/completedinvoice.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import PaymentButton from './PaymentButton';

import { useSelector, useDispatch } from 'react-redux';
import { invoiceList } from '../../features/invoicelist';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../fireData/firebase-config';

function CompletedInvoice(props) {
  const dispatch = useDispatch();

  const invoice = useSelector((state) => state.invoiceList.value);
  const userId = useSelector((state) => state.userData.value.userID);

  const invoiceData = props.invoiceContent.data;
  const payment = invoiceData.paidStatus;
  let invoiceNumber = invoiceData.invoicenumber;

  const getTotal = (invoiceData) => {
    let amount = invoiceData.service.amount * invoiceData.service.quantity;

    let tax = amount * 0.06;

    amount = amount + tax;
    return amount;
  };
  const total = getTotal(invoiceData);
  const dataSwap = async (newInvoiceList) => {
    const dataRef = doc(db, 'users', userId);

    await updateDoc(dataRef, {
      Invoices: newInvoiceList,
    });
    dispatch(invoiceList.setinvoiceData(newInvoiceList));
  };

  const deleteElement = (id) => {
    /*
    Change the invoicenumber of each element not being deleted, then splice out the
    element to be deleted.
    */
    let newInvoiceList = invoice.map((item) => {
      if (item.invoicenumber > id) {
        let invoicenumber = item.invoicenumber - 1;

        return { ...item, invoicenumber };
      } else {
        return { ...item };
      }
    });

    newInvoiceList.splice(id - 1, 1);

    return dataSwap(newInvoiceList);
  };

  const changepaidStatus = (id) => {
    let newInvoiceList = invoice.map((item) => {
      if (item.invoicenumber === id) {
        let paidStatus = !item.paidStatus;
        return { ...item, paidStatus };
      } else {
        return { ...item };
      }
    });

    return dataSwap(newInvoiceList);
  };

  return (
    <div className="outer">
      <header>
        <div>
          {/*
          Clicking the edit button will open the NewInvoiceForm to edit Invoice.
  */}
          <Button
            variant="primary"
            onClick={() => {
              props.setinvoiceContent({
                type: 'New',
                data: invoiceData,
              });
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteElement(invoiceNumber);
              return props.setinvoiceContent({
                type: null,
                data: {},
              });
            }}
          >
            Delete
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              changepaidStatus(invoiceNumber);
              return props.setinvoiceContent({
                type: null,
                data: {},
              });
            }}
          >
            Mark as {payment ? 'Unpaid' : 'Paid'}
          </Button>
        </div>
        <PaymentButton payment={payment} />
      </header>
      <div className="completedInvoiceContainer">
        <button
          className="closeX"
          onClick={() => {
            props.setinvoiceContent({
              type: null,
              data: {},
            });
          }}
        >
          X
        </button>
        <h1>Customer</h1>
        <p>{invoiceData.customer.name}</p>
        <div className="upperDiv">
          <div className="upperOne">
            <h1>Invoice Date</h1>
            <p>{invoiceData.dates.invoice}</p>
            <h1>Payment Date</h1>
            <p> {invoiceData.dates.due}</p>
          </div>
          <div className="upperTwo">
            <h1>Bill To</h1>
            <p>{invoiceData.billto.name}</p>
            <p>{invoiceData.billto.address}</p>
            <p>{invoiceData.billto.address2}</p>
            <p>
              {invoiceData.billto.billtoCity}
              {invoiceData.billto.billtoState}
            </p>
            <p>{invoiceData.billto.billtoZip}</p>
          </div>
          <div className="upperThree">
            <h1>Sent to</h1>
            <p>{invoiceData.customer.email}</p>
          </div>
        </div>
        <Table className="table1" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Total</th>
            </tr>
            <tr>
              <th>{invoiceData.service.name}</th>
              <th>{invoiceData.service.quantity}</th>
              <th>{invoiceData.service.amount}</th>
              <th>${total}</th>
            </tr>
          </thead>
        </Table>
      </div>
    </div>
  );
}

export default CompletedInvoice;
