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
  const deleteInvoice = () => {
    let invoiceNum = invoiceData.invoicenumber - 1;
    let newinvoiceList = invoice.slice();

    //function search(nameKey, myArray) {
    // for (let i = 0; i < myArray.length; i++) {
    // if (myArray[i].invoicenumber === nameKey) {
    // console.log(newinvoiceList);

    newinvoiceList.splice(invoiceNum, 1);
    // console.log(newinvoiceList);
    //}
    //}
    //}

    const dataSwap = async () => {
      const dataRef = doc(db, 'users', userId);

      await updateDoc(dataRef, {
        Invoices: newinvoiceList,
      });
      dispatch(invoiceList.setinvoiceData(newinvoiceList));
    };
    // search(invoiceNum, newinvoiceList);
    dataSwap();
  };

  const changePaidstatus = () => {
    console.log('paid');
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
              return deleteInvoice();
            }}
          >
            Delete
          </Button>
          <button onClick={changePaidstatus}>Mark as Paid</button>
        </div>
        <div className="paidInfo">
          <div className="ball">
            <BsCircleFill />
          </div>
          <p>Pending</p>
        </div>
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
              <th>#</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Cost</th>
              <th>Total</th>
            </tr>
            <tr>
              <th>{invoiceData.invoicenumber}</th>
              <th>{invoiceData.service.name}</th>
              <th>{invoiceData.service.quantity}</th>
              <th>{invoiceData.service.amount}</th>
              <th>
                {invoiceData.service.amount * 0.06 + invoiceData.service.amount}
              </th>
            </tr>
          </thead>
        </Table>
        <div className="lowerDiv">lower</div>
      </div>
    </div>
  );
}

export default CompletedInvoice;
