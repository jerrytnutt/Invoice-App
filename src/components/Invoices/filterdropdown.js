import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { invoiceList } from '../../features/invoicelist';

function FilterDropDown(props) {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoiceList.value);
  const sortData = (newInvoice) => {
    let i = 1;
    newInvoice = newInvoice.map((item) => {
      let invoicenumber = i;
      i = i + 1;
      return { ...item, invoicenumber };
    });

    dispatch(invoiceList.setinvoiceData(newInvoice));
  };
  const sortNumeric = (arg) => {
    let newInvoice = invoice.slice();
    newInvoice = newInvoice.sort(
      (a, b) => parseFloat(a.service[arg]) - parseFloat(b.service[arg])
    );
    //props.setfilterdArray(newInvoice);
    return sortData(newInvoice);
    //dispatch(invoiceList.setinvoiceData(newInvoice));
  };
  // const handleClick = () => {
  // let newInvoice = invoice.slice();

  // newInvoice = newInvoice.sort((a, b) => a.invoicenumber - b.invoicenumber);
  // props.setfilterdArray(newInvoice);
  //newInvoice.sort(compare(arg));

  //console.log(newInvoice);
  // Do I need to update the db with the swap? no.
  //const dataSwap = async () => {
  //const dataRef = doc(db, 'users', userId);

  //await updateDoc(dataRef, {
  // Invoices: newInvoice,
  // });
  //dispatch(invoiceList.setinvoiceData(newInvoice));
  //};

  //return dataSwap();
  // };
  return (
    <Navbar variant="dark" bg="dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Filter"
              menuVariant="dark"
            >
              <NavDropdown.Item
                onClick={() => {
                  sortNumeric('amount');
                }}
              >
                Amount
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  sortNumeric('quantity');
                }}
              >
                Quantity
              </NavDropdown.Item>

              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FilterDropDown;
