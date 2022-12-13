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

function InvoiceGridTemplate(props) {
  const dispatch = useDispatch();
  const [date1, setdate1] = useState('1994-12-12');
  const [date2, setdate2] = useState('1980-12-12');

  const propsObject = props.invoicePageType.data;

  //console.log(propsObject);

  const getLength = (obj) => {
    return Object.keys(obj).length === 0;
  };
  const previousInvoice = getLength(propsObject);
  console.log(previousInvoice);

  const invoice = useSelector((state) => state.invoiceList.value);
  const userId = useSelector((state) => state.userData.value.userID);
  //console.log(invoice);
  const handleSubmit = async (event) => {
    event.preventDefault();

    let randomNumber = Math.floor(Math.random() * 1000);
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    if (!previousInvoice) {
      randomNumber = propsObject.invoicenumber;

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

      invoicenumber: randomNumber,
    };

    let newinvoiceList = null;

    if (!previousInvoice) {
      newinvoiceList = invoice.slice();
      function search(nameKey, myArray) {
        for (let i = 0; i < myArray.length; i++) {
          if (myArray[i].invoicenumber === nameKey) {
            newinvoiceList[i] = newInvoiceObject;
          }
        }
      }

      search(randomNumber, invoice);
    } else {
      newinvoiceList = invoice.concat([newInvoiceObject]);
    }

    const dataRef = doc(db, 'users', userId);

    await updateDoc(dataRef, {
      Invoices: newinvoiceList,
    });
    dispatch(invoiceList.setinvoiceData(newinvoiceList));
    props.setinvoicePageType({
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
            props.setinvoicePageType({
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
              required={previousInvoice}
              name="customerName"
              type="name"
              placeholder={
                previousInvoice ? 'Enter Full Name' : propsObject.customer.name
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="customerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required={previousInvoice}
              name="customerEmail"
              type="email"
              placeholder={
                previousInvoice ? 'Enter Email' : propsObject.customer.email
              }
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Label className="topLabel">Billing Information:</Form.Label>
          <Form.Group as={Col} controlId="billtoName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              required={previousInvoice}
              name="billtoName"
              type="name"
              placeholder={
                previousInvoice ? 'Enter Full Name' : propsObject.billto.name
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="billtoAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required={previousInvoice}
              name="billtoAddress1"
              placeholder={
                previousInvoice
                  ? '12345 north street'
                  : propsObject.billto.address
              }
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="billtoAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            name="billtoAddress2"
            placeholder={
              previousInvoice
                ? 'Apartment, studio, or floor'
                : propsObject.billto.address2
            }
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="billtoCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              required={previousInvoice}
              name="billtoCity"
              placeholder={
                previousInvoice ? 'Enter city' : propsObject.billto.billtoCity
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="billtoState">
            <Form.Label>State</Form.Label>
            <Form.Control
              required={previousInvoice}
              name="billtoState"
              placeholder={
                previousInvoice ? 'Enter State' : propsObject.billto.billtoState
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="billtoZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              required={previousInvoice}
              name="billtoZip"
              placeholder={
                previousInvoice ? 'Enter Zip' : propsObject.billto.billtoZip
              }
            />
          </Form.Group>
        </Row>

        <Form.Label className="topLabel">Invoice</Form.Label>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="invoiceDate">
            <Form.Label>Invoice Date</Form.Label>
            <Form.Control
              required={previousInvoice}
              type="date"
              name="invoiceDate"
              placeholder="1990-10-10"
              //placeholder={previousInvoice ? 'Enter due Date' : propsObject.dates.due}
              value={previousInvoice ? date2 : propsObject.dates.invoice}
              onChange={(e) => setdate2(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              required={previousInvoice}
              type="date"
              name="dueDate"
              placeholder="1990-10-10"
              //placeholder={previousInvoice ? 'Enter due Date' : propsObject.dates.due}
              value={previousInvoice ? date1 : propsObject.dates.due}
              onChange={(e) => setdate1(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="product">
            <Form.Label>Product</Form.Label>
            <Form.Control
              required={previousInvoice}
              name="product"
              type="product"
              placeholder={
                previousInvoice ? 'Enter Product' : propsObject.service.name
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="qty">
            <Form.Label>QTY</Form.Label>
            <Form.Control
              required={previousInvoice}
              name="qty"
              type="number"
              placeholder={
                previousInvoice ? 'qty' : propsObject.service.quantity
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              required={previousInvoice}
              name="amount"
              type="number"
              placeholder={
                previousInvoice ? 'Enter Amount' : propsObject.service.amount
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

export default InvoiceGridTemplate;
