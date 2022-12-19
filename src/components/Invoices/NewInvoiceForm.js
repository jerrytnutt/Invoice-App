import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../../styles/invoiceGridTemplate.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { invoiceList } from '../../features/invoicelist';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../fireData/firebase-config';

function NewInvoiceForm(props) {
  const dispatch = useDispatch();
  const [dueDate, setdueDate] = useState('1994-12-12');
  const [invoiceDate, setinvoiceDate] = useState('1980-12-12');

  const propsObject = props.invoiceContent.data;

  const getLength = (obj) => {
    return Object.keys(obj).length === 0;
  };
  const newInvoice = getLength(propsObject);

  const invoice = useSelector((state) => state.invoiceList.value);
  const userId = useSelector((state) => state.userData.value.userID);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    let invoiceNumber = invoice.length + 1;
    let paidStatus = false;

    if (!newInvoice) {
      invoiceNumber = propsObject.invoicenumber;
      paidStatus = propsObject.paidStatus;

      for (var key of Object.keys(formProps)) {
        if (formProps[key] === '') {
          formProps[key] = document.getElementById(key).placeholder;
        }
      }
    }

    const newInvoiceObject = {
      customer: {
        name: formProps.customerName,
        email: formProps.customerEmail,
      },
      billto: {
        name: formProps.billtoName,
        address: formProps.billtoAddress1,
        address2: formProps.billtoAddress2,
        billtoCity: formProps.billtoCity,
        billtoState: formProps.billtoState,
        billtoZip: formProps.billtoZip,
      },

      dates: { invoice: formProps.invoiceDate, due: formProps.dueDate },
      service: {
        name: formProps.product,
        quantity: formProps.qty,
        amount: formProps.amount,
      },

      invoicenumber: invoiceNumber,
      paidStatus: paidStatus,
    };

    let newInvoiceList = invoice.slice();

    if (!newInvoice) {
      const location = propsObject.invoicenumber - 1;
      newInvoiceList[location] = newInvoiceObject;
    } else {
      newInvoiceList = newInvoiceList.concat([newInvoiceObject]);
    }

    const dataRef = doc(db, 'users', userId);

    await updateDoc(dataRef, {
      Invoices: newInvoiceList,
    });
    dispatch(invoiceList.setinvoiceData(newInvoiceList));
    props.setinvoiceContent({
      type: null,
      data: {},
    });
  };

  return (
    <div className="outerGrid">
      <Form className="gridForm" onSubmit={handleSubmit}>
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
        <h4>New Invoice</h4>
        <Row className="mb-3">
          <Form.Label className="topLabel">Customer:</Form.Label>
          <Form.Group as={Col} controlId="customerName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              required={newInvoice}
              name="customerName"
              type="name"
              placeholder={
                newInvoice ? 'Enter Full Name' : propsObject.customer.name
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="customerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required={newInvoice}
              name="customerEmail"
              type="email"
              placeholder={
                newInvoice ? 'Enter Email' : propsObject.customer.email
              }
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Label className="topLabel">Billing Information:</Form.Label>
          <Form.Group as={Col} controlId="billtoName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              required={newInvoice}
              name="billtoName"
              type="name"
              placeholder={
                newInvoice ? 'Enter Full Name' : propsObject.billto.name
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="billtoAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required={newInvoice}
              name="billtoAddress1"
              placeholder={
                newInvoice ? '12345 north street' : propsObject.billto.address
              }
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="billtoAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            name="billtoAddress2"
            placeholder={
              newInvoice
                ? 'Apartment, studio, or floor'
                : propsObject.billto.address2
            }
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="billtoCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              required={newInvoice}
              name="billtoCity"
              placeholder={
                newInvoice ? 'Enter city' : propsObject.billto.billtoCity
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="billtoState">
            <Form.Label>State</Form.Label>
            <Form.Control
              required={newInvoice}
              name="billtoState"
              placeholder={
                newInvoice ? 'Enter State' : propsObject.billto.billtoState
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="billtoZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              required={newInvoice}
              name="billtoZip"
              placeholder={
                newInvoice ? 'Enter Zip' : propsObject.billto.billtoZip
              }
            />
          </Form.Group>
        </Row>

        <Form.Label className="topLabel">Invoice</Form.Label>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="invoiceDate">
            <Form.Label>Invoice Date</Form.Label>
            <Form.Control
              required={newInvoice}
              type="date"
              name="invoiceDate"
              placeholder="1990-10-10"
              value={newInvoice ? invoiceDate : propsObject.dates.invoice}
              onChange={(e) => setinvoiceDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              required={newInvoice}
              type="date"
              name="dueDate"
              placeholder="1990-10-10"
              value={newInvoice ? dueDate : propsObject.dates.due}
              onChange={(e) => setdueDate(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="product">
            <Form.Label>Product</Form.Label>
            <Form.Control
              required={newInvoice}
              name="product"
              type="product"
              placeholder={
                newInvoice ? 'Enter Product' : propsObject.service.name
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="qty">
            <Form.Label>QTY</Form.Label>
            <Form.Control
              required={newInvoice}
              name="qty"
              type="number"
              placeholder={newInvoice ? 'qty' : propsObject.service.quantity}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              required={newInvoice}
              name="amount"
              type="number"
              placeholder={
                newInvoice ? 'Enter Amount' : propsObject.service.amount
              }
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default NewInvoiceForm;
