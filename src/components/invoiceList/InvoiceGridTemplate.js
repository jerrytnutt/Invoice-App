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
  const [sellToData, setsellToData] = useState(false);

  const invoice = useSelector((state) => state.invoiceList.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(event.target.checkValidity());
    // required in control tag
    // for (let i = 0; i < 8; i++) {
    //  console.log(event.target.getElementsByTagName('input')[i].value);
    // }

    const newValue = {
      billto: { name: 'john new', address: 'new place' },
      invoicenumber: 4,
    };

    let newinvoiceList = invoice.concat([newValue]);
    const dataRef = doc(db, 'users', 'uid');
    //
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
    <Form className="gridForm" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Label>Bill To</Form.Label>
        <Form.Group as={Col} controlId="formGridBillName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="name" placeholder="Enter Full Name" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridBillAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Label>Ship To</Form.Label>
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
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formInvoiceDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formService">
          <Form.Label>Service</Form.Label>
          <Form.Select defaultValue="Choose..."></Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formquantity">
          <Form.Label>QTY</Form.Label>
          <Form.Control />
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
  );
}

export default InvoiceGridTemplate;
