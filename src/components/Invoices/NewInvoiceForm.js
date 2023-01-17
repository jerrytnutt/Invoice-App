import '../../styles/NewInvoiceForm.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { invoiceList } from '../../features/invoicelist';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../fireData/firebase-config';

function NewInvoiceForm(props) {
  const [dueDate, setdueDate] = useState('2023-12-12');
  const [invoiceDate, setinvoiceDate] = useState('2023-12-12');
  const dispatch = useDispatch();

  const previousInvoice = props.invoiceContent.data;

  const getLength = (obj) => {
    return Object.keys(obj).length === 0;
  };
  const creatingNewInvoice = getLength(previousInvoice);

  const invoice = useSelector((state) => state.invoiceList.value);
  const userId = useSelector((state) => state.userData.value.userID);

  const handleSubmit = async (event) => {
    event.preventDefault();
    /*
    This function will handle both adding new invoice and editing previous ones.

    */
    let copyInvoice = [...invoice];
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    let invoiceNumber = invoice.length + 1;
    let paidStatus = false;

    if (!creatingNewInvoice) {
      /*
      If the user is editing a previous invoice add the invoiceNumber and Paidstatus.
      Also add all form data that were not changed.

      */
      invoiceNumber = previousInvoice.invoicenumber;
      paidStatus = previousInvoice.paidStatus;

      for (var key of Object.keys(formProps)) {
        if (formProps[key] === '') {
          formProps[key] = document.getElementById(key).placeholder;
        }
      }
    }

    const creatingNewInvoiceObject = {
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

    console.log(copyInvoice);

    const updateData = async () => {
      const dataRef = doc(db, 'users', userId);

      await updateDoc(dataRef, {
        Invoices: copyInvoice,
      });

      dispatch(invoiceList.setinvoiceData(copyInvoice));

      props.setinvoiceContent({
        type: null,
        data: {},
      });
    };

    const getDataForUser = async () => {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      let savedInvoice = docSnap.data().Invoices;

      if (savedInvoice.length > copyInvoice.length) {
        copyInvoice = savedInvoice;
      }

      if (!creatingNewInvoice) {
        const index = copyInvoice
          .map((e) => e.invoicenumber)
          .indexOf(previousInvoice.invoicenumber);
        //console.log(index);
        // const location = previousInvoice.invoicenumber - 1;

        copyInvoice[index] = creatingNewInvoiceObject;
        console.log(copyInvoice);
      } else {
        copyInvoice = copyInvoice.concat([creatingNewInvoiceObject]);
        /*
         After adding a new invoice
          resort the list by amount and re-enter each invoicenumber.
  
        */
        copyInvoice = copyInvoice.sort(
          (a, b) =>
            parseFloat(a.service['amount']) - parseFloat(b.service['amount'])
        );
      }

      updateData();
    };

    getDataForUser();

    // update firestore
  };

  return (
    <div className="newInvoiceOuter">
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
              required={creatingNewInvoice}
              name="customerName"
              type="name"
              placeholder={
                creatingNewInvoice
                  ? 'Enter Full Name'
                  : previousInvoice.customer.name
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="customerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required={creatingNewInvoice}
              name="customerEmail"
              type="email"
              placeholder={
                creatingNewInvoice
                  ? 'Enter Email'
                  : previousInvoice.customer.email
              }
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Label className="topLabel">Billing Information:</Form.Label>
          <Form.Group as={Col} controlId="billtoName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              required={creatingNewInvoice}
              name="billtoName"
              type="name"
              placeholder={
                creatingNewInvoice
                  ? 'Enter Full Name'
                  : previousInvoice.billto.name
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="billtoAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required={creatingNewInvoice}
              name="billtoAddress1"
              placeholder={
                creatingNewInvoice
                  ? '12345 north street'
                  : previousInvoice.billto.address
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="billtoAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              name="billtoAddress2"
              placeholder={
                creatingNewInvoice
                  ? 'Apartment, studio, or floor'
                  : previousInvoice.billto.address2
              }
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="billtoCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              required={creatingNewInvoice}
              name="billtoCity"
              placeholder={
                creatingNewInvoice
                  ? 'Enter city'
                  : previousInvoice.billto.billtoCity
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="billtoState">
            <Form.Label>State</Form.Label>
            <Form.Control
              required={creatingNewInvoice}
              name="billtoState"
              placeholder={
                creatingNewInvoice
                  ? 'Enter State'
                  : previousInvoice.billto.billtoState
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="billtoZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              required={creatingNewInvoice}
              name="billtoZip"
              placeholder={
                creatingNewInvoice
                  ? 'Enter Zip'
                  : previousInvoice.billto.billtoZip
              }
            />
          </Form.Group>
        </Row>

        <Form.Label className="topLabel">Invoice</Form.Label>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="invoiceDate">
            <Form.Label>Invoice Date</Form.Label>
            <Form.Control
              required={creatingNewInvoice}
              type="date"
              name="invoiceDate"
              placeholder="1990-10-10"
              value={
                creatingNewInvoice ? invoiceDate : previousInvoice.dates.invoice
              }
              onChange={(e) => setinvoiceDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              required={creatingNewInvoice}
              type="date"
              name="dueDate"
              placeholder="1990-10-10"
              value={creatingNewInvoice ? dueDate : previousInvoice.dates.due}
              onChange={(e) => setdueDate(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="product">
            <Form.Label>Product</Form.Label>
            <Form.Control
              required={creatingNewInvoice}
              name="product"
              type="product"
              placeholder={
                creatingNewInvoice
                  ? 'Enter Product'
                  : previousInvoice.service.name
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="qty">
            <Form.Label>QTY</Form.Label>
            <Form.Control
              required={creatingNewInvoice}
              name="qty"
              type="number"
              placeholder={
                creatingNewInvoice ? 'qty' : previousInvoice.service.quantity
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              required={creatingNewInvoice}
              name="amount"
              type="number"
              placeholder={
                creatingNewInvoice
                  ? 'Enter Amount'
                  : previousInvoice.service.amount
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
