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
  //const [date, setDate] = useState(new Date());
  //const [sellToData, setsellToData] = useState(false);

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

  return (
    <div className="outerGrid">
      <Form className="gridForm" onSubmit={handleSubmit}>
        <h4>New Invoice</h4>
        <Row className="mb-3">
          <Form.Label className="topLabel">Customer:</Form.Label>
          <Form.Group as={Col} controlId="formGridCustomerName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="name" placeholder="Enter Full Name" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCustomerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Label className="topLabel">Billing Information:</Form.Label>
          <Form.Group as={Col} controlId="formGridBillName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="name" placeholder="Full Name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBillAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridBillAddress1">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridBillcity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBillState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>

        <Form.Label className="topLabel">Invoice</Form.Label>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formInvoiceDate">
            <Form.Label>Invoice Date</Form.Label>
            <Form.Control
              type="date"
              name="duedate"
              placeholder="Due date"
              //// value={date}
              //            onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="duedate"
              placeholder="Due date"
              // value={date}
              //onChange={(e) => setDate(e.target.value)}
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
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formAmount">
            <Form.Label>Amount</Form.Label>
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
