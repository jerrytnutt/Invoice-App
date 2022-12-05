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
  const [date, setDate] = useState(new Date());
  const [sellToData, setsellToData] = useState(false);

  const invoice = useSelector((state) => state.invoiceList.value);
  const userId = useSelector((state) => state.userData.value.userID);
  console.log(userId);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(event.target.checkValidity());
    // required in control tag
    const customerName = document.getElementById('formGridCustomerName').value;
    const customerEmail = document.getElementById(
      'formGridCustomerEmail'
    ).value;
    const billtoName = document.getElementById('formGridBillName').value;
    const billtoAddress = document.getElementById('formGridBillAddress').value;
    const shippingName = document.getElementById('formGridBillName').value;
    const shippingAdress = document.getElementById('formGridShipAddress').value;
    const invoiceDate = document.getElementById('formInvoiceDate').value;
    const dueDate = document.getElementById('formDueDate').value;
    const service = document.getElementById('formService').value;
    const quantity = document.getElementById('formQuantity').value;

    const newValue = {
      customer: { name: customerName, email: customerEmail },
      billto: { name: billtoName, address: billtoAddress },
      shipto: { name: shippingName, address: shippingAdress },
      dates: { invoice: invoiceDate, due: dueDate },
      service: service,
      quantity: quantity,
      invoicenumber: 4,
    };
    console.log(newValue);

    let newinvoiceList = invoice.concat([newValue]);
    const dataRef = doc(db, 'users', userId);

    await updateDoc(dataRef, {
      Invoices: newinvoiceList,
    });
    dispatch(invoiceList.setinvoiceData(newinvoiceList));
  };
  const handleChange = () => {
    if (sellToData) {
      return setsellToData(false);
    }
    console.log('end');
    setsellToData(true);
  };

  return (
    <div className="outerGrid">
      <Form className="gridForm" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Label>Customer:</Form.Label>
          <Form.Group as={Col} controlId="formGridCustomerName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="name" placeholder="Full Name" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCustomerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Label>Billing Information:</Form.Label>
          <Form.Group as={Col} controlId="formGridBillName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="name" placeholder="Full Name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBillAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Label>Shipping Information:</Form.Label>
          <Form.Group as={Col} controlId="formGridShipName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Full Name"
              disabled={sellToData}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridShipAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" disabled={sellToData} />
          </Form.Group>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Same as Billing Adress"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Form.Label>Invoice</Form.Label>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formInvoiceDate">
            <Form.Label>Invoice Date</Form.Label>
            <Form.Control
              type="date"
              name="duedate"
              placeholder="Due date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="duedate"
              placeholder="Due date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formService">
            <Form.Label>Product</Form.Label>
            <Form.Control type="product" placeholder="Enter Product/Service" />
          </Form.Group>
          <Form.Group as={Col} controlId="formQuantity">
            <Form.Label>QTY</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <button
          onClick={() => {
            props.setinvoicePageType({
              type: null,
              data: {},
            });
          }}
        ></button>
      </Form>
    </div>
  );
}

export default InvoiceGridTemplate;
