import '../../styles/completedinvoice.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { BsCircleFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { invoiceList } from '../../features/invoicelist';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../fireData/firebase-config';

function CompletedInvoice(props) {
  const dispatch = useDispatch();

  const invoice = useSelector((state) => state.invoiceList.value);
  const userId = useSelector((state) => state.userData.value.userID);

  const invoiceData = props.invoicePageType.data;
  const payment = invoiceData.paidStatus;
  console.log(invoice);
  //console.log(payment);
  const editCurrentInvoice = (arg) => {
    let invoiceNumber = invoiceData.invoicenumber;
    let newInvoiceList = invoice;
    if (arg === 'delete') {
      const updateAge = (id) => {
        let newList = invoice.map((item) => {
          if (item.invoicenumber === id) {
            return item;
          } else if (item.invoicenumber > id) {
            let invoicenumber = item.invoicenumber - 1;

            return { ...item, invoicenumber };
          } else {
            return { ...item };
          }
        });

        newList.splice(id - 1, 1);

        return newList;
      };
      newInvoiceList = updateAge(invoiceNumber);
    } else if (arg === 'payment') {
      const updateAge = (id) => {
        let newList = invoice.map((item) => {
          if (item.invoicenumber === id) {
            let paidStatus = !item.paidStatus;
            return { ...item, paidStatus };
          } else {
            return { ...item };
          }
        });

        return newList;
      };
      newInvoiceList = updateAge(invoiceNumber);

      //newInvoiceList.splice(invoiceNumber, 1, newInvoice);
    }

    const dataSwap = async () => {
      const dataRef = doc(db, 'users', userId);

      await updateDoc(dataRef, {
        Invoices: newInvoiceList,
      });
      dispatch(invoiceList.setinvoiceData(newInvoiceList));
    };
    // search(invoiceNum, newInvoiceList);
    dataSwap();
  };
  const PaymentButton = () => {
    let content = null;
    if (payment) {
      content = (
        <div className="paidTrue">
          <div className="ball">
            <BsCircleFill />
          </div>
          <p>Paid</p>
        </div>
      );
    } else {
      content = (
        <div className="paidInfo">
          <div className="ball">
            <BsCircleFill />
          </div>
          <p>Pending</p>
        </div>
      );
    }
    return <div>{content}</div>;
  };

  return (
    <div className="outer">
      <header>
        <div>
          <Button
            variant="primary"
            onClick={() => {
              props.setinvoicePageType({
                type: 'New',
                data: invoiceData,
              });
            }}
          >
            Edit
          </Button>{' '}
          <Button
            variant="danger"
            onClick={() => {
              return editCurrentInvoice('delete');
            }}
          >
            Delete
          </Button>
          <button
            onClick={() => {
              return editCurrentInvoice('payment');
            }}
          >
            Mark as Paid
          </button>
        </div>
        <PaymentButton />
      </header>
      <div className="completedInvoiceContainer">
        <button
          className="closeX"
          onClick={() => {
            props.setinvoicePageType({
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
              <th>Cost</th>
              <th>Total</th>
            </tr>
            <tr>
              <th>{invoiceData.service.name}</th>
              <th>{invoiceData.service.quantity}</th>
              <th>{invoiceData.service.amount}</th>
              <th>
                {invoiceData.service.amount * 0.06 + invoiceData.service.amount}
              </th>
            </tr>
          </thead>
        </Table>
      </div>
    </div>
  );
}

export default CompletedInvoice;
