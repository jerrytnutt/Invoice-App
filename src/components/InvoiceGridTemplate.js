import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../styles/invoiceGridTemplate.css';
import { useSelector, useDispatch } from 'react-redux';
import { invoiceList } from '../features/invoicelist';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../fireData/firebase-config';

function InvoiceGridTemplate() {
  const dispatch = useDispatch();

  const invoice = useSelector((state) => state.invoiceList.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target);
    const newValue = {
      billto: { name: 'new name', address: 'new place' },
      invoicenumber: 4,
    };
    console.log(invoice);
    let newInvoice = invoice.concat([newValue]);
    console.log(newInvoice);
    const dataRef = doc(db, 'users', 'uid');

    await updateDoc(dataRef, {
      Invoices: newInvoice,
    });
    dispatch(invoiceList.setinvoiceData(newInvoice));
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
          <Form.Control type="name" placeholder="Enter Full Name" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridShipAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>
      </Row>
      <Form.Label>Invoice</Form.Label>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formInvoiceNumber">
          <Form.Label>Invoice #</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formInvoiceDate">
          <Form.Label>Invoice Date</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formPONumber">
          <Form.Label>PO #</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default InvoiceGridTemplate;
