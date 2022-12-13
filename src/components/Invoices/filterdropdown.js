import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { invoiceList } from '../../features/invoicelist';

function FilterDropDown() {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoiceList.value);

  const handleClick = () => {
    let newInvoice = invoice.slice();
    console.log(invoice);
    function compare(propName) {
      return function (a, b) {
        if (a[propName] < b[propName]) return -1;
        if (a[propName] > b[propName]) return 1;
        return 0;
      };
    }

    newInvoice.sort(compare('invoicenumber'));
    // Do I need to update the db with the swap? no.
    //const dataSwap = async () => {
    //const dataRef = doc(db, 'users', userId);

    //await updateDoc(dataRef, {
    // Invoices: newInvoice,
    // });
    dispatch(invoiceList.setinvoiceData(newInvoice));
    //};

    //return dataSwap();
  };
  return (
    <Navbar variant="dark" bg="dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item onClick={handleClick} href="#action/3.1">
                Action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FilterDropDown;
